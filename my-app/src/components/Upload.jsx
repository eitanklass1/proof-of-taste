import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from './ui/button'
import { useDisconnect, useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { default as contractABI } from './contract_abi';
import { useNavigate } from 'react-router-dom';

// CONTRACT_ADDRESS=0x13acbe337d192ee918bc19a7a149918f24c47a26
const CONTRACT_ADDRESS = "0xD9C5678fBc8172c8f19c2E7c7AA901a69E95Cd34";

function Upload({ isConnected }) {   
  const [contentUrl, setContentUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); 
  
  const { address } = useAccount();
  
  async function getCurrentDay() {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
    
      const currentDay = await contract.getCurrentDay();
      console.log("Current day:", currentDay.toString());
      return currentDay;
    } catch (error) {
      console.error("Error getting current day:", error);
      setError("Failed to get current day: " + error.message);
      throw error;
    }
  }

  async function submitPost() {
    if (!contentUrl.trim()) {
      setError("Please enter a valid URL");
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
      
      // The SUBMISSION_FEE is defined in the contract
      const submissionFee = await contract.SUBMISSION_FEE();
      
      console.log("Submitting post with URL:", contentUrl);
      console.log("Submission fee:", submissionFee.toString());
      
      // Submit the post with the required fee
      const tx = await contract.submitPost(contentUrl, {
        value: submissionFee
      });
      
      console.log("Transaction sent:", tx.hash);
      setTxHash(tx.hash);
      
      // Wait for the transaction to be mined
      const receipt = await tx.wait();
      console.log("Transaction confirmed:", receipt);
      
      // Clear the input after successful submission
      setContentUrl('');
    } catch (error) {
      console.error("Error submitting post:", error);
      setError("Failed to submit post: " + error.message);
    } finally {
      setIsLoading(false);
      navigate("/comparison")
    }
  }

  // async function getTopPosts() {
  //   try {
  //     setIsLoading(true);
      
  //     const provider = new ethers.BrowserProvider(window.ethereum);
  //     await provider.send("eth_requestAccounts", []);
  //     const signer = await provider.getSigner();
  //     const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
    
  //     // Make sure to await getCurrentDay
  //     const currentDay = await getCurrentDay();
    
  //     const topPosts = await contract.getTopPosts(currentDay);
  //     console.log("Top posts:", topPosts);
  //     return topPosts;
  //   } catch (error) {
  //     console.error("Error getting today's posts:", error);
  //     setError("Failed to get top posts: " + error.message);
  //   } finally {
  //     setIsLoading(false);
  //     navigate("")
  //   }
  // }

  return (
    <div className="flex flex-col space-y-4 max-w-md mx-auto p-6">
      <div className="flex items-center space-x-4">
        <Input 
          type="url" 
          placeholder="Enter URL here..." 
          className="flex-grow" 
          value={contentUrl}
          onChange={(e) => setContentUrl(e.target.value)}
          disabled={isLoading}
        />
        <Button 
          disabled={!isConnected || isLoading || !contentUrl.trim()} 
          onClick={submitPost}
        >
          {isLoading ? "Processing..." : "Upload"}
        </Button>
      </div>
      
      {error && (
        <div className="text-red-500 text-sm mt-2">
          {error}
        </div>
      )}
      
      {txHash && (
        <div className="text-green-500 text-sm mt-2">
          Transaction submitted! Hash: {txHash}
        </div>
      )}
    </div>
  )
}

export default Upload
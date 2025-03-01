import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { default as contractABI } from './contract_abi';
import { Button } from './ui/button';

const CONTRACT_ADDRESS = "0x4459F19F98a879A4a9C24c924D9232A546a5E05d";

function TikTokEmbed() {
  const [videos, setVideos] = useState([]); // State to hold video URLs
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Hardcode the TikTok video URL
    const hardcodedVideoUrl = "https://www.tiktok.com/@ellaonwheels_0/video/7456273677772934446?is_from_webapp=1&sender_device=pc&web_id=7476825893672158763";
    const hardcodedVideoUrl2 = "https://www.tiktok.com/@vexbolts/video/7454808344331619627?is_from_webapp=1&sender_device=pc&web_id=7476825893672158763";

    
    // Set the hardcoded video URL into the state
    setVideos([hardcodedVideoUrl, hardcodedVideoUrl2]);
    
    // Fetch today's posts when the component mounts
  //   async function getTodaysPosts() {
  //     try {
  //       setIsLoading(true);
        
  //       const provider = new ethers.BrowserProvider(window.ethereum);
  //       await provider.send("eth_requestAccounts", []);
  //       const signer = await provider.getSigner();
  //       const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
      
  //       const currentDay = await contract.getCurrentDay();
  //       const topPosts = await contract.getFunction("getTopPosts")(currentDay)
        
  //       // getTopPosts(currentDay);
  //       console.log("Top posts:", topPosts);
        
  //       // Assuming topPosts is an array of objects with a contentUrl property
  //       setVideos(topPosts.map(post => post.contentUrl));
  //     } catch (error) {
  //       console.error("Error getting today's posts:", error);
  //       setError("Failed to get top posts: " + error.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   getTodaysPosts();
  }, []);

  // When videos change, load the TikTok embed script again
  useEffect(() => {
    if (videos.length === 0) return;
    
    // Load or reload the TikTok embed script
    const existingScript = document.querySelector('script[src="https://www.tiktok.com/embed.js"]');
    if (existingScript) {
      // If script already exists, remove it so it can be reloaded
      existingScript.remove();
    }
    
    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [videos]);

  // Helper function to extract video ID from URL
  const getVideoIdFromUrl = (url) => {
    const matches = url?.match(/\/video\/(\d+)/);
    return matches ? matches[1] : '';
  };

  return (
    <div className="container mx-auto p-4">
      {isLoading && <p className="text-center mb-4">Loading videos...</p>}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      
      <div className="flex flex-row justify-center items-center gap-6">
        {videos.map((videoUrl, index) => (
          <div key={index} className="tiktok-embed-container" style={{ margin: '0 10px' }}>
            <blockquote 
              className="tiktok-embed" 
              cite={videoUrl}
              data-video-id={getVideoIdFromUrl(videoUrl)}
              style={{ maxWidth: '605px', minWidth: '325px' }}
            >
              <section></section>
            </blockquote>
            <Button>Vote</Button>
          </div>
        ))}
      </div>
      
      {videos.length === 0 && !isLoading && !error && (
        <p className="text-center">No videos available</p>
      )}
    </div>
  );
}

export default TikTokEmbed;
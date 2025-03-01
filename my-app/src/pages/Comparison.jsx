import React from 'react'
import TikTokEmbed from '../components/TikTokEmbed'; // Import the TikTokEmbed component
import Leaderboard from '../components/Leaderboard';

function Comparison() {
  return (
    <div className='flex flex-col space-x-4 max-w-md mx-auto p-6'>
      <TikTokEmbed />
      <Leaderboard />
    </div>
  )
}

export default Comparison
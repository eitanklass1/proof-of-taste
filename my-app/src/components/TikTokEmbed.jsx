import React, { useEffect, useRef } from 'react';

function TikTokEmbed({ videoUrl }) {
  const containerRef = useRef(null);

  useEffect(() => {
    // Clean up any existing embeds
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    // Create the embed script
    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;

    // Add the blockquote element with the proper attributes
    const blockquote = document.createElement('blockquote');
    blockquote.className = 'tiktok-embed';
    blockquote.cite = videoUrl;
    blockquote.setAttribute('data-video-id', getVideoIdFromUrl(videoUrl));
    blockquote.style.maxWidth = '605px';
    blockquote.style.minWidth = '325px';

    // Append elements
    containerRef.current.appendChild(blockquote);
    document.body.appendChild(script);

    // Cleanup on unmount
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [videoUrl]);

  // Helper function to extract video ID from URL
  const getVideoIdFromUrl = (url) => {
    const matches = url.match(/\/video\/(\d+)/);
    return matches ? matches[1] : '';
  };

  return <div ref={containerRef} className="tiktok-container"></div>;
}

export default TikTokEmbed;
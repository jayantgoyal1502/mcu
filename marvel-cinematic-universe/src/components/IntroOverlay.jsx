import React, { useEffect, useState } from "react";

// Creative Commons YouTube Avengers-style animation
// Example: "Avengers Animation | Marvel Superheroes Animated Compilation"
const YOUTUBE_ID = "dQw4w9WgXcQ"; // Replace with a real CC Avengers animation if available

const IntroOverlay = ({ onFinish }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Hide overlay after 10 seconds
    const timer = setTimeout(() => {
      setVisible(false);
      if (onFinish) onFinish();
    }, 10000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95 transition-opacity duration-700">
      <div className="w-full h-full flex items-center justify-center">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&controls=0&showinfo=0&rel=0&modestbranding=1`}
          title="Avengers Animation"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="w-full h-full object-cover rounded-lg shadow-lg"
          style={{ maxWidth: "100vw", maxHeight: "100vh" }}
        ></iframe>
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-5xl md:text-7xl font-extrabold text-yellow-400 drop-shadow-lg animate-pulse">Avengers Animation!</h1>
      </div>
    </div>
  );
};

export default IntroOverlay;

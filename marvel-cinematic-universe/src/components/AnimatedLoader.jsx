import React, { useEffect, useState } from "react";

const AnimatedLoader = ({ onFinish }) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onFinish) onFinish();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);
  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95">
      <div className="flex flex-col items-center">
        {/* Avengers logo animation */}
        <div className="animate-spin rounded-full border-8 border-red-600 border-t-transparent w-32 h-32 mb-6"></div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-yellow-400 animate-pulse drop-shadow-lg">Loading MCU Timeline...</h1>
      </div>
    </div>
  );
};

export default AnimatedLoader;

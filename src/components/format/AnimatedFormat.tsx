import React, { useEffect, useState } from 'react';

interface AnimatedFormatProps {
  label: string;
  isUpdated: boolean;
}

const AnimatedFormat: React.FC<AnimatedFormatProps> = ({ label, isUpdated }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (isUpdated) {
      // Reset key to force re-render and restart animation
      setKey(prev => prev + 1);
      setShowAnimation(true);
      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isUpdated, label]);

  return (
    <span 
      key={key}
      className={`text-sm text-gray-700 transition-all duration-300 ${
        showAnimation ? 'bg-blue-100 px-2 py-1 rounded animate-pulse' : ''
      }`}
    >
      {label}
    </span>
  );
};

export default AnimatedFormat;

import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  message: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message }) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const reassuranceMessages = [
    "Gemini is envisioning the storyboard...",
    "Veo is calculating high-fidelity physics...",
    "Smoothing cinematic transitions...",
    "Almost there, AI magic takes a moment...",
    "Generating final high-def frames..."
  ];

  const [hintIndex, setHintIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setHintIndex(prev => (prev + 1) % reassuranceMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="relative mb-8">
        <div className="w-24 h-24 border-4 border-sky-500/20 rounded-full"></div>
        <div className="absolute top-0 w-24 h-24 border-t-4 border-sky-500 rounded-full animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <i className="fas fa-sparkles text-sky-400 animate-pulse text-2xl"></i>
        </div>
      </div>
      
      <h3 className="text-2xl font-bold mb-2">{message}{dots}</h3>
      <p className="text-slate-500 max-w-md italic transition-opacity duration-1000">
        "{reassuranceMessages[hintIndex]}"
      </p>
    </div>
  );
};

export default LoadingScreen;

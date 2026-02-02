
import React from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  onReset: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, onReset }) => {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center animate-in zoom-in duration-500">
      <div className="w-full relative rounded-3xl overflow-hidden shadow-2xl border border-slate-700 bg-black">
        <video 
          src={videoUrl} 
          controls 
          autoPlay 
          loop 
          className="w-full max-h-[70vh] object-contain"
        />
      </div>
      
      <div className="mt-8 flex flex-col md:flex-row gap-4 w-full justify-center">
        <a 
          href={videoUrl} 
          download="storyvibe_animation.mp4"
          className="px-8 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl font-bold flex items-center justify-center space-x-2 transition-colors"
        >
          <i className="fas fa-download"></i>
          <span>Download Video</span>
        </a>
        <button 
          onClick={onReset}
          className="px-8 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 hover:opacity-90 rounded-xl font-bold text-white flex items-center justify-center space-x-2 transition-all shadow-lg"
        >
          <i className="fas fa-plus"></i>
          <span>Create Another</span>
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;

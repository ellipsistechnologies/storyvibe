
import React from 'react';
import { Storyboard } from '../types';

interface StoryboardDisplayProps {
  storyboard: Storyboard;
  image: string;
  onGenerate: () => void;
  isLoading: boolean;
  aspectRatio: '16:9' | '9:16';
  onSetAspectRatio: (ratio: '16:9' | '9:16') => void;
}

const StoryboardDisplay: React.FC<StoryboardDisplayProps> = ({ 
  storyboard, 
  image, 
  onGenerate, 
  isLoading,
  aspectRatio,
  onSetAspectRatio
}) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
        <div className="w-full md:w-1/2">
          <div className="relative group overflow-hidden rounded-2xl border border-slate-700 shadow-2xl">
            <img 
              src={image} 
              alt="Source" 
              className="w-full object-cover max-h-[500px]" 
            />
            <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-sky-400 border border-sky-400/30">
              Source Image
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col">
          <h2 className="text-4xl font-extrabold mb-4 leading-tight">
            {storyboard.title}
          </h2>
          
          <div className="space-y-6 mt-4">
            {storyboard.steps.map((step, idx) => (
              <div key={idx} className="flex gap-4 group">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-sm font-bold text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-100">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-slate-400">Video Format:</label>
              <div className="flex bg-slate-800 p-1 rounded-lg">
                <button 
                  onClick={() => onSetAspectRatio('16:9')}
                  className={`px-4 py-1 rounded-md text-xs font-bold transition-all ${aspectRatio === '16:9' ? 'bg-sky-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                  LANDSCAPE (16:9)
                </button>
                <button 
                  onClick={() => onSetAspectRatio('9:16')}
                  className={`px-4 py-1 rounded-md text-xs font-bold transition-all ${aspectRatio === '9:16' ? 'bg-sky-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                  PORTRAIT (9:16)
                </button>
              </div>
            </div>

            <button
              onClick={onGenerate}
              disabled={isLoading}
              className={`w-full py-4 rounded-xl text-lg font-bold flex items-center justify-center space-x-3 transition-all ${
                isLoading 
                  ? "bg-slate-700 cursor-not-allowed text-slate-400" 
                  : "bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-[0_0_30px_rgba(56,189,248,0.3)] hover:shadow-[0_0_40px_rgba(56,189,248,0.5)] active:scale-[0.98]"
              }`}
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  <span>Animating with Veo...</span>
                </>
              ) : (
                <>
                  <i className="fas fa-play"></i>
                  <span>Generate AI Video</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryboardDisplay;

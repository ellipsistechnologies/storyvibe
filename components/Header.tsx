
import React from 'react';

interface HeaderProps {
  onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <header className="w-full max-w-6xl flex justify-between items-center py-4 border-b border-slate-800">
      <div 
        className="flex items-center space-x-2 cursor-pointer group" 
        onClick={onReset}
      >
        <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <i className="fas fa-film text-white text-xl"></i>
        </div>
        <h1 className="text-2xl font-bold tracking-tight">
          Story<span className="gradient-text">Vibe</span>
        </h1>
      </div>
      
      <nav className="hidden md:flex items-center space-x-6">
        <button 
          onClick={onReset}
          className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
        >
          New Story
        </button>
        <a 
          href="https://ai.google.dev/gemini-api/docs/billing" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs px-3 py-1 bg-slate-800 rounded-full text-slate-300 hover:bg-slate-700 transition-colors"
        >
          Billing Info
        </a>
      </nav>
    </header>
  );
};

export default Header;

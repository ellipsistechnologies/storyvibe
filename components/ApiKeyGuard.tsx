
import React, { useState, useEffect } from 'react';

interface ApiKeyGuardProps {
  onKeySelected: () => void;
}

const ApiKeyGuard: React.FC<ApiKeyGuardProps> = ({ onKeySelected }) => {
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkKey = async () => {
      try {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        if (hasKey) {
          onKeySelected();
        } else {
          setChecking(false);
        }
      } catch (e) {
        setChecking(false);
      }
    };
    checkKey();
  }, [onKeySelected]);

  const handleSelectKey = async () => {
    try {
      await window.aistudio.openSelectKey();
      // Assume success as per guidelines to handle race condition
      onKeySelected();
    } catch (e) {
      console.error("Failed to open key selector", e);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="w-8 h-8 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0f172a]">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl text-center">
        <div className="w-16 h-16 bg-sky-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <i className="fas fa-key text-sky-400 text-2xl"></i>
        </div>
        <h2 className="text-2xl font-bold mb-4">API Key Required</h2>
        <p className="text-slate-400 mb-8 leading-relaxed">
          To use the Veo video generation models, you must select a paid API key from your Google AI Studio account.
        </p>
        
        <div className="space-y-4">
          <button 
            onClick={handleSelectKey}
            className="w-full py-4 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl shadow-lg shadow-sky-500/20 transition-all active:scale-[0.98]"
          >
            Select API Key
          </button>
          
          <div className="text-xs text-slate-500 pt-4 border-t border-slate-800">
            Learn more about 
            <a 
              href="https://ai.google.dev/gemini-api/docs/billing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sky-400 hover:underline mx-1"
            >
              billing and API keys
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyGuard;


import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center max-w-xl mx-auto">
      <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/30">
        <i className="fas fa-exclamation-triangle text-3xl text-red-500"></i>
      </div>
      <h3 className="text-xl font-bold mb-4 text-white">Oops! Something went wrong</h3>
      <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4 mb-8">
        <p className="text-slate-400 text-sm leading-relaxed">{message}</p>
      </div>
      <button 
        onClick={onRetry}
        className="px-8 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold text-white transition-colors"
      >
        Go Back & Try Again
      </button>
    </div>
  );
};

export default ErrorMessage;

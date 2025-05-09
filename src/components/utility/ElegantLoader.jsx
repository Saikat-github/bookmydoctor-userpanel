import React from 'react';

const RippleLoader = () => {
  return (
    <div className="flex items-center justify-center w-full h-64">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full border-8 border-slate-500/20 animate-ping"></div>
        <div className="absolute inset-2 rounded-full border-8 border-slate-500/40 animate-ping" style={{ animationDelay: '0.2s' }}></div>
        <div className="absolute inset-4 rounded-full border-8 border-slate-500/60 animate-ping" style={{ animationDelay: '0.4s' }}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-slate-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

const DotFlowLoader = () => {
  return (
    <div className="flex items-center justify-center w-full h-64">
      <div className="flex space-x-2">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className="w-4 h-4 bg-slate-500 rounded-full animate-bounce"
            style={{ animationDelay: `${index * 0.15}s` }}
          ></div>
        ))}
      </div>
    </div>
  );
};


const MinimalLoader = () => {
    return (
      <div className="flex items-center justify-center w-full h-64">
        <div className="relative w-8 h-8">
          {/* Main spinning ring */}
          <div className="w-full h-full border-4 border-slate-200 rounded-full" />
          <div 
            className="absolute top-0 left-0 w-full h-full border-4 border-indigo-700 border-t-transparent rounded-full animate-spin"
          />
        </div>
      </div>
    );
  };

export { RippleLoader, DotFlowLoader, MinimalLoader };
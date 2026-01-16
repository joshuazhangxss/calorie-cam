
import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-[linear-gradient(180deg,rgba(251,250,249,1)_0%,rgba(235,247,242,1)_60%,rgba(46,184,138,0.15)_100%)] dark:bg-background-dark">
      <div className="flex flex-1 flex-col items-center justify-center px-6 relative z-10">
        <div className="mb-8 relative animate-[float_4s_ease-in-out_infinite]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/20 rounded-full blur-3xl dark:bg-primary/10"></div>
          <div className="relative flex items-center justify-center w-32 h-32 bg-white dark:bg-gray-800 rounded-3xl shadow-soft border border-slate-100 dark:border-gray-700">
            <div className="relative grid place-items-center">
              <span className="material-symbols-outlined text-primary text-6xl absolute opacity-20 rotate-45">shutter_speed</span>
              <span className="material-symbols-outlined text-primary text-5xl relative z-10 drop-shadow-sm -translate-y-1 translate-x-1">eco</span>
              <div className="absolute w-20 h-20 rounded-full border-2 border-primary/30"></div>
            </div>
          </div>
        </div>
        <div className="text-center space-y-3 z-10">
          <h1 className="text-[#121715] dark:text-white tracking-tight text-[40px] font-bold leading-tight">NutriScan</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium tracking-wide">Eat Smart, Live Light</p>
        </div>
      </div>
      <div className="pb-12 px-12 flex flex-col items-center justify-end shrink-0 gap-6">
        <div className="w-full max-w-[200px] flex flex-col gap-3">
          <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-gray-700 overflow-hidden">
            <div className="h-full w-2/3 rounded-full bg-primary shadow-[0_0_10px_rgba(46,184,138,0.5)]"></div>
          </div>
          <p className="text-xs text-center text-slate-400 dark:text-slate-500 font-medium">Loading your health journey...</p>
        </div>
        <div className="opacity-40">
          <span className="material-symbols-outlined text-slate-400 text-2xl">nutrition</span>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;

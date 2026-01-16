
import React, { useState } from 'react';
import { FoodRecognitionResult } from '../types';
import EditSheet from './EditSheet';

interface ResultScreenProps {
  result: FoodRecognitionResult;
  onConfirm: (result: FoodRecognitionResult) => void;
  onBack: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ result, onConfirm, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedResult, setEditedResult] = useState(result);

  const handleSaveEdit = (newName: string, newCalories: number) => {
    setEditedResult({ ...editedResult, name: newName, calories: newCalories });
    setIsEditing(false);
  };

  return (
    <div className="relative flex flex-col h-full w-full bg-background-light dark:bg-background-dark font-display">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-6 pb-2 z-10 shrink-0">
        <button 
          onClick={onBack}
          className="group flex items-center justify-center size-10 rounded-full bg-white dark:bg-surface-dark shadow-sm hover:shadow-md transition-all text-text-main dark:text-white"
        >
          <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
        </button>
        <h2 className="text-base font-bold tracking-tight">Analysis Complete</h2>
        <div className="size-10"></div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-36">
        <div className="px-6 pt-4">
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-soft bg-white dark:bg-surface-dark p-2">
            <div className="w-full h-full rounded-xl bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
              <img 
                src={editedResult.imageUrl || 'https://picsum.photos/400/300'} 
                className="absolute inset-0 w-full h-full object-cover"
                alt={editedResult.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="absolute top-4 right-4 bg-white/95 dark:bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-white/20">
              <span className="material-symbols-outlined text-primary text-[16px]">auto_awesome</span>
              <span className="text-xs font-bold text-text-main dark:text-white tracking-wide">
                {Math.round(result.confidence * 100)}% Match
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-8 px-6 text-center">
          <h1 className="text-2xl font-extrabold text-text-main dark:text-white leading-tight">{editedResult.name}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">{result.subtitle}</p>
          
          <div className="mt-8 mb-4 relative">
            <div className="absolute -inset-4 bg-primary/5 rounded-full blur-xl dark:bg-primary/10"></div>
            <div className="relative flex flex-col items-center">
              <span className="text-[64px] font-extrabold text-primary tracking-tighter leading-none drop-shadow-sm">
                {editedResult.calories}
              </span>
              <span className="text-lg font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest text-[10px] mt-1">Calories (kcal)</span>
            </div>
          </div>
        </div>

        {/* Nutrition Card */}
        <div className="px-6 mt-4 mb-4">
          <div className="bg-white dark:bg-surface-dark rounded-[2rem] p-6 shadow-soft flex flex-col items-center relative overflow-hidden ring-1 ring-black/5 dark:ring-white/5">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-50"></div>
            <div className="w-full flex justify-between items-center mb-6 z-10">
              <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Macros</h3>
              <button className="text-primary hover:text-primary/80 transition-colors">
                <span className="material-symbols-outlined text-[20px]">info</span>
              </button>
            </div>
            
            <div className="flex items-center justify-between w-full gap-6 z-10">
              <div className="relative size-32 shrink-0">
                <svg className="transform -rotate-90 w-full h-full drop-shadow-lg" viewBox="0 0 100 100">
                  <circle className="stroke-gray-100 dark:stroke-gray-700/50" cx="50" cy="50" fill="transparent" r="40" strokeWidth="14"></circle>
                  <circle className="stroke-primary" cx="50" cy="50" fill="transparent" r="40" strokeDasharray="100 251" strokeDashoffset="0" strokeLinecap="round" strokeWidth="14"></circle>
                  <circle className="stroke-peach" cx="50" cy="50" fill="transparent" r="40" strokeDasharray="60 251" strokeDashoffset="-110" strokeLinecap="round" strokeWidth="14"></circle>
                  <circle className="stroke-soft-yellow" cx="50" cy="50" fill="transparent" r="40" strokeDasharray="40 251" strokeDashoffset="-180" strokeLinecap="round" strokeWidth="14"></circle>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl text-gray-400">local_fire_department</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-3 flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="size-2.5 rounded-full bg-primary"></div>
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Carbs</span>
                  </div>
                  <span className="text-sm font-bold dark:text-white">{result.macros.carbs}g</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="size-2.5 rounded-full bg-peach"></div>
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Protein</span>
                  </div>
                  <span className="text-sm font-bold dark:text-white">{result.macros.protein}g</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="size-2.5 rounded-full bg-soft-yellow"></div>
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Fat</span>
                  </div>
                  <span className="text-sm font-bold dark:text-white">{result.macros.fat}g</span>
                </div>
              </div>
            </div>

            <div className="mt-6 w-full p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl flex gap-3 items-start border border-gray-100 dark:border-gray-700">
              <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">eco</span>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                <span className="font-bold text-primary">AI Insight:</span> {result.insight}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="absolute bottom-0 left-0 w-full p-6 pt-12 bg-gradient-to-t from-background-light via-background-light/95 to-transparent dark:from-background-dark dark:via-background-dark/95 z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsEditing(true)}
            className="flex-1 h-14 rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-surface-dark/50 text-gray-600 dark:text-gray-200 font-bold text-sm hover:border-primary hover:text-primary transition-colors active:scale-95 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">edit</span>
            <span>Edit Manually</span>
          </button>
          <button 
            onClick={() => onConfirm(editedResult)}
            className="flex-[1.5] h-14 rounded-2xl bg-primary text-white font-bold text-lg shadow-glow hover:bg-[#25a078] transition-all active:scale-[0.98] flex items-center justify-center gap-2 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 skew-y-12"></div>
            <span>Confirm & Log</span>
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
          </button>
        </div>
      </div>

      {isEditing && (
        <EditSheet 
          name={editedResult.name} 
          calories={editedResult.calories} 
          onSave={handleSaveEdit} 
          onClose={() => setIsEditing(false)} 
        />
      )}
    </div>
  );
};

export default ResultScreen;

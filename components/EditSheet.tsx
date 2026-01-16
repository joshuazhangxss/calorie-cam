
import React, { useState } from 'react';

interface EditSheetProps {
  name: string;
  calories: number;
  onSave: (name: string, calories: number) => void;
  onClose: () => void;
}

const EditSheet: React.FC<EditSheetProps> = ({ name, calories, onSave, onClose }) => {
  const [editedName, setEditedName] = useState(name);
  const [editedCalories, setEditedCalories] = useState(calories.toString());

  const handleKeypad = (val: string) => {
    if (val === 'backspace') {
      setEditedCalories(prev => prev.slice(0, -1) || '0');
    } else if (val === '.') {
      if (!editedCalories.includes('.')) setEditedCalories(prev => prev + '.');
    } else {
      setEditedCalories(prev => (prev === '0' ? val : prev + val));
    }
  };

  return (
    <div className="absolute inset-0 z-[60] flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" onClick={onClose} />
      
      <div className="relative w-full h-[92%] bg-surface-light dark:bg-surface-dark rounded-t-xl shadow-2xl animate-slide-up pb-6 flex flex-col">
        <div className="flex w-full items-center justify-center pt-5 pb-2">
          <div className="h-1.5 w-12 rounded-full bg-gray-300 dark:bg-gray-600"></div>
        </div>
        
        <div className="px-6 pb-6 pt-2 text-center">
          <h2 className="text-gray-900 dark:text-white tracking-tight text-[28px] font-bold leading-tight">Edit Entry</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Make adjustments to the recognized food.</p>
        </div>

        <div className="flex-1 overflow-y-auto px-6 no-scrollbar flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 dark:text-gray-300 text-sm font-bold pl-4">Food Name</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl">restaurant</span>
              <input 
                className="w-full h-16 pl-14 pr-6 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-transparent focus:border-primary/50 transition-all text-lg font-medium dark:text-white"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                placeholder="What did you eat?"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-primary text-sm font-bold pl-4">Calories (kcal)</label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-primary text-xl font-bold">local_fire_department</span>
              <div className="w-full h-16 pl-14 pr-16 rounded-full bg-white dark:bg-gray-800 border-2 border-primary shadow-glow flex items-center text-xl font-bold dark:text-white">
                {editedCalories}
                <span className="ml-auto text-gray-400 font-medium text-sm">kcal</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => onSave(editedName, parseFloat(editedCalories))}
            className="mt-4 w-full h-14 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">check</span>
            <span>Save Changes</span>
          </button>

          <div className="mt-8 pb-4 grid grid-cols-3 gap-y-4 gap-x-8 px-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, 'backspace'].map((key) => (
              <button 
                key={key}
                onClick={() => handleKeypad(key.toString())}
                className="h-14 flex items-center justify-center rounded-full text-2xl font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all active:scale-90"
              >
                {key === 'backspace' ? <span className="material-symbols-outlined">backspace</span> : key}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSheet;

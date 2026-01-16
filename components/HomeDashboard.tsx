
import React from 'react';
import { MealLog, Screen } from '../types';

interface HomeDashboardProps {
  meals: MealLog[];
  onScanClick: () => void;
  onProfileClick: () => void;
  onNavigate: (screen: Screen) => void;
}

const HomeDashboard: React.FC<HomeDashboardProps> = ({ meals, onScanClick, onProfileClick, onNavigate }) => {
  const totalEaten = meals.reduce((acc, meal) => acc + meal.calories, 0);
  const target = 2000;
  const burned = 320;
  const remaining = target - totalEaten + burned;
  const progressPercent = Math.min((totalEaten / target) * 100, 100);

  return (
    <div className="relative w-full h-full flex flex-col pb-32 overflow-hidden bg-background-light dark:bg-background-dark">
      <header className="flex items-center justify-between p-6 pt-8 shrink-0">
        <div className="flex flex-col">
          <span className="text-text-sub-light dark:text-text-sub-dark text-sm font-medium tracking-wide">Good Morning,</span>
          <h2 className="text-text-main-light dark:text-text-main-dark text-2xl font-bold leading-tight tracking-tight">Alex</h2>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center size-10 rounded-full bg-white dark:bg-surface-dark shadow-sm text-text-main-light dark:text-white transition-transform active:scale-95">
            <span className="material-symbols-outlined text-[20px]">notifications</span>
          </button>
          <div onClick={onProfileClick} className="cursor-pointer relative size-10 rounded-full overflow-hidden border-2 border-white dark:border-surface-dark shadow-sm">
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/user/100/100')" }}></div>
          </div>
        </div>
      </header>

      <div className="flex-1 px-6 space-y-6 overflow-y-auto no-scrollbar pb-10">
        {/* Calorie Ring */}
        <div className="relative w-full bg-surface-light dark:bg-surface-dark rounded-3xl p-6 shadow-soft flex flex-col items-center justify-center overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>
          <div className="relative size-56 flex items-center justify-center">
            <svg className="size-full -rotate-90 transform" viewBox="0 0 100 100">
              <circle className="text-gray-100 dark:text-gray-700/50" cx="50" cy="50" fill="none" r="42" stroke="currentColor" strokeLinecap="round" strokeWidth="8"></circle>
              <circle 
                className="text-primary drop-shadow-sm transition-all duration-1000" 
                cx="50" cy="50" fill="none" r="42" 
                stroke="currentColor" 
                strokeDasharray="264" 
                strokeDashoffset={264 - (264 * progressPercent / 100)} 
                strokeLinecap="round" strokeWidth="8"
              ></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-primary mb-1 text-[24px]">local_fire_department</span>
              <h1 className="text-4xl font-extrabold text-text-main-light dark:text-white tracking-tighter">{remaining.toLocaleString()}</h1>
              <p className="text-text-sub-light dark:text-text-sub-dark text-sm font-medium mt-1">Kcal Remaining</p>
            </div>
          </div>
          <div className="flex justify-between w-full mt-4 px-4">
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Eaten</p>
              <p className="text-lg font-bold text-text-main-light dark:text-white">{totalEaten}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Burned</p>
              <p className="text-lg font-bold text-text-main-light dark:text-white">{burned}</p>
            </div>
          </div>
        </div>

        {/* Macros Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 shadow-soft flex flex-col gap-3 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-peach"></div>
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-peach"></div>
              <span className="text-xs font-semibold text-gray-500">Carbs</span>
            </div>
            <div>
              <p className="text-lg font-bold text-text-main-light dark:text-white leading-none">45g</p>
              <p className="text-xs text-gray-400 mt-1">/ 150g</p>
            </div>
          </div>
          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 shadow-soft flex flex-col gap-3 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#9ECAFF]"></div>
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-[#9ECAFF]"></div>
              <span className="text-xs font-semibold text-gray-500">Protein</span>
            </div>
            <div>
              <p className="text-lg font-bold text-text-main-light dark:text-white leading-none">60g</p>
              <p className="text-xs text-gray-400 mt-1">/ 120g</p>
            </div>
          </div>
          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 shadow-soft flex flex-col gap-3 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-soft-yellow"></div>
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-soft-yellow"></div>
              <span className="text-xs font-semibold text-gray-500">Fat</span>
            </div>
            <div>
              <p className="text-lg font-bold text-text-main-light dark:text-white leading-none">20g</p>
              <p className="text-xs text-gray-400 mt-1">/ 60g</p>
            </div>
          </div>
        </div>

        {/* Recent Meals */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-text-main-light dark:text-white">Today's Meals</h3>
            <button className="text-primary text-sm font-semibold hover:opacity-80">View All</button>
          </div>
          <div className="flex flex-col gap-4">
            {meals.map(meal => (
              <div key={meal.id} className="group bg-surface-light dark:bg-surface-dark p-3 rounded-2xl shadow-soft flex items-center gap-4 transition-transform active:scale-[0.98]">
                <div className="size-20 shrink-0 rounded-xl bg-gray-100 dark:bg-gray-800 overflow-hidden relative">
                  <img src={meal.imageUrl} alt={meal.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="flex-1 flex flex-col justify-center gap-1">
                  <h4 className="text-text-main-light dark:text-white font-bold text-base leading-tight">{meal.name}</h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    <span>{meal.timestamp}</span>
                    <span className="size-1 rounded-full bg-gray-300"></span>
                    <span>{meal.type}</span>
                  </div>
                </div>
                <div className="pr-3 flex flex-col items-end">
                  <span className="text-primary font-bold text-sm">+{meal.calories}</span>
                  <span className="text-[10px] text-gray-400">kcal</span>
                </div>
              </div>
            ))}
            <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 text-center h-24 opacity-60">
              <span className="text-xs text-gray-500">Log your next meal to keep tracking!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Navbar */}
      <div className="fixed bottom-6 w-full max-w-md px-6 z-50 pointer-events-none">
        <div className="relative flex items-center justify-between pointer-events-auto">
          <div className="absolute inset-0 bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-xl rounded-2xl shadow-soft border border-white/20 dark:border-white/5 h-16 w-full -z-10"></div>
          <div className="flex-1 flex justify-evenly items-center h-16">
            <button className="text-primary">
              <span className="material-symbols-outlined fill-1">home</span>
            </button>
            <button className="text-gray-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">analytics</span>
            </button>
          </div>
          <div className="w-16"></div>
          <div className="flex-1 flex justify-evenly items-center h-16">
            <button className="text-gray-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">history</span>
            </button>
            <button onClick={onProfileClick} className="text-gray-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">person</span>
            </button>
          </div>
          <button 
            onClick={onScanClick}
            className="absolute left-1/2 -translate-x-1/2 -top-6 size-16 rounded-full bg-primary shadow-float flex items-center justify-center text-white transition-transform active:scale-90 hover:brightness-110"
          >
            <span className="material-symbols-outlined text-[32px]">photo_camera</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;

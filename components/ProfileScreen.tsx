
import React from 'react';
import { Screen } from '../types';

interface ProfileScreenProps {
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onBack, onNavigate }) => {
  return (
    <div className="relative flex h-full w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display">
      <div className="flex items-center px-6 py-4 justify-between sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <button onClick={onBack} className="absolute left-6 text-gray-600 dark:text-white">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-xl font-bold flex-1 text-center">Profile</h2>
        <button className="absolute right-6 text-gray-600 dark:text-white">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 space-y-6 no-scrollbar">
        <div className="flex flex-col items-center px-6 pt-2">
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-1 bg-gradient-to-tr from-primary/20 to-primary/0 rounded-full blur"></div>
            <div className="relative w-28 h-28 rounded-full p-1 bg-white dark:bg-surface-dark shadow-soft">
              <div className="w-full h-full rounded-full bg-cover bg-center border-2 border-primary/10" style={{ backgroundImage: "url('https://picsum.photos/seed/user-main/200/200')" }}></div>
            </div>
            <button className="absolute bottom-1 right-1 bg-primary text-white rounded-full p-1.5 shadow-md border-2 border-white dark:border-background-dark">
              <span className="material-symbols-outlined text-[16px]">edit</span>
            </button>
          </div>
          <div className="mt-4 text-center space-y-1">
            <h1 className="text-2xl font-bold">Alex Johnson</h1>
            <p className="text-gray-500 font-medium">Health Enthusiast</p>
          </div>
        </div>

        <div className="px-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1 rounded-2xl bg-white dark:bg-surface-dark p-4 items-center text-center shadow-soft border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-primary text-[20px]">local_fire_department</span>
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Streak</p>
              </div>
              <p className="text-3xl font-extrabold">12 <span className="text-base font-medium text-gray-400">Days</span></p>
            </div>
            <div className="flex flex-col gap-1 rounded-2xl bg-white dark:bg-surface-dark p-4 items-center text-center shadow-soft border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-blue-400 text-[20px]">monitor_weight</span>
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Weight</p>
              </div>
              <p className="text-3xl font-extrabold">75 <span className="text-base font-medium text-gray-400">kg</span></p>
            </div>
          </div>
        </div>

        {/* Habit Tracker Placeholder */}
        <div className="px-6">
          <div className="bg-white dark:bg-surface-dark rounded-2xl p-5 shadow-soft border border-gray-100 dark:border-gray-800">
             <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
               <span className="material-symbols-outlined text-primary">calendar_month</span> Habit Tracker
             </h3>
             <div className="grid grid-cols-7 gap-y-2 mb-2 text-center text-[10px] font-bold text-gray-400">
               {['S','M','T','W','T','F','S'].map(d => <div key={d}>{d}</div>)}
             </div>
             <div className="grid grid-cols-7 gap-y-1 justify-items-center">
                {Array.from({length: 14}).map((_, i) => (
                  <div key={i} className={`h-8 w-8 flex items-center justify-center text-sm rounded-full ${i === 4 ? 'bg-primary text-white font-bold' : 'text-gray-500'}`}>
                    {i + 1}
                  </div>
                ))}
             </div>
          </div>
        </div>

        <div className="px-6 flex flex-col gap-3">
          {[
            { icon: 'menu_book', color: 'text-orange-500', bg: 'bg-orange-50', text: 'My Recipes' },
            { icon: 'ecg_heart', color: 'text-blue-500', bg: 'bg-blue-50', text: 'Health Report' },
            { icon: 'settings', color: 'text-gray-500', bg: 'bg-gray-50', text: 'Settings' }
          ].map(item => (
            <button key={item.text} className="flex items-center justify-between p-4 bg-white dark:bg-surface-dark rounded-xl shadow-soft border border-gray-100 dark:border-gray-800 active:scale-[0.98]">
              <div className="flex items-center gap-4">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${item.bg} ${item.color}`}>
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <span className="text-base font-bold">{item.text}</span>
              </div>
              <span className="material-symbols-outlined text-gray-300">chevron_right</span>
            </button>
          ))}
        </div>

        <div className="px-6 pb-10 text-center">
          <button className="text-sm font-medium text-gray-400 hover:text-red-500">Sign Out</button>
        </div>
      </div>

      <div className="fixed bottom-0 w-full max-w-md bg-white dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800 px-6 py-3 pb-6 flex justify-between items-center z-20">
        <button onClick={() => onNavigate(Screen.Home)} className="text-gray-400"><span className="material-symbols-outlined">home</span></button>
        <button className="text-gray-400"><span className="material-symbols-outlined">restaurant_menu</span></button>
        <button onClick={() => onNavigate(Screen.Camera)} className="relative -top-6 bg-primary text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center border-4 border-white dark:border-background-dark">
          <span className="material-symbols-outlined text-[28px]">photo_camera</span>
        </button>
        <button className="text-gray-400"><span className="material-symbols-outlined">analytics</span></button>
        <button className="text-primary"><span className="material-symbols-outlined fill-current">person</span></button>
      </div>
    </div>
  );
};

export default ProfileScreen;

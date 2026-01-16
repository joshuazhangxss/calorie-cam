
import React, { useState, useEffect, useCallback } from 'react';
import { Screen, FoodRecognitionResult, MealLog } from './types';
import SplashScreen from './components/SplashScreen';
import HomeDashboard from './components/HomeDashboard';
import CameraScreen from './components/CameraScreen';
import ResultScreen from './components/ResultScreen';
import ProfileScreen from './components/ProfileScreen';

const INITIAL_MEALS: MealLog[] = [
  {
    id: '1',
    name: 'Avocado Toast',
    calories: 350,
    timestamp: '8:30 AM',
    type: 'Breakfast',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVyViBDwHobi2-AdgqTaEAc0PHEGH8EvX8B-GzRCx7Wk8St38Y47z3J1tv5eYnhcyQ4XrcyUvJBZSU8044jLY5pbzjNw1463o6chnOS3iClaZnVswu8Nk1hfl2OLSplAXDIz7vhvbaz2qi5bFQIFoLSWfNTc86dNy79segSOdqn6Ji7S0O8ETHg4jnjiCATGZevbLAJRWmrN0gxzA3PxRILXyRmqb3ZYCI_aWvpfMZpmfDYO9w869WviiAkeSMtqqCuyBsREtX8yXS'
  },
  {
    id: '2',
    name: 'Grilled Chicken',
    calories: 450,
    timestamp: '12:45 PM',
    type: 'Lunch',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdO9ocY5yOvNfTDtXH0vMDZ1vWwpaNSVd28eXj-HrME5dTXDhbf_MYS2_GM0CQ5BpT5Lqdi33J_761XvIXfjQBUKqw9eK9l64KmNTwEe0i43hciuGH2xxzvhqp3Gan1v0p_ma1jeATxu81j0HZfUHjgaDlWH4XzWR1Vxx0BqavoOddkuA24_d1_BRmvzy7Uhp1YG7ag3y9-gnFGEXeaC7avs_JghcjpBUu4GZTELPqjZ33Bggpwi531--r8kA6G4burZVOpJzRy8Ah'
  }
];

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Splash);
  const [meals, setMeals] = useState<MealLog[]>(INITIAL_MEALS);
  const [lastScanResult, setLastScanResult] = useState<FoodRecognitionResult | null>(null);

  useEffect(() => {
    // Simulate loading on splash screen
    if (currentScreen === Screen.Splash) {
      const timer = setTimeout(() => {
        setCurrentScreen(Screen.Home);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const handleScanComplete = (result: FoodRecognitionResult) => {
    setLastScanResult(result);
    setCurrentScreen(Screen.Result);
  };

  const handleLogMeal = (result: FoodRecognitionResult) => {
    const newMeal: MealLog = {
      id: Math.random().toString(36).substr(2, 9),
      name: result.name,
      calories: result.calories,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'Snack', // Defaulting to snack for simplicity
      imageUrl: result.imageUrl || 'https://picsum.photos/200/200'
    };
    setMeals([newMeal, ...meals]);
    setCurrentScreen(Screen.Home);
  };

  const navigateTo = (screen: Screen) => setCurrentScreen(screen);

  return (
    <div className="max-w-md mx-auto h-screen relative bg-background-light dark:bg-background-dark shadow-2xl overflow-hidden">
      {currentScreen === Screen.Splash && <SplashScreen />}
      
      {currentScreen === Screen.Home && (
        <HomeDashboard 
          meals={meals} 
          onScanClick={() => navigateTo(Screen.Camera)} 
          onProfileClick={() => navigateTo(Screen.Profile)}
          onNavigate={navigateTo}
        />
      )}
      
      {currentScreen === Screen.Camera && (
        <CameraScreen 
          onScanComplete={handleScanComplete} 
          onClose={() => navigateTo(Screen.Home)} 
        />
      )}
      
      {currentScreen === Screen.Result && lastScanResult && (
        <ResultScreen 
          result={lastScanResult} 
          onConfirm={handleLogMeal} 
          onBack={() => navigateTo(Screen.Home)} 
        />
      )}

      {currentScreen === Screen.Profile && (
        <ProfileScreen 
          onBack={() => navigateTo(Screen.Home)} 
          onNavigate={navigateTo}
        />
      )}
    </div>
  );
};

export default App;

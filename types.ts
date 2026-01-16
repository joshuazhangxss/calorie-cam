
export interface MacroData {
  carbs: number;
  protein: number;
  fat: number;
}

export interface FoodRecognitionResult {
  name: string;
  subtitle: string;
  calories: number;
  macros: MacroData;
  insight: string;
  confidence: number;
  imageUrl?: string;
}

export interface MealLog {
  id: string;
  name: string;
  calories: number;
  timestamp: string;
  type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  imageUrl: string;
}

export enum Screen {
  Splash,
  Home,
  Camera,
  Result,
  Profile
}

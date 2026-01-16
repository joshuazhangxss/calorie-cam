
import { GoogleGenAI, Type } from "@google/genai";
import { FoodRecognitionResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const recognizeFood = async (base64Image: string): Promise<FoodRecognitionResult> => {
  const model = "gemini-3-flash-preview";
  
  const prompt = "Identify the food item in this image. Provide the primary name, a short descriptive subtitle (e.g., 'with poached egg'), estimated calories for a standard portion, and macro breakdown (carbs, protein, fat in grams). Also provide a short healthy insight about it.";

  const response = await ai.models.generateContent({
    model,
    contents: [
      {
        parts: [
          { inlineData: { mimeType: "image/jpeg", data: base64Image } },
          { text: prompt }
        ]
      }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          subtitle: { type: Type.STRING },
          calories: { type: Type.NUMBER },
          macros: {
            type: Type.OBJECT,
            properties: {
              carbs: { type: Type.NUMBER },
              protein: { type: Type.NUMBER },
              fat: { type: Type.NUMBER }
            },
            required: ["carbs", "protein", "fat"]
          },
          insight: { type: Type.STRING },
          confidence: { type: Type.NUMBER }
        },
        required: ["name", "subtitle", "calories", "macros", "insight", "confidence"]
      }
    }
  });

  try {
    const result = JSON.parse(response.text || '{}');
    return result as FoodRecognitionResult;
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    throw new Error("Could not recognize food");
  }
};

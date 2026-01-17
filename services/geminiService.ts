import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateBirthdayPoem = async (name: string): Promise<string> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a short, heart-melting birthday poem for ${name}. Make it fun and poetic. Maximum 4 lines.`,
      config: {
        temperature: 0.8,
      }
    });
    return response.text || "May your day be filled with magic and light!";
  } catch (error) {
    return "To the person who makes the world brighter, Happy Birthday!";
  }
};

export const generateBirthdayFacts = async (name: string): Promise<string[]> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `List 3 cute and funny reasons why ${name} is the best friend or person. Short and sweet.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  } catch (error) {
    return [
      `${name} always has the best energy!`,
      `${name} is a total sunshine person!`,
      `${name} deserves the world!`
    ];
  }
};
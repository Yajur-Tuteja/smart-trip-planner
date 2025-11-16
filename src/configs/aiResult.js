import { GoogleGenAI } from "@google/genai";
import { AI_PROMPT } from "./options";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY, // or process.env.GEMINI_API_KEY in Node
});

export async function generateResult(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const text = response.candidates[0].content.parts[0].text;

  const formattedText = text.replace('json','').replaceAll('```','');

  // Convert text to JSON safely
  try {
    const data = JSON.parse(formattedText);
    console.log("Parsed JSON:", data);
    return data;
  } catch (e) {
    console.error("Invalid JSON:", formattedText);
    return null;
  }
}


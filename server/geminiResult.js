import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";


dotenv.config({ path: ".env.local" })

// Initialize Google GenAI client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY, // backend-safe
});

export async function generateResult(req, res) {
  try {
    const { prompt } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.candidates[0].content.parts[0].text;

    // Clean output (Gemini may wrap JSON in markdown)
    const formattedText = text
      .replace("json", "")
      .replaceAll("```", "");

    // Parse JSON safely
    try {
      const data = JSON.parse(formattedText);
      console.log("Parsed JSON:", data);

      res.json({
        success: true,
        data: data,
        error: null,
      });

    } catch (e) {
      console.error("Invalid JSON returned:", e);

      res.status(500).json({
        success: false,
        data: null,
        error: "Invalid JSON returned from GenAI",
      });

      return null;
    }
  } catch (error) {

    console.error("GenAI error:", error);

    res.status(500).json({
      success: false,
      data: null,
      error: "Internal server error",
    });

    return null;
  }
}

import express from 'express';
import { generateResult } from './geminiResult.js';
import { searchPhotos } from './duckDuckGo.js';
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

console.log("KEY:", process.env.GEMINI_API_KEY);

const app = express();

app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend working!" });
});

app.post("/api/generate", async (req, res) => 
  { 
    console.log(req.body);
    const { prompt } = req.body; 
    const result = await generateResult(prompt); 
    res.json({ result }); 
  });


app.get("/api/search", async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    const results = await searchPhotos(query);
    res.json(results);
    
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

app.listen(3000, () => console.log("Backend running on port 3000"));
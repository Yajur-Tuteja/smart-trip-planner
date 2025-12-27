import express from 'express';
import cors from 'cors';
import { generateResult } from './geminiResult.js';
import { createTrip } from './firebase.js';
// import { searchPhotos } from './duckDuckGo.js';
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

console.log("KEY:", process.env.GEMINI_API_KEY);

const app = express();

app.use(express.json());
// app.use(cors());

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend working!" });
});

app.post("/api/generate", async (req, res) => {
  console.log(req.body);
  const { prompt } = req.body;
  const result = await generateResult(prompt);
  res.json({ result });
});

app.post("/api/trips", createTrip);

app.listen(3000, () => console.log("Backend running on port 3000"));
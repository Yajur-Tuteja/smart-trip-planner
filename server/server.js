import express from 'express';
import { generateResult } from './geminiResult.js';
import { createTrip } from './firebase.js';

const app = express();

app.use(express.json());


app.post("/api/generate", generateResult);

app.post("/api/trips", createTrip);


if (!process.env.VERCEL) {
  app.listen(3000, () => console.log("Backend running on port 3000"));
}

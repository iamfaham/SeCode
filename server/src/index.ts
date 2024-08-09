import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from 'cors';


dotenv.config();

const GEMINI_API_KEY: any = process.env.GEMINI_API_KEY
const app = express();
const port = process.env.PORT || 3000;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);


app.use(bodyParser.json());
app.use(cors());

app.post('/analyze', async (req, res) => {
  const { code } = req.body;

  try {

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Analyze the following code for security vulnerabilities and provide feedback in under 500 words:
        \n\n${code}\n\n 
        Just say "looks good" or "seems correct" if the code does not have any vulnerabilities. List out all the Vulnerabilities depending upon severity.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
   
    res.json({ suggestions: text.trim() });

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

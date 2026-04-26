import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

async function listModels() {
  try {
    // The SDK doesn't have a direct listModels in the main export easily accessible like this in all versions,
    // but we can try to fetch them or just try different model names.
    console.log("Testing API Key:", API_KEY.substring(0, 10) + "...");
    
    // Attempting a simple request with 'gemini-flash-latest'
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    const result = await model.generateContent("test");
    console.log("Response with gemini-flash-latest:", result.response.text());
  } catch (error: any) {
    console.error("Error with gemini-flash-latest:", error.message);
    
    try {
        console.log("Trying gemini-1.5-flash (v1beta)...");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("test");
        console.log("Response with gemini-1.5-flash (v1beta):", result.response.text());
    } catch (err: any) {
        console.error("Error with gemini-1.5-flash (v1beta):", err.message);
    }
  }
}

listModels();

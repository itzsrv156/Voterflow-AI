import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

const MODELS_TO_TEST = [
    "gemini-3-flash-preview",
    "gemini-flash-latest",
    "gemini-2.5-flash-lite",
    "gemini-1.5-flash"
];

async function testModels() {
    for (const modelName of MODELS_TO_TEST) {
        try {
            console.log(`Testing ${modelName}...`);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hello, respond with one word: 'Success'.");
            console.log(`${modelName} result:`, result.response.text().trim());
        } catch (e) {
            console.log(`${modelName} failed:`, e.message);
        }
    }
}

testModels();

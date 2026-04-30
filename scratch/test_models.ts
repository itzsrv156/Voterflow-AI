import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

async function listModels() {
    try {
        // There is no listModels in the client SDK usually, but we can try to hit a known model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("test");
        console.log("gemini-1.5-flash works");
    } catch (e) {
        console.log("gemini-1.5-flash failed:", e.message);
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const result = await model.generateContent("test");
        console.log("gemini-1.5-pro works");
    } catch (e) {
        console.log("gemini-1.5-pro failed:", e.message);
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent("test");
        console.log("gemini-pro works");
    } catch (e) {
        console.log("gemini-pro failed:", e.message);
    }
}

listModels();

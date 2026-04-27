import { GoogleGenerativeAI } from "@google/generative-ai";

// Security: API Key is now loaded from .env file (VITE_GEMINI_API_KEY)
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ""; 

const genAI = new GoogleGenerativeAI(API_KEY);

export const getGeminiResponse = async (userPrompt: string, systemContext: string) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: systemContext
    });

    const result = await model.generateContent(userPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my neural core. Please ensure your API key is configured correctly in geminiCore.ts.";
  }
};

export const streamGeminiResponse = async (
  userPrompt: string,
  systemContext: string,
  onChunk: (text: string) => void
) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: systemContext
    });

    const result = await model.generateContentStream(userPrompt);

    let fullText = "";
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      fullText += chunkText;
      onChunk(fullText);
    }
  } catch (error: unknown) {
    console.error("Gemini Streaming Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Check your network or API key.";
    onChunk(`Connection failed: ${errorMessage}`);
  }
};

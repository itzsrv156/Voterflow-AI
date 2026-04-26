import { GoogleGenerativeAI } from "@google/generative-ai";

// TO THE USER: Get your API Key from https://aistudio.google.com/app/apikey
// Replace 'YOUR_API_KEY' with your actual key.
const API_KEY = "AIzaSyCsj9CeilCZEL-coo6rOUQ2pSy9pJwNo30";

const genAI = new GoogleGenerativeAI(API_KEY);

export const getGeminiResponse = async (userPrompt: string, systemContext: string) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
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
      model: "gemini-1.5-flash",
      systemInstruction: systemContext
    });

    const result = await model.generateContentStream(userPrompt);

    let fullText = "";
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      fullText += chunkText;
      onChunk(fullText);
    }
  } catch (error: any) {
    console.error("Gemini Streaming Error:", error);
    const errorMessage = error?.message || "Check your network or API key.";
    onChunk(`Connection failed: ${errorMessage}`);
  }
};

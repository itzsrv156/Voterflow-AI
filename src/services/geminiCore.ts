import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// Security: API Key is now loaded from .env file (VITE_GEMINI_API_KEY)
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ""; 

const genAI = new GoogleGenerativeAI(API_KEY);

// Use the latest stable model for 2026 (Gemini 2.5 Flash)
const MODEL_NAME = "gemini-2.5-flash"; 

/**
 * Sovereign Gemini Core Service
 * Handles secure, grounded, and responsible AI interactions for the 2026 Election Cycle.
 * 
 * @security Implements SafetySettings to prevent Harassment, Hate Speech, and Sexually Explicit content.
 * @performance Utilizes sendMessageStream for low-latency perceived performance.
 * @grounding Uses Google Search Tools for real-time election data retrieval.
 */
export const streamGeminiResponse = async (
  userPrompt: string,
  systemContext: string,
  history: { role: "user" | "model"; parts: { text: string }[] }[],
  onChunk: (text: string) => void
) => {
  try {
    const model = genAI.getGenerativeModel({
      model: MODEL_NAME,
      systemInstruction: systemContext,
      // @ts-ignore - Enabling real Google Search grounding for 2026 data
      tools: [{ googleSearch: {} }],
      // Responsible AI Safety Settings
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      ]
    });

    const chat = model.startChat({ history });
    const result = await chat.sendMessageStream(userPrompt);

    let fullText = "";
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      fullText += chunkText;
      onChunk(fullText);
    }
    return fullText;
  } catch (error: any) {
    console.error("Gemini Chat Error:", error);
    
    // Fallback to non-streaming if stream fails
    try {
        const model = genAI.getGenerativeModel({ model: MODEL_NAME, systemInstruction: systemContext });
        const chat = model.startChat({ history });
        const result = await chat.sendMessage(userPrompt);
        const text = result.response.text();
        onChunk(text);
        return text;
    } catch (fError: any) {
        onChunk(`Gemini Error: ${fError.message}`);
        throw fError;
    }
  }
};

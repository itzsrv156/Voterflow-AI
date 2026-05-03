import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

/**
 * Sovereign Gemini Core Configuration
 * Uses environment-secured API keys and targets the 2026-standard models.
 */
const API_KEY: string = import.meta.env.VITE_GEMINI_API_KEY || ""; 
const genAI = new GoogleGenerativeAI(API_KEY);

/** 
 * Latest stable lightweight model. 
 * @constant 
 */
const MODEL_NAME = "gemini-1.5-flash"; 

/**
 * Interface for chat history messages adhering to Gemini API protocol.
 */
export interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

/**
 * Sovereign Gemini Core Service
 * Handles secure, grounded, and responsible AI interactions for the 2026 Election Cycle.
 * 
 * @param userPrompt - The latest message from the user.
 * @param systemContext - The system instruction defining the AI's persona and constraints.
 * @param history - The conversation history for contextual awareness.
 * @param onChunk - Callback executed for every stream chunk received.
 * @returns {Promise<string>} The full accumulated response text.
 * @throws {Error} If API validation or execution fails.
 */
export const streamGeminiResponse = async (
  userPrompt: string,
  systemContext: string,
  history: ChatMessage[],
  onChunk: (text: string) => void
): Promise<string> => {
  // 1. Validation: Ensure API Key exists
  if (!API_KEY) {
    const errorMsg = "Configuration Error: VITE_GEMINI_API_KEY is missing. Please check your .env file.";
    onChunk(errorMsg);
    throw new Error(errorMsg);
  }

  // 2. Protocol Enforcement: History must start with a 'user' role
  const sanitizedHistory = [...history];
  while (sanitizedHistory.length > 0 && sanitizedHistory[0].role !== 'user') {
    sanitizedHistory.shift();
  }

  try {

    const model = genAI.getGenerativeModel({
      model: MODEL_NAME,
      systemInstruction: systemContext,
      // Note: Search tools are disabled on free-tier keys to prevent quota exhaustion (429)
      // tools: [{ googleSearchRetrieval: {} }],
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      ]
    });

    const chat = model.startChat({ history: sanitizedHistory });
    const result = await chat.sendMessageStream(userPrompt);

    let fullText = "";
    for await (const chunk of result.stream) {
      try {
        const chunkText = chunk.text();
        if (chunkText) {
          fullText += chunkText;
          onChunk(fullText);
        }
      } catch (chunkError: unknown) {
        console.warn("Gemini Stream Chunk Error (likely safety block):", chunkError);
        if (!fullText) {
          throw new Error("Response was blocked or empty due to safety guidelines.", { cause: chunkError });
        }
      }
    }
    
    if (!fullText) {
        throw new Error("Gemini returned an empty response.");
    }
    
    return fullText;
  } catch (error: unknown) {
    console.error("Gemini Chat Error:", error);
    
    const message = error instanceof Error ? error.message : String(error);
    let friendlyError = message || "An unexpected error occurred while connecting to Gemini.";
    
    if (message.includes("API key")) {
        friendlyError = "Invalid API Key. Please verify your credentials.";
    } else if (message.includes("quota") || message.includes("429")) {
        friendlyError = "AI Quota Exceeded. Please wait a moment before trying again or upgrade your plan.";
    }

    // Fallback to non-streaming if stream fails or for specific errors
    try {
        const model = genAI.getGenerativeModel({ model: MODEL_NAME, systemInstruction: systemContext });
        const chat = model.startChat({ history: sanitizedHistory });
        const result = await chat.sendMessage(userPrompt);
        const text = result.response.text();
        onChunk(text);
        return text;
    } catch (fallbackError: unknown) {
        const finalError = `Gemini Intelligence Error: ${friendlyError}`;
        onChunk(finalError);
        throw new Error(finalError, { cause: fallbackError });
    }
  }
};

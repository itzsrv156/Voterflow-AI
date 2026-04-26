import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.VITE_GEMINI_API_KEY || "";

async function listModels() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!data.models) {
        console.log("Response Error:", data);
        return;
    }
    const genModels = data.models.filter((m: any) => m.supportedGenerationMethods.includes("generateContent"));
    console.log("Models with generateContent:", genModels.map((m: any) => m.name));
    
    // Also log the description of a few standard ones to see if they mention billing
    const standard = genModels.filter((m: any) => m.name.includes("1.5") || m.name.includes("2.0") || m.name.includes("flash"));
    console.log("Standard Models Info:", JSON.stringify(standard.slice(0, 5), null, 2));
  } catch (error) {
    console.error("Fetch Error:", error);
  }
}

listModels();

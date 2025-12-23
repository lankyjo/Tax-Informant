
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { Role, TaxResponse } from "../types";

export const getGeminiResponse = async (
  history: { role: Role; text: string }[],
  userInput: string
): Promise<TaxResponse> => {
  // Always create a new instance to ensure we use the most up-to-date API key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        ...history.map(h => ({ role: h.role === 'user' ? 'user' : 'model' as any, parts: [{ text: h.text }] })),
        { role: 'user', parts: [{ text: userInput }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
        temperature: 0.7,
      },
    });

    const text = response.text || "I'm sorry, I couldn't process that. Please try asking about the 2026 tax laws again.";
    
    // Extract grounding sources if any
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const sources = groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title || "Source",
      uri: chunk.web?.uri || ""
    })).filter((s: any) => s.uri !== "") || [];

    return { text, sources };
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // Check for quota exceeded specifically
    if (error?.message?.includes("429") || error?.message?.toLowerCase().includes("quota")) {
      throw new Error("QUOTA_EXCEEDED");
    }
    
    throw new Error("Failed to connect to the Naija Tax Helper service.");
  }
};

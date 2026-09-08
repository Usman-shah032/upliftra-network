import { GoogleGenAI } from "@google/genai";
import { config } from "../config/env.js";

let aiClient: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && config.geminiApiKey) {
    aiClient = new GoogleGenAI({
      apiKey: config.geminiApiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

export async function resilientGenerateContent(
  ai: GoogleGenAI,
  params: {
    primaryModel?: string;
    fallbackModel?: string;
    contents: any;
    config?: any;
  }
) {
  const primaryModel = params.primaryModel || "gemini-3.7-flash";
  const fallbackModel = params.fallbackModel || "gemini-3.1-flash-lite";

  try {
    return await ai.models.generateContent({
      model: primaryModel,
      contents: params.contents,
      config: params.config,
    });
  } catch (err: any) {
    const errorMsg = String(err?.message || err);
    const isHighDemandOrTransient =
      errorMsg.includes("503") ||
      errorMsg.includes("high demand") ||
      errorMsg.includes("UNAVAILABLE") ||
      errorMsg.includes("429") ||
      errorMsg.includes("RESOURCE_EXHAUSTED");

    if (isHighDemandOrTransient && primaryModel !== fallbackModel) {
      console.warn(
        `[Gemini API] Primary model ${primaryModel} high demand/unavailable. Retrying with fallback ${fallbackModel}...`
      );
      await new Promise((r) => setTimeout(r, 400));
      return await ai.models.generateContent({
        model: fallbackModel,
        contents: params.contents,
        config: params.config,
      });
    }
    throw err;
  }
}

import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || "3000", 10),
  backendPort: parseInt(process.env.BACKEND_PORT || "5000", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  geminiApiKey: process.env.GEMINI_API_KEY || "",
  corsOrigin: process.env.CORS_ORIGIN || "*",
};

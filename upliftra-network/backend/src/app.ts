import express, { Express } from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import apiRouter from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { requestLogger } from "./middleware/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createBackendApp(): Express {
  const app = express();

  // Core middlewares
  app.use(express.json({ limit: "25mb" }));
  app.use(express.urlencoded({ extended: true, limit: "25mb" }));
  app.use(requestLogger);

  // Static uploads directory (avatars, CVs, attachments)
  const uploadsDir = path.resolve(__dirname, "../../uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  app.use("/uploads", express.static(uploadsDir));

  // Mount API router at /api
  app.use("/api", apiRouter);

  // In production, serve compiled frontend if available
  const possibleDistPaths = [
    path.resolve(__dirname, "../../../frontend/dist"),
    path.resolve(__dirname, "../../frontend/dist"),
    path.resolve(process.cwd(), "frontend/dist"),
    path.resolve(process.cwd(), "../frontend/dist")
  ];
  const staticDir = possibleDistPaths.find((p) => fs.existsSync(p));

  if (staticDir) {
    app.use(express.static(staticDir));
    app.get("*", (req, res, next) => {
      if (req.path.startsWith("/api") || req.path.startsWith("/uploads")) {
        return next();
      }
      res.sendFile(path.join(staticDir, "index.html"));
    });
  }

  // Error handler middleware
  app.use(errorHandler);

  return app;
}

export default createBackendApp;


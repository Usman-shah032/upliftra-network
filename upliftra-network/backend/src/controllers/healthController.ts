import { Request, Response } from "express";

export function getHealthStatus(_req: Request, res: Response) {
  res.json({
    status: "ok",
    app: "Upliftra Network",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
}

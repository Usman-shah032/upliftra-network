import { Request, Response, NextFunction } from "express";
import { generateAdvisorReply } from "../services/aiAdvisorService.js";

export async function askCareerAdvisor(req: Request, res: Response, next: NextFunction) {
  try {
    const { message = "", userProfile, history } = req.body;
    const result = await generateAdvisorReply({ message, userProfile, history });
    return res.json(result);
  } catch (error) {
    next(error);
  }
}

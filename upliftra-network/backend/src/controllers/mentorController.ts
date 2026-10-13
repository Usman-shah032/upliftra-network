import { Request, Response, NextFunction } from "express";
import { generateAIMentorMatches } from "../services/mentorMatchService.js";

export async function matchMentors(req: Request, res: Response, next: NextFunction) {
  try {
    const { userProfile, mentors = [] } = req.body;
    const result = await generateAIMentorMatches(userProfile, mentors);
    return res.json({
      success: true,
      source: result.source,
      recommendations: result.recommendations,
    });
  } catch (error) {
    next(error);
  }
}

import { Router } from "express";
import { askCareerAdvisor } from "../controllers/aiController.js";
import { matchMentors } from "../controllers/mentorController.js";

const router = Router();

router.post("/gemini/career-advisor", askCareerAdvisor);
router.post("/gemini/mentor-match", matchMentors);

export default router;

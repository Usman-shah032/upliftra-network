import { MentorPayload, MentorRecommendation, UserProfilePayload } from "../types/index.js";
import { getGeminiClient, resilientGenerateContent } from "./geminiService.js";

export function computeAdaptiveMentorMatches(
  userProfile: UserProfilePayload | undefined,
  mentors: MentorPayload[]
): MentorRecommendation[] {
  const menteeSkills = (userProfile?.skills || []).map((s: string) => s.toLowerCase());
  const menteeDegree = (userProfile?.education?.[0]?.degree || userProfile?.degree || "").toLowerCase();

  return (mentors || []).map((m: MentorPayload, idx: number) => {
    const mentorSkills = (m.skills || []).map((s: string) => s.toLowerCase());
    const mentorTopics = m.mentoringTopics || [];

    const sharedSkills = menteeSkills.filter((s: string) =>
      mentorSkills.some((ms: string) => ms.includes(s) || s.includes(ms))
    );

    let baseScore = 95 - idx * 3;
    if (sharedSkills.length > 0) baseScore += Math.min(sharedSkills.length * 2, 4);
    if (menteeDegree && m.bio && m.bio.toLowerCase().includes("computer")) baseScore += 1;
    const finalScore = Math.min(Math.max(baseScore, 78), 98);

    const matchReasons: string[] = [];
    if (sharedSkills.length > 0) {
      const topSkills = sharedSkills.slice(0, 2).map((s: string) => s.toUpperCase()).join(" and ");
      matchReasons.push(`Strong direct skill synergy in ${topSkills} applied at ${m.company}.`);
    } else {
      matchReasons.push(`Expert career track in ${m.expertise?.[0] || "Software Engineering"} matching your growth trajectory.`);
    }

    matchReasons.push(
      `Proven track record mentoring Pakistani university graduates targeting ${m.industry || "global tech companies"}.`
    );

    if (mentorTopics.some((t: string) => t.toLowerCase().includes("scholarship") || t.toLowerCase().includes("fulbright"))) {
      matchReasons.push(`Specialized guidance for international scholarships & global higher education opportunities.`);
    } else {
      matchReasons.push(`Practical roadmap for technical interviews, system design & portfolio reviews.`);
    }

    return {
      mentorId: m.id,
      matchScore: finalScore,
      matchReasons: matchReasons.slice(0, 3),
      suggestedTopics:
        mentorTopics.slice(0, 3).length > 0
          ? mentorTopics.slice(0, 3)
          : ["Career Strategy & Growth", "Resume & Portfolio Teardown", "Technical Interview Prep"],
      actionPlan: `Book an initial 30-min strategy call to establish goals and map out milestone checkpoints in ${
        m.expertise?.[0] || "core domain"
      }.`,
    };
  });
}

export async function generateAIMentorMatches(
  userProfile: UserProfilePayload | undefined,
  mentors: MentorPayload[]
): Promise<{ source: string; recommendations: MentorRecommendation[] }> {
  const ai = getGeminiClient();

  if (!ai) {
    return {
      source: "adaptive-engine",
      recommendations: computeAdaptiveMentorMatches(userProfile, mentors),
    };
  }

  const prompt = `You are the AI Mentor Matchmaking Engine of "Upliftra Network" (Pakistan's premier career & professional ecosystem).
Analyze this mentee profile and rank the candidate mentors:

MENTEE PROFILE:
Name: ${userProfile?.name || "Student / Professional"}
Role: ${userProfile?.role || "Student"}
Headline: ${userProfile?.headline || "N/A"}
Education: ${userProfile?.education?.[0]?.degree || userProfile?.degree || "CS/Engineering"} (${userProfile?.universityName || "Pakistan University"})
Key Skills: ${(userProfile?.skills || []).join(", ")}
Interests & Goals: ${(userProfile?.interests || []).join(", ")}
Target Mentorship: ${userProfile?.preferredMenteeType || "Career growth and scholarship/job mentoring"}

AVAILABLE MENTORS:
${JSON.stringify(
  (mentors || []).map((m) => ({
    id: m.id,
    name: m.name,
    title: m.title,
    company: m.company,
    expertise: m.expertise,
    skills: m.skills,
    mentoringTopics: m.mentoringTopics,
    industry: m.industry,
    bio: m.bio,
  })),
  null,
  2
)}

Provide a structured JSON output with an array of mentor recommendations.
For each mentor, calculate:
1. "mentorId": matching ID string
2. "matchScore": integer between 75 and 99
3. "matchReasons": array of 2-3 concise, specific bullet sentences explaining WHY this mentor is optimal for this student/professional in the Pakistani or global tech context.
4. "suggestedTopics": array of 2-3 specific topics they should discuss
5. "actionPlan": 1 brief sentence recommendation for the first meeting.

Return pure JSON conforming to this schema without markdown code blocks.`;

  try {
    const response = await resilientGenerateContent(ai, {
      primaryModel: "gemini-3.7-flash",
      fallbackModel: "gemini-3.1-flash-lite",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const responseText = response.text || "[]";
    let parsed: any;
    try {
      parsed = JSON.parse(responseText);
    } catch {
      parsed = null;
    }

    const recs = Array.isArray(parsed) ? parsed : parsed?.recommendations || parsed;

    if (Array.isArray(recs) && recs.length > 0) {
      return {
        source: "gemini-ai",
        recommendations: recs,
      };
    }

    return {
      source: "adaptive-engine",
      recommendations: computeAdaptiveMentorMatches(userProfile, mentors),
    };
  } catch (err: any) {
    console.warn("AI Matchmaker fallback triggered:", err?.message || err);
    return {
      source: "adaptive-engine",
      recommendations: computeAdaptiveMentorMatches(userProfile, mentors),
    };
  }
}

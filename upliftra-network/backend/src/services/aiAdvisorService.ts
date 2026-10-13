import { CareerAdvisorRequest, CareerAdvisorResponse } from "../types/index.js";
import { getGeminiClient, resilientGenerateContent } from "./geminiService.js";

// Deterministic authoritative answers for direct Upliftra queries
export function getLocalUpliftraAnswer(query: string, isAuthenticated: boolean): string | null {
  const q = query.toLowerCase().trim();

  if (q.includes("who founded") || q.includes("founder of upliftra") || q.includes("who is the founder")) {
    return "Upliftra Network was founded by Usman Ali Shah, who leads the platform's vision, strategy, technology direction and overall development.";
  }
  if (q.includes("who is usman ali shah") || q.includes("about usman ali shah") || q.includes("usman ali shah")) {
    return "Usman Ali Shah is the Founder of Upliftra Network and leads its vision, strategy, technology direction and overall development.";
  }
  if (q.includes("what is upliftra") || q.includes("about upliftra")) {
    return "Upliftra Network is a Pakistan-focused career and professional ecosystem designed to connect students, graduates, professionals, mentors, companies, startups, universities and organizations through opportunities, mentorship, learning, networking and career development.";
  }
  if (q.includes("learning hub") || q.includes("courses") || q.includes("what courses") || q.includes("curricula")) {
    return "The Upliftra Learning Hub offers 100% free, vetted masterclasses with verifiable certificates:\n\n1. **Full-Stack Cloud Engineering (Pakistan to Global Remote)**: TypeScript, Node.js, Next.js, Docker, AWS ECS.\n2. **Mastering Fulbright & International Scholarships**: Step-by-step SOP drafting, research proposal formulation & mock interviews.\n3. **Applied Generative AI with Gemini & RAG**: Gemini SDK, vector databases, LangGraph agents, and production deployments.\n4. **Data Science & Quantitative Analytics**: Python, Pandas, Scikit-learn, SQL, and financial forecasting.\n5. **Silicon Valley Technical Interview Prep**: Data structures, algorithms, dynamic programming, and system design.\n\nYou can access full interactive syllabi, track progress per lesson, and earn Upliftra Certificates directly in the Learning Hub.";
  }
  if (q.includes("startup") || q.includes("startups") || q.includes("kisanconnect") || q.includes("sehatpulse") || q.includes("taleembridge")) {
    return "The Upliftra Startup Ecosystem showcases high-impact Pakistani ventures incubated at NIC Islamabad, LUMS LCE, and Nest I/O:\n\n- **KisanConnect AI** (AgriTech & Supply Chain): AI-driven crop yield prediction & Urdu mandi pricing.\n- **SehatPulse Health** (HealthTech & AI): Telemedicine triage & localized electronic medical records for rural clinics.\n- **TaleemBridge AI** (EdTech & Generative AI): Personalized adaptive tutoring in Urdu & regional languages.\n- **PakKhata FinTech** (FinTech & Embedded Banking): Digital ledger and micro-credit scoring for 2M+ SMEs in Pakistan.\n- **Dastak Logistics** (B2B Logistics & Supply Chain): Smart fleet optimization and last-mile delivery tracking.\n- **ShamsiClean Energy** (CleanTech & Renewable Solar): IoT solar monitoring and microgrid financing for industrial units.\n\nYou can explore startup teardowns, message founders directly, or apply to open roles with equity options.";
  }
  if (q.includes("who can join") || q.includes("who is upliftra for")) {
    return "Students, graduates, professionals, mentors, recruiters, companies, startups, universities, organizations, trainers, volunteers, campus ambassadors and other members of the professional ecosystem can join Upliftra.";
  }
  if (q.includes("how can i join") || q.includes("how to join") || q.includes("register")) {
    return "You can join Upliftra Network by clicking 'Join Upliftra' or 'Create New Account'. You can select your stakeholder role (Student, Professional, Mentor, Recruiter, Company, Startup, University, Organization, Volunteer, Campus Ambassador, Partner, Moderator, Trainer, Admin), build your profile, and immediately access verified opportunities, AI mentor matches, and community discussions.";
  }
  if (q.includes("how can upliftra help my career") || q.includes("how does upliftra help")) {
    return "Upliftra Network helps your career by offering:\n\n1. **Verified Opportunities**: Access vetted jobs, internships, global scholarships (Fulbright, Chevening, Erasmus), and fellowships in Pakistan and worldwide.\n2. **1-on-1 Mentorship**: Connect with verified mentors for resume teardowns, interview prep, and career strategy.\n3. **Learning Hub**: Free tailored skill tracks bridging academia with international tech standards.\n4. **15 Stakeholder Portals**: Tailored workspaces for students, professionals, founders, and recruiters.\n5. **Community Discussions**: Network with peers, ask career questions, and collaborate on projects.";
  }
  if (q.includes("what opportunities") || q.includes("available opportunities")) {
    return "Upliftra Network features verified opportunities across multiple categories:\n\n- **Software & Tech Jobs**: Full-time and remote developer roles.\n- **Internships**: Summer, semester, and graduate trainee programs.\n- **International Scholarships**: Fulbright, Chevening, Erasmus Mundus, Commonwealth, and DAAD.\n- **Fellowships & Grants**: National technology and leadership fellowships.\n- **Events & Hackathons**: Premier tech hackathons, masterclasses, and networking sessions.";
  }
  if (q.includes("how does mentorship work") || q.includes("mentorship process")) {
    return "Mentorship on Upliftra Network works in 3 easy steps:\n\n1. **Explore or AI Match**: Browse verified mentors or let our AI engine match you based on your career goals and skill profile.\n2. **Send Request**: Submit a session request highlighting your specific goals and questions.\n3. **Connect 1-on-1**: Once approved, join direct 1-on-1 video mentorship sessions for SOP reviews, portfolio teardowns, and actionable roadmaps.";
  }
  if (q.includes("team") || q.includes("core team")) {
    return "The core team of Upliftra Network includes:\n\n- **Usman Ali Shah** — Founder & Strategy Lead\n- **Anus Khalil** — Tech and Partnership Lead\n- **Bisma** — Operations & Research Lead\n- **Yusra Firdous** — Community Engagement & Growth Lead\n- **Misbah Ferdous** — Social Media Lead";
  }
  if (!isAuthenticated && (q.includes("what do you know about me") || q.includes("who am i") || q.includes("my name") || q.includes("my profile"))) {
    return "You are currently browsing as a guest visitor. No personal profile or account information is attached to this session. You can sign in or create an account to unlock personalized career roadmaps, or ask me any general questions about jobs, scholarships, mentorship, or Upliftra Network!";
  }

  return null;
}

export const AUTHORITATIVE_KNOWLEDGE = `
You are the official AI Career & Opportunity Advisor of "Upliftra Network" — a Pakistan-focused career and professional ecosystem.

AUTHORITATIVE UPLIFTRA NETWORK KNOWLEDGE:
- What is Upliftra Network: Upliftra Network is a Pakistan-focused career and professional ecosystem designed to connect students, fresh graduates, professionals, mentors, recruiters, companies, startups, founders, co-founders, universities, organizations, trainers, volunteers, campus ambassadors, and partners through opportunities, mentorship, learning, networking and career development.
- Platform Focus: Career development, mentorship, learning, skill development, jobs, internships, scholarships, events, networking, startup support, professional growth, verified opportunities, community development.
- Long-Term Vision: AI-powered career guidance, AI mentor recommendations, learning programs, mentorship, professional networking, job portal, internship portal, scholarship opportunities, events, startup ecosystem, innovation, university partnerships, organization partnerships, company partnerships, industry connections.
- 15 Dedicated Role Portals: Student, Professional, Mentor, Recruiter, Company, Startup, University, Organization, Volunteer, Campus Ambassador, Partner, Moderator, Trainer, Admin, Super Admin.

FOUNDER INFORMATION (CRITICAL & STRICT):
- Founder: Usman Ali Shah
- Official description: "Usman Ali Shah is the Founder of Upliftra Network and leads its vision, strategy, technology direction and overall development."
- If asked "Who founded Upliftra Network?", state: "Upliftra Network was founded by Usman Ali Shah, who leads the platform's vision, strategy, technology direction and overall development."
- If asked "Who is Usman Ali Shah?", explain that he is the Founder of Upliftra Network and is responsible for the platform's vision, strategy, technology direction and development.
- STRICT NEGATIVE CONSTRAINT: DO NOT invent any additional biography, achievements, previous companies, degrees, personal history, or awards about Usman Ali Shah. Only use the information explicitly provided above.

CORE TEAM INFORMATION:
- Usman Ali Shah — Founder & Strategy Lead
- Anus Khalil — Tech and Partnership Lead
- Bisma — Operations & Research Lead
- Yusra Firdous — Community Engagement & Growth Lead
- Misbah Ferdous — Social Media Lead
(Use these team details only when relevant).

AUTHENTICATION AND PRIVACY RULES:
1. If the user is a GUEST (logged out / unauthenticated):
   - NEVER assume, hallucinate, or refer to any specific person's name or previous account.
   - If the user asks "What do you know about me?" or "Who am I?", state clearly that they are browsing as a guest/visitor and no personal profile information is available.
   - Address the user cordially and neutrally as a student/visitor.
2. If the user is AUTHENTICATED:
   - Use their provided profile info (name, role, university/company, skills) accurately.
   - Do NOT mix up user accounts.

BEHAVIOR RULES:
1. Always be helpful, objective, professional, and encouraging.
2. Provide pragmatic career advice tailored to Pakistan's tech ecosystem, higher education, remote global work ($ USD contracts), and international scholarships (Fulbright, Chevening, Erasmus Mundus, DAAD, Commonwealth).
3. If you do not know something or if a user asks about facts outside the platform's verified knowledge, clearly say: "I don't have enough information about that yet." Never hallucinate or fabricate facts, statistics, partnerships, or achievements.
`;

export async function generateAdvisorReply(
  request: CareerAdvisorRequest
): Promise<CareerAdvisorResponse> {
  const { message = "", userProfile } = request;
  const isAuthenticated = Boolean(userProfile && userProfile.name && userProfile.name.trim() !== "");

  const directAnswer = getLocalUpliftraAnswer(message, isAuthenticated);

  const ai = getGeminiClient();

  if (!ai) {
    if (directAnswer) {
      return { reply: directAnswer, source: "upliftra-knowledge-base" };
    }
    if (!isAuthenticated) {
      return {
        reply: `Welcome to Upliftra Network! I'm your AI Career & Opportunity Advisor.\n\nHere is how I can assist you:\n\n1. **Discover Verified Opportunities**: Explore active jobs, graduate internships, and global scholarships (Fulbright, Chevening, Erasmus).\n2. **1-on-1 Mentorship**: Connect with verified mentors across Pakistan and global tech companies.\n3. **Skill Tracks & Portals**: Explore tailored career pathways across 15 stakeholder portals.\n\nFeel free to ask me anything about careers, scholarships, or the Upliftra ecosystem!`,
        source: "adaptive-engine",
      };
    }
    return {
      reply: `Welcome to Upliftra Network! Based on your profile as ${userProfile?.name} (${
        userProfile?.headline || "Tech Professional / Student"
      }), here is structured guidance:\n\n1. **Build Your Profile**: Complete your skills, portfolio, and target role on Upliftra.\n2. **Discover Verified Opportunities**: Explore active jobs, graduate internships, and global scholarships (Fulbright, Chevening, Erasmus).\n3. **Connect with Mentors**: Request 1-on-1 sessions with verified mentors on Upliftra for personalized career roadmaps.\n\nAsk me any question about Upliftra Network, career paths, mentorship, or scholarships!`,
      source: "adaptive-engine",
    };
  }

  const userContext = isAuthenticated
    ? `
USER CONTEXT (LOGGED-IN USER):
Name: ${userProfile?.name}
Role: ${userProfile?.role || "Student / Professional"}
Headline: ${userProfile?.headline || "Upliftra Member"}
Skills: ${(userProfile?.skills || []).join(", ")}
Location: ${userProfile?.location || "Pakistan"}
University / Organization: ${userProfile?.universityName || userProfile?.companyName || "Pakistan"}
`
    : `
USER CONTEXT (GUEST VISITOR / LOGGED-OUT):
Status: Unauthenticated Guest Visitor
Name: None (Do not greet with any name or assume any identity)
Profile: No personal profile data is available.
`;

  try {
    const response = await resilientGenerateContent(ai, {
      primaryModel: "gemini-3.7-flash",
      fallbackModel: "gemini-3.1-flash-lite",
      contents: `${AUTHORITATIVE_KNOWLEDGE}\n\n${userContext}\n\nUser Question: ${message}`,
    });

    return {
      reply: response.text || directAnswer || "I am ready to help guide your career roadmap on Upliftra Network.",
      source: "gemini-ai",
    };
  } catch (err: any) {
    console.warn("AI Career Advisor API error, using fallback:", err?.message || err);
    return {
      reply:
        directAnswer ||
        "I'm your Upliftra AI Career Advisor. Upliftra Network helps you explore verified jobs, global scholarships, and 1-on-1 mentorship across Pakistan and global tech ecosystems. Feel free to ask about roadmaps, resume tips, or scholarship requirements!",
      source: "fallback",
    };
  }
}

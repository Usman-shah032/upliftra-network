export interface UserProfilePayload {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  headline?: string;
  universityName?: string;
  companyName?: string;
  skills?: string[];
  interests?: string[];
  education?: Array<{ degree?: string; institution?: string; year?: string }>;
  location?: string;
  preferredMenteeType?: string;
  degree?: string;
}

export interface MentorPayload {
  id: string;
  name: string;
  title: string;
  company: string;
  expertise?: string[];
  skills?: string[];
  mentoringTopics?: string[];
  industry?: string;
  bio?: string;
}

export interface MentorRecommendation {
  mentorId: string;
  matchScore: number;
  matchReasons: string[];
  suggestedTopics: string[];
  actionPlan: string;
}

export interface CareerAdvisorRequest {
  message: string;
  userProfile?: UserProfilePayload;
  history?: Array<{ role: 'user' | 'model'; content: string }>;
}

export interface CareerAdvisorResponse {
  reply: string;
  source?: string;
}

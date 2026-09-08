/**
 * Upliftra Network - Centralized Frontend API Service
 * Manages all HTTP requests between the React client and Express backend.
 */

const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || '/api';

export interface CareerAdvisorParams {
  message: string;
  userProfile?: any;
  history?: Array<{ role: 'user' | 'model'; content: string }>;
}

export interface CareerAdvisorResult {
  reply: string;
  source?: string;
}

export interface MentorMatchParams {
  userProfile: any;
  mentors: any[];
}

export interface MentorMatchResult {
  success: boolean;
  source?: string;
  recommendations: any[];
}

export interface HealthCheckResult {
  status: string;
  app: string;
  version: string;
  timestamp?: string;
}

export async function askAICareerAdvisor(params: CareerAdvisorParams): Promise<CareerAdvisorResult> {
  const response = await fetch(`${API_BASE_URL}/gemini/career-advisor`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function getAIMentorMatches(params: MentorMatchParams): Promise<MentorMatchResult> {
  const response = await fetch(`${API_BASE_URL}/gemini/mentor-match`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function checkBackendHealth(): Promise<HealthCheckResult> {
  const response = await fetch(`${API_BASE_URL}/health`);
  if (!response.ok) {
    throw new Error(`Health check failed with status: ${response.status}`);
  }
  return response.json();
}

export default {
  askAICareerAdvisor,
  getAIMentorMatches,
  checkBackendHealth,
};

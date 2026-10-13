export type UserRole =
  | 'student'
  | 'professional'
  | 'mentor'
  | 'recruiter'
  | 'company'
  | 'startup'
  | 'university'
  | 'organization'
  | 'volunteer'
  | 'campus_ambassador'
  | 'partner'
  | 'moderator'
  | 'trainer'
  | 'admin'
  | 'super_admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  headline: string;
  location: string;
  isVerified: boolean;
  profileCompletion: number;
  joinedDate: string;
  bio?: string;
  degree?: string;
  university?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  website?: string;
  skills?: string[];
  interests?: string[];
  education?: EducationItem[];
  experience?: ExperienceItem[];
  certifications?: string[];
  projects?: ProjectItem[];
  // Role specific extras
  companyName?: string;
  universityName?: string;
  startupName?: string;
  organizationName?: string;
  expertise?: string[];
  mentoringTopics?: string[];
  hourlyRate?: number;
  availableHoursPerWeek?: number;
  preferredMenteeType?: string;
  languages?: string[];
  sessionPreferences?: string[];
  startupStage?: string;
  coFounders?: string[];
  hiringAreas?: string[];
  openPositionsCount?: number;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: string;
  endYear: string;
  grade?: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  link?: string;
  technologies: string[];
}

export type OpportunityCategory =
  | 'job'
  | 'internship'
  | 'scholarship'
  | 'fellowship'
  | 'training'
  | 'competition'
  | 'volunteering'
  | 'other';

export type OpportunityStatus = 'pending' | 'verified' | 'rejected' | 'expired';

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  organizationLogo?: string;
  category: OpportunityCategory;
  type?: string;
  description: string;
  eligibility?: string;
  location: string;
  city?: string;
  isRemote?: boolean;
  deadline?: string;
  salaryOrStipend?: string;
  requiredSkills?: string[];
  requirements?: string[];
  responsibilities?: string[];
  applicationMethod?: 'internal' | 'external_link' | 'email';
  applyUrl: string;
  officialSource?: string;
  verificationStatus: OpportunityStatus;
  postedDate: string;
  postedBy?: string;
  postedByRole?: string;
  postedByUserId?: string;
  views: number;
  applicantCount: number;
  isFeatured?: boolean;
}

export interface Mentor {
  id: string;
  name: string;
  email: string;
  title: string;
  company: string;
  avatar: string;
  expertise: string[];
  skills: string[];
  industry: string;
  experienceYears: number;
  education: string;
  mentoringTopics: string[];
  availability: 'Open for Mentees' | 'Limited Slots' | 'Busy';
  preferredMenteeType: string;
  languages: string[];
  sessionPreferences: string[];
  bio: string;
  rating: number;
  reviewCount: number;
  totalMenteesHelped: number;
  isVerified: boolean;
  location: string;
  matchScore?: number;
  matchReasons?: string[];
}

export interface MentorshipRequest {
  id: string;
  menteeId: string;
  menteeName: string;
  menteeAvatar: string;
  menteeRole: string;
  mentorId: string;
  mentorName: string;
  mentorAvatar: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';
  message: string;
  goals: string;
  requestedDate: string;
  scheduledTime?: string;
  meetingLink?: string;
  sessionNotes?: string;
  rating?: number;
  feedback?: string;
}

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  isCompleted?: boolean;
  type?: 'video' | 'reading' | 'quiz' | 'assignment';
}

export interface CourseModule {
  id?: string;
  title: string;
  duration?: string;
  lessonsCount?: number;
  lessons?: CourseLesson[];
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  instructorTitle?: string;
  instructorAvatar?: string;
  organization: string;
  thumbnail: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  modulesCount: number;
  modules?: (CourseModule | string)[];
  rating: number;
  enrolledCount: number;
  description: string;
  skillsEarned: string[];
  prerequisites?: string[];
  certificateAvailable?: boolean;
  isEnrolled?: boolean;
  progressPercentage?: number;
  completedLessonIds?: string[];
}

export interface EventItem {
  id: string;
  title: string;
  type: 'webinar' | 'workshop' | 'seminar' | 'conference' | 'career_session' | 'networking' | string;
  format?: 'Online' | 'In-Person' | 'Hybrid' | string;
  category?: string;
  date?: string;
  time?: string;
  location?: string;
  coverImage?: string;
  organizer: string;
  organizerLogo?: string;
  dateTime: string;
  duration: string;
  isOnline: boolean;
  locationOrPlatform: string;
  description: string;
  speakers: { name: string; title: string; avatar: string }[];
  registeredCount: number;
  capacity?: number;
  isRegistered?: boolean;
  tags: string[];
}

export interface CommunityPost {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  authorHeadline: string;
  title: string;
  content: string;
  tags: string[];
  upvotes: number;
  commentCount: number;
  createdAt: string;
  isUpvoted?: boolean;
  isSaved?: boolean;
  comments?: PostComment[];
}

export interface PostComment {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  content: string;
  createdAt: string;
  upvotes: number;
}

export type StartupStage = 'Idea' | 'MVP' | 'Early Traction' | 'Growth' | 'Funded' | 'Seed' | 'Early Stage' | 'Series A';

export interface StartupOpenRole {
  id: string;
  title: string;
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Co-Founder (Equity)' | 'Contract';
  location: string;
  compensation: string;
  description: string;
  skills: string[];
}

export interface StartupItem {
  id: string;
  name: string;
  logo: string;
  tagline: string;
  founderName?: string;
  founderAvatar?: string;
  founders?: string[] | { name: string; role: string; avatar?: string; linkedin?: string }[];
  coFounders?: string[];
  industry: string;
  stage: StartupStage;
  problem?: string;
  solution?: string;
  description?: string;
  isHiring?: boolean;
  openRolesCount?: number;
  openRoles?: StartupOpenRole[];
  teamSize?: number;
  fundingStatus?: string;
  requiredSkills?: string[];
  collaborationRequirements?: string;
  website: string;
  location: string;
  pitchDeckUrl?: string;
  foundedYear?: string;
  incubationPartner?: string;
}

export interface NotificationItem {
  id: string;
  type: 'mentorship' | 'opportunity' | 'event' | 'community' | 'system' | 'message';
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}

export interface DirectMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  receiverId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  attachmentName?: string;
}

export interface PlatformStats {
  totalUsers: number;
  activeStudents: number;
  verifiedMentors: number;
  verifiedOpportunities: number;
  totalStartups: number;
  partnerUniversities: number;
  mentorshipSessionsCompleted: number;
  activeApplications: number;
}

export interface AuditLogItem {
  id: string;
  adminName: string;
  action: string;
  target: string;
  timestamp: string;
  ipAddress: string;
  status: 'SUCCESS' | 'WARNING' | 'FAILED';
}

export interface ReportedItem {
  id: string;
  type: 'post' | 'opportunity' | 'user' | 'comment';
  targetId: string;
  targetTitle: string;
  reportedBy: string;
  reason: string;
  timestamp: string;
  status: 'pending' | 'resolved' | 'dismissed';
}

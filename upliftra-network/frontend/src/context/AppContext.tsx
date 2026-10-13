import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  Opportunity,
  Mentor,
  MentorshipRequest,
  Course,
  EventItem,
  CommunityPost,
  StartupItem,
  NotificationItem,
  DirectMessage,
  PlatformStats
} from '../types';
import {
  PRESET_USERS,
  INITIAL_OPPORTUNITIES,
  INITIAL_MENTORS,
  INITIAL_MENTOR_REQUESTS,
  INITIAL_COURSES,
  INITIAL_EVENTS,
  INITIAL_COMMUNITY_POSTS,
  INITIAL_STARTUPS,
  INITIAL_NOTIFICATIONS,
  INITIAL_MESSAGES,
  INITIAL_STATS
} from '../data/mockData';
import { getAIMentorMatches } from '../services/api';

interface AppContextType {
  currentUser: User | null;
  user: User | null;
  profile: User | null;
  allUsers: Record<string, User>;
  switchUserRole: (role: UserRole) => void;
  updateCurrentUser: (updated: Partial<User>) => void;
  isAuthenticated: boolean;
  loading: boolean;
  isLoading: boolean;
  login: (email: string, role?: UserRole, customName?: string) => void;
  signIn: (email: string, role?: UserRole, customName?: string) => void;
  logout: () => void;
  signOut: () => void;
  register: (userData: Partial<User>) => void;

  opportunities: Opportunity[];
  savedOpportunityIds: string[];
  toggleSaveOpportunity: (id: string) => void;
  addOpportunity: (opp: Omit<Opportunity, 'id' | 'views' | 'applicantCount' | 'postedDate' | 'verificationStatus'>) => void;
  verifyOpportunity: (id: string, status: 'verified' | 'rejected') => void;

  mentors: Mentor[];
  mentorRequests: MentorshipRequest[];
  sendMentorshipRequest: (mentorId: string, message: string, goals: string) => void;
  updateMentorshipRequestStatus: (requestId: string, status: 'accepted' | 'rejected' | 'completed' | 'cancelled', scheduledTime?: string, meetingLink?: string) => void;

  courses: Course[];
  toggleEnrollCourse: (courseId: string) => void;
  toggleLessonComplete: (courseId: string, lessonId: string) => void;
  applyToStartupRole: (startupId: string, roleId: string, roleTitle: string, note?: string) => void;

  events: EventItem[];
  toggleRegisterEvent: (eventId: string) => void;

  posts: CommunityPost[];
  createPost: (title: string, content: string, tags: string[]) => void;
  toggleUpvotePost: (postId: string) => void;
  addCommentToPost: (postId: string, commentText: string) => void;

  startups: StartupItem[];
  addStartup: (startup: Omit<StartupItem, 'id' | 'foundedYear'>) => void;

  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;

  messages: DirectMessage[];
  sendMessage: (receiverId: string, content: string) => void;

  stats: PlatformStats;
  aiRecommendations: any[];
  isGeneratingAI: boolean;
  fetchAIMentorRecommendations: () => Promise<void>;
  
  // Navigation & Active View
  activeView: string;
  setActiveView: (view: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'upliftra_auth_session';
const USER_REGISTRY_KEY = 'upliftra_user_registry';

function deriveNameFromEmail(email: string): string {
  if (!email || !email.includes('@')) return 'Ecosystem Member';
  const prefix = email.split('@')[0];
  const parts = prefix.split(/[._-]/).filter(Boolean);
  if (parts.length === 0) return 'Ecosystem Member';
  return parts
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
    .join(' ');
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  // Initialize authenticated user from localStorage if available, otherwise default to logged out (guest)
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed && parsed.id ? parsed : null;
      }
    } catch (e) {
      console.error('Error loading stored auth session:', e);
    }
    return null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Boolean(parsed && parsed.id);
      }
    } catch (e) {
      console.error('Error checking stored auth status:', e);
    }
    return false;
  });

  const [opportunities, setOpportunities] = useState<Opportunity[]>(INITIAL_OPPORTUNITIES);
  const [savedOpportunityIds, setSavedOpportunityIds] = useState<string[]>(['opp_1', 'opp_2']);
  const [mentors, setMentors] = useState<Mentor[]>(INITIAL_MENTORS);
  const [mentorRequests, setMentorRequests] = useState<MentorshipRequest[]>(INITIAL_MENTOR_REQUESTS);
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [posts, setPosts] = useState<CommunityPost[]>(INITIAL_COMMUNITY_POSTS);
  const [startups, setStartups] = useState<StartupItem[]>(INITIAL_STARTUPS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [messages, setMessages] = useState<DirectMessage[]>(INITIAL_MESSAGES);
  const [stats, setStats] = useState<PlatformStats>(INITIAL_STATS);
  const [aiRecommendations, setAiRecommendations] = useState<any[]>([]);
  const [isGeneratingAI, setIsGeneratingAI] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Helper to get registered accounts
  const getRegisteredAccounts = (): Record<string, User> => {
    try {
      const saved = localStorage.getItem(USER_REGISTRY_KEY);
      if (saved) {
        return { ...PRESET_USERS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Error loading user registry:', e);
    }
    return PRESET_USERS;
  };

  const saveAccountToRegistry = (user: User) => {
    try {
      const existing = getRegisteredAccounts();
      existing[user.id] = user;
      existing[user.email.toLowerCase()] = user;
      localStorage.setItem(USER_REGISTRY_KEY, JSON.stringify(existing));
    } catch (e) {
      console.error('Failed to save user account to registry:', e);
    }
  };

  const switchUserRole = (role: UserRole) => {
    if (PRESET_USERS[role]) {
      const targetUser = PRESET_USERS[role];
      setCurrentUser(targetUser);
      setIsAuthenticated(true);
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(targetUser));
      } catch (e) {
        console.error('Failed to save session:', e);
      }
    }
  };

  const updateCurrentUser = (updated: Partial<User>) => {
    setCurrentUser((prev) => {
      if (!prev) return null;
      const updatedUser = { ...prev, ...updated };
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedUser));
        saveAccountToRegistry(updatedUser);
      } catch (e) {
        console.error('Failed to update session storage:', e);
      }
      return updatedUser;
    });
  };

  const login = (email: string, role: UserRole = 'student', customName?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const accounts = getRegisteredAccounts();

    // 1. Match by exact email if previously registered or preset
    let targetUser = Object.values(accounts).find(
      (u) => u.email.toLowerCase() === cleanEmail
    );

    // 2. If matched, update role if provided and changed
    if (targetUser) {
      if (role && targetUser.role !== role) {
        targetUser = { ...targetUser, role };
      }
    } else {
      // 3. Check preset users for this role
      const presetForRole = PRESET_USERS[role] || PRESET_USERS.student;
      const name = customName || deriveNameFromEmail(cleanEmail);

      targetUser = {
        ...presetForRole,
        id: `user_${Date.now()}`,
        name: name,
        email: cleanEmail,
        role: role,
        headline: `${role.charAt(0).toUpperCase() + role.slice(1)} @ Upliftra Network`,
        joinedDate: 'Just now'
      };
    }

    saveAccountToRegistry(targetUser);
    setCurrentUser(targetUser);
    setIsAuthenticated(true);

    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(targetUser));
    } catch (e) {
      console.error('Failed to store login session:', e);
    }
    setActiveView('dashboard');
  };

  const logout = () => {
    // 1. Clear application state
    setCurrentUser(null);
    setIsAuthenticated(false);

    // 2. Clear relevant localStorage/sessionStorage
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem('upliftra_ai_advisor_history');
      localStorage.removeItem('upliftra_current_user');
      sessionStorage.clear();
    } catch (e) {
      console.error('Failed to clear storage on logout:', e);
    }

    // 3. Clear AI recommendation caches
    setAiRecommendations([]);

    // 4. Return to home view
    setActiveView('home');
  };

  const register = (userData: Partial<User>) => {
    const cleanEmail = (userData.email || 'member@upliftra.pk').trim().toLowerCase();
    const role = userData.role || 'student';
    const name = userData.name || deriveNameFromEmail(cleanEmail);

    const newUser: User = {
      id: `user_${Date.now()}`,
      name,
      email: cleanEmail,
      role,
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      headline: userData.headline || `${role.charAt(0).toUpperCase() + role.slice(1)} on Upliftra Network`,
      location: userData.location || 'Islamabad, Pakistan',
      isVerified: false,
      profileCompletion: 65,
      joinedDate: 'Just now',
      skills: userData.skills || ['Career Growth', 'Networking', 'Professional Skills'],
      ...userData
    };

    saveAccountToRegistry(newUser);
    setCurrentUser(newUser);
    setIsAuthenticated(true);

    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    } catch (e) {
      console.error('Failed to save registration session:', e);
    }
    setActiveView('dashboard');
  };

  const toggleSaveOpportunity = (id: string) => {
    setSavedOpportunityIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const addOpportunity = (oppData: Omit<Opportunity, 'id' | 'views' | 'applicantCount' | 'postedDate' | 'verificationStatus'>) => {
    const isPlatformAdmin = currentUser?.role === 'admin' || currentUser?.role === 'super_admin';
    const newOpp: Opportunity = {
      ...oppData,
      id: `opp_${Date.now()}`,
      postedDate: new Date().toISOString().split('T')[0],
      views: 1,
      applicantCount: 0,
      verificationStatus: isPlatformAdmin ? 'verified' : 'pending'
    };
    setOpportunities((prev) => [newOpp, ...prev]);
    setStats((prev) => ({ ...prev, verifiedOpportunities: prev.verifiedOpportunities + 1 }));
  };

  const verifyOpportunity = (id: string, status: 'verified' | 'rejected') => {
    setOpportunities((prev) =>
      prev.map((o) => (o.id === id ? { ...o, verificationStatus: status } : o))
    );
  };

  const sendMentorshipRequest = (mentorId: string, message: string, goals: string) => {
    const targetMentor = mentors.find((m) => m.id === mentorId);
    const menteeUser = currentUser || PRESET_USERS.student;
    const newReq: MentorshipRequest = {
      id: `req_${Date.now()}`,
      menteeId: menteeUser.id,
      menteeName: menteeUser.name,
      menteeAvatar: menteeUser.avatar,
      menteeRole: menteeUser.headline || menteeUser.role,
      mentorId,
      mentorName: targetMentor?.name || 'Mentor',
      mentorAvatar: targetMentor?.avatar || '',
      status: 'pending',
      message,
      goals,
      requestedDate: new Date().toISOString().split('T')[0]
    };
    setMentorRequests((prev) => [newReq, ...prev]);

    // Send notification
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      type: 'mentorship',
      title: 'Mentorship Request Sent',
      description: `Your request was sent to ${targetMentor?.name}. You will be notified when they review it.`,
      timestamp: 'Just now',
      isRead: false,
      actionUrl: '/dashboard/mentorship'
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const updateMentorshipRequestStatus = (
    requestId: string,
    status: 'accepted' | 'rejected' | 'completed' | 'cancelled',
    scheduledTime?: string,
    meetingLink?: string
  ) => {
    setMentorRequests((prev) =>
      prev.map((r) =>
        r.id === requestId
          ? {
              ...r,
              status,
              ...(scheduledTime ? { scheduledTime } : {}),
              ...(meetingLink ? { meetingLink } : {})
            }
          : r
      )
    );
  };

  const toggleEnrollCourse = (courseId: string) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          const willEnroll = !c.isEnrolled;
          return {
            ...c,
            isEnrolled: willEnroll,
            progressPercentage: willEnroll ? (c.progressPercentage && c.progressPercentage > 0 ? c.progressPercentage : 10) : 0
          };
        }
        return c;
      })
    );
  };

  const toggleLessonComplete = (courseId: string, lessonId: string) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          const currentCompleted = c.completedLessonIds || [];
          const isCompleted = currentCompleted.includes(lessonId);
          const newCompleted = isCompleted
            ? currentCompleted.filter((id) => id !== lessonId)
            : [...currentCompleted, lessonId];

          // Calculate total lessons
          let totalLessons = 0;
          if (c.modules && Array.isArray(c.modules)) {
            c.modules.forEach((mod: any) => {
              if (typeof mod === 'object' && mod.lessons) {
                totalLessons += mod.lessons.length;
              }
            });
          }
          if (totalLessons === 0) totalLessons = c.modulesCount || 4;

          const progress = Math.min(100, Math.round((newCompleted.length / totalLessons) * 100));

          return {
            ...c,
            isEnrolled: true,
            completedLessonIds: newCompleted,
            progressPercentage: progress
          };
        }
        return c;
      })
    );
  };

  const applyToStartupRole = (startupId: string, roleId: string, roleTitle: string, note?: string) => {
    const targetStartup = startups.find((s) => s.id === startupId);
    const applicant = currentUser || PRESET_USERS.student;

    const newNotif: NotificationItem = {
      id: `notif_app_${Date.now()}`,
      type: 'opportunity',
      title: `Application Sent: ${roleTitle}`,
      description: `Your application has been received by ${targetStartup?.name || 'the startup team'}. They will reach out via email or direct message.`,
      timestamp: 'Just now',
      isRead: false
    };

    setNotifications((prev) => [newNotif, ...prev]);
  };

  const toggleRegisterEvent = (eventId: string) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? {
              ...e,
              isRegistered: !e.isRegistered,
              registeredCount: !e.isRegistered ? e.registeredCount + 1 : e.registeredCount - 1
            }
          : e
      )
    );
  };

  const createPost = (title: string, content: string, tags: string[]) => {
    const newPost: CommunityPost = {
      id: `post_${Date.now()}`,
      authorId: currentUser?.id || 'guest_user',
      authorName: currentUser?.name || 'Community Member',
      authorRole: currentUser?.headline || currentUser?.role || 'Contributor',
      authorAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      authorHeadline: currentUser?.headline || 'Upliftra Community Member',
      title,
      content,
      tags: tags.length > 0 ? tags : ['Career Advice', 'Pakistan'],
      upvotes: 1,
      commentCount: 0,
      createdAt: 'Just now',
      isUpvoted: true,
      comments: []
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  const toggleUpvotePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isUp = !!p.isUpvoted;
          return {
            ...p,
            isUpvoted: !isUp,
            upvotes: isUp ? p.upvotes - 1 : p.upvotes + 1
          };
        }
        return p;
      })
    );
  };

  const addCommentToPost = (postId: string, commentText: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const newComments = [
            ...(p.comments || []),
            {
              id: `comm_${Date.now()}`,
              authorName: currentUser?.name || 'Community Member',
              authorAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
              authorRole: currentUser?.headline || currentUser?.role || 'Member',
              content: commentText,
              createdAt: 'Just now',
              upvotes: 0
            }
          ];
          return {
            ...p,
            comments: newComments,
            commentCount: newComments.length
          };
        }
        return p;
      })
    );
  };

  const addStartup = (startupData: Omit<StartupItem, 'id' | 'foundedYear'>) => {
    const newStartup: StartupItem = {
      ...startupData,
      id: `startup_${Date.now()}`,
      foundedYear: new Date().getFullYear().toString()
    };
    setStartups((prev) => [newStartup, ...prev]);
    setStats((prev) => ({ ...prev, totalStartups: prev.totalStartups + 1 }));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const sendMessage = (receiverId: string, content: string) => {
    const sender = currentUser || PRESET_USERS.student;
    const newMsg: DirectMessage = {
      id: `msg_${Date.now()}`,
      senderId: sender.id,
      senderName: sender.name,
      senderAvatar: sender.avatar,
      receiverId,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  const fetchAIMentorRecommendations = async () => {
    setIsGeneratingAI(true);
    try {
      const data = await getAIMentorMatches({
        userProfile: currentUser || PRESET_USERS.student,
        mentors
      });
      if (data && data.recommendations && Array.isArray(data.recommendations)) {
        setAiRecommendations(data.recommendations);
        // Merge score into mentors list
        setMentors((prev) =>
          prev.map((m) => {
            const match = data.recommendations.find((r: any) => r.mentorId === m.id);
            if (match) {
              return {
                ...m,
                matchScore: match.matchScore,
                matchReasons: match.matchReasons
              };
            }
            return m;
          })
        );
      }
    } catch (e) {
      console.warn('AI mentor match fetch completed with local fallback:', e);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  useEffect(() => {
    if (currentUser?.id) {
      fetchAIMentorRecommendations();
    }
  }, [currentUser?.id]);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        user: currentUser,
        profile: currentUser,
        allUsers: getRegisteredAccounts(),
        switchUserRole,
        updateCurrentUser,
        isAuthenticated,
        loading,
        isLoading: loading,
        login,
        signIn: login,
        logout,
        signOut: logout,
        register,
        opportunities,
        savedOpportunityIds,
        toggleSaveOpportunity,
        addOpportunity,
        verifyOpportunity,
        mentors,
        mentorRequests,
        sendMentorshipRequest,
        updateMentorshipRequestStatus,
        courses,
        toggleEnrollCourse,
        toggleLessonComplete,
        applyToStartupRole,
        events,
        toggleRegisterEvent,
        posts,
        createPost,
        toggleUpvotePost,
        addCommentToPost,
        startups,
        addStartup,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        messages,
        sendMessage,
        stats,
        aiRecommendations,
        isGeneratingAI,
        fetchAIMentorRecommendations,
        activeView,
        setActiveView,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const useAuth = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAuth must be used within an AppProvider');
  }
  return {
    currentUser: context.currentUser,
    user: context.currentUser,
    profile: context.currentUser,
    isAuthenticated: context.isAuthenticated,
    loading: context.loading,
    isLoading: context.isLoading,
    login: context.login,
    signIn: context.login,
    logout: context.logout,
    signOut: context.logout,
    register: context.register,
    updateCurrentUser: context.updateCurrentUser,
    switchUserRole: context.switchUserRole
  };
};

export const AuthProvider = AppProvider;

import React, { useState, useRef, useEffect } from 'react';
import Markdown from 'react-markdown';
import { useApp } from '../../context/AppContext';
import { askAICareerAdvisor } from '../../services/api';
import {
  Sparkles,
  Bot,
  Send,
  X,
  User,
  GraduationCap,
  Briefcase,
  Globe2,
  Rocket,
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';

interface AICareerAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const AICareerAdvisorModal: React.FC<AICareerAdvisorModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, isAuthenticated } = useApp();

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getInitialGreeting = (user: typeof currentUser, authed: boolean): ChatMessage => {
    if (authed && user?.name) {
      const firstName = user.name.trim().split(/\s+/)[0] || user.name;
      return {
        id: 'welcome',
        sender: 'ai',
        text: `Hello, **${firstName}**! I'm your **Upliftra AI Career & Opportunity Advisor**.\n\nI specialize in Pakistani career navigation, tech roadmaps, international scholarships (Fulbright, Chevening, Erasmus), remote USD contract guidance, and mentor matching.\n\nHow can I support your career journey today?`,
        timestamp: 'Just now'
      };
    }
    return {
      id: 'welcome',
      sender: 'ai',
      text: `Hello! I'm the **Upliftra AI Career & Opportunity Advisor**.\n\nHow can I help you today? I can answer questions about Pakistan tech jobs, remote roles, international scholarships, verified mentors, startups, learning paths, and the Upliftra Network ecosystem.`,
      timestamp: 'Just now'
    };
  };

  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    [getInitialGreeting(currentUser, isAuthenticated)]
  );

  // Re-sync messages cleanly whenever authentication state or logged-in user changes or modal re-opens
  useEffect(() => {
    if (!isAuthenticated || !currentUser) {
      setMessages([getInitialGreeting(null, false)]);
    } else {
      setMessages([getInitialGreeting(currentUser, true)]);
    }
  }, [isAuthenticated, currentUser?.id]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const quickPrompts = [
    { label: 'What is Upliftra Network?', text: 'What is Upliftra Network?' },
    { label: 'Who founded Upliftra Network?', text: 'Who founded Upliftra Network?' },
    { label: 'How can I join Upliftra?', text: 'How can I join Upliftra?' },
    { label: 'How can Upliftra help my career?', text: 'How can Upliftra help my career?' },
    { label: 'What opportunities are available?', text: 'What opportunities are available?' },
    { label: 'How does mentorship work?', text: 'How does mentorship work?' }
  ];

  const getLocalKnowledgeAnswer = (query: string): string => {
    const q = query.toLowerCase().trim();
    if (q.includes('who founded') || q.includes('founder of upliftra') || q.includes('who is the founder')) {
      return 'Upliftra Network was founded by Usman Ali Shah, who leads the platform\'s vision, strategy, technology direction and development.';
    }
    if (q.includes('who is usman ali shah') || q.includes('usman ali shah')) {
      return 'Usman Ali Shah is the Founder of Upliftra Network and leads its vision, strategy, technology direction and overall development.';
    }
    if (q.includes('what is upliftra') || q.includes('about upliftra')) {
      return 'Upliftra Network is a Pakistan-focused career and professional ecosystem designed to connect students, graduates, professionals, mentors, companies, startups, universities and organizations through opportunities, mentorship, learning, networking and career development.';
    }
    if (q.includes('learning hub') || q.includes('courses') || q.includes('what courses') || q.includes('curricula')) {
      return 'The Upliftra Learning Hub offers 100% free, vetted masterclasses with verifiable certificates:\n\n1. **Full-Stack Cloud Engineering (Pakistan to Global Remote)**: TypeScript, Node.js, Next.js, Docker, AWS ECS.\n2. **Mastering Fulbright & International Scholarships**: Step-by-step SOP drafting, research proposal formulation & mock interviews.\n3. **Applied Generative AI with Gemini & RAG**: Gemini SDK, vector databases, LangGraph agents, and production deployments.\n4. **Data Science & Quantitative Analytics**: Python, Pandas, Scikit-learn, SQL, and financial forecasting.\n5. **Silicon Valley Technical Interview Prep**: Data structures, algorithms, dynamic programming, and system design.\n\nYou can access full interactive syllabi, track progress per lesson, and earn Upliftra Certificates directly in the Learning Hub.';
    }
    if (q.includes('startup') || q.includes('startups') || q.includes('kisanconnect') || q.includes('sehatpulse') || q.includes('taleembridge')) {
      return 'The Upliftra Startup Ecosystem showcases high-impact Pakistani ventures incubated at NIC Islamabad, LUMS LCE, and Nest I/O:\n\n- **KisanConnect AI** (AgriTech & Supply Chain): AI-driven crop yield prediction & Urdu mandi pricing.\n- **SehatPulse Health** (HealthTech & AI): Telemedicine triage & localized electronic medical records for rural clinics.\n- **TaleemBridge AI** (EdTech & Generative AI): Personalized adaptive tutoring in Urdu & regional languages.\n- **PakKhata FinTech** (FinTech & Embedded Banking): Digital ledger and micro-credit scoring for 2M+ SMEs in Pakistan.\n- **Dastak Logistics** (B2B Logistics & Supply Chain): Smart fleet optimization and last-mile delivery tracking.\n- **ShamsiClean Energy** (CleanTech & Renewable Solar): IoT solar monitoring and microgrid financing for industrial units.\n\nYou can explore startup teardowns, message founders directly, or apply to open roles with equity options.';
    }
    if (q.includes('who can join') || q.includes('who is upliftra for')) {
      return 'Students, graduates, professionals, mentors, recruiters, companies, startups, universities, organizations, trainers, volunteers, campus ambassadors and other members of the professional ecosystem can join Upliftra.';
    }
    if (q.includes('how can i join') || q.includes('how to join') || q.includes('join upliftra')) {
      return 'You can join Upliftra Network by clicking "Join Upliftra" or "Create New Account". You can select your stakeholder role (Student, Professional, Mentor, Recruiter, Company, Startup, University, Organization, Volunteer, Campus Ambassador, Partner, Moderator, Trainer, Admin), build your profile, and immediately access verified opportunities, AI mentor matches, and community discussions.';
    }
    if (q.includes('how can upliftra help my career') || q.includes('how does upliftra help')) {
      return 'Upliftra Network helps your career through:\n\n1. **Verified Opportunities**: Access vetted jobs, internships, global scholarships (Fulbright, Chevening, Erasmus), and fellowships in Pakistan and worldwide.\n2. **1-on-1 Mentorship**: Connect with verified mentors for resume teardowns, interview prep, and career strategy.\n3. **Learning Hub**: Free tailored skill tracks bridging academia with international tech standards.\n4. **15 Stakeholder Portals**: Dedicated workspaces for students, professionals, founders, recruiters, and universities.\n5. **Community Discussions**: Network with peers, ask career questions, and collaborate on projects.';
    }
    if (q.includes('what opportunities') || q.includes('available opportunities')) {
      return 'Upliftra Network features verified opportunities across multiple categories:\n\n- **Software & Tech Jobs**: Full-time and remote developer roles.\n- **Internships**: Summer, semester, and graduate trainee programs.\n- **International Scholarships**: Fulbright, Chevening, Erasmus Mundus, Commonwealth, and DAAD.\n- **Fellowships & Grants**: National technology and leadership fellowships.\n- **Events & Hackathons**: Premier tech hackathons, masterclasses, and networking sessions.';
    }
    if (q.includes('how does mentorship work') || q.includes('mentorship process')) {
      return 'Mentorship on Upliftra Network works in 3 easy steps:\n\n1. **Explore or AI Match**: Browse verified mentors or let our AI engine match you based on your career goals and skill profile.\n2. **Send Request**: Submit a session request highlighting your specific goals and questions.\n3. **Connect 1-on-1**: Once approved, join direct 1-on-1 video mentorship sessions for SOP reviews, portfolio teardowns, and actionable roadmaps.';
    }
    if (q.includes('team') || q.includes('core team')) {
      return 'The core team of Upliftra Network includes:\n\n- **Usman Ali Shah** — Founder & Strategy Lead\n- **Anus Khalil** — Tech and Partnership Lead\n- **Bisma** — Operations & Research Lead\n- **Yusra Firdous** — Community Engagement & Growth Lead\n- **Misbah Ferdous** — Social Media Lead';
    }
    return 'Upliftra Network connects you with verified mentors, job openings, and scholarship tracks across Pakistan. You can explore opportunities in the navbar or book a session with a verified mentor.';
  };

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const data = await askAICareerAdvisor({
        message: query,
        userProfile: isAuthenticated && currentUser ? currentUser : null,
        history: messages.slice(-4).map((m) => ({
          role: m.sender === 'user' ? 'user' : 'model',
          content: m.text
        }))
      });

      const aiReply: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: data.reply || getLocalKnowledgeAnswer(query),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      const fallbackText = getLocalKnowledgeAnswer(query);
      const fallbackReply: ChatMessage = {
        id: `ai_fallback_${Date.now()}`,
        sender: 'ai',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setLoading(false);
    }
  };

  const copyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm animate-fadeIn">
      <div
        id="ai-career-advisor-modal"
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-3xl h-[88vh] flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-md">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white">
                  Upliftra AI Career & Opportunity Advisor
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 text-[10px] font-bold">
                  Gemini 3.7 Flash
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Personalized Pakistan Tech, Remote Jobs, Scholarships & Incubation Guidance
              </p>
            </div>
          </div>

          <button
            id="btn-close-ai-advisor"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages Log */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50 dark:bg-slate-950">
          {messages.map((m) => {
            const isAI = m.sender === 'ai';

            return (
              <div
                key={m.id}
                className={`flex gap-3 items-start ${isAI ? 'justify-start' : 'justify-end'}`}
              >
                {isAI && (
                  <div className="w-8 h-8 rounded-xl bg-blue-700 dark:bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                    <Sparkles className="w-4 h-4 text-cyan-200" />
                  </div>
                )}

                <div
                  className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed space-y-2 relative group ${
                    isAI
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 shadow-sm rounded-tl-sm'
                      : 'bg-blue-700 dark:bg-blue-600 text-white rounded-br-sm shadow-md'
                  }`}
                >
                  <div className="prose prose-sm dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed text-slate-900 dark:text-slate-100 font-normal">
                    {isAI ? (
                      <Markdown
                        components={{
                          p: ({ children }) => (
                            <p className="mb-2 last:mb-0 text-slate-900 dark:text-slate-100 leading-relaxed">
                              {children}
                            </p>
                          ),
                          strong: ({ children }) => (
                            <strong className="font-bold text-blue-900 dark:text-blue-300">
                              {children}
                            </strong>
                          ),
                          ul: ({ children }) => (
                            <ul className="list-disc pl-4 space-y-1 my-2 text-slate-900 dark:text-slate-200">
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="list-decimal pl-4 space-y-1 my-2 text-slate-900 dark:text-slate-200">
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => (
                            <li className="text-slate-800 dark:text-slate-200 leading-relaxed">
                              {children}
                            </li>
                          )
                        }}
                      >
                        {m.text}
                      </Markdown>
                    ) : (
                      <div className="whitespace-pre-line break-words text-white font-medium">
                        {m.text}
                      </div>
                    )}
                  </div>

                  <div
                    className={`flex items-center justify-between pt-1 text-[10px] ${
                      isAI
                        ? 'text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800'
                        : 'text-blue-200'
                    }`}
                  >
                    <span>{m.timestamp}</span>
                    {isAI && (
                      <button
                        onClick={() => copyText(m.id, m.text)}
                        className="opacity-0 group-hover:opacity-100 transition flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 text-slate-500 dark:text-slate-400"
                        title="Copy Answer"
                      >
                        {copiedId === m.id ? (
                          <Check className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        <span>{copiedId === m.id ? 'Copied' : 'Copy'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {!isAI && (
                  isAuthenticated && currentUser?.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name || 'User'}
                      className="w-8 h-8 rounded-xl object-cover border border-blue-400 shrink-0 mt-0.5 shadow-xs"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 mt-0.5 border border-slate-300 dark:border-slate-600">
                      <User className="w-4 h-4" />
                    </div>
                  )
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-700 dark:bg-blue-600 text-white flex items-center justify-center shrink-0 animate-pulse">
                <Sparkles className="w-4 h-4 text-cyan-200" />
              </div>
              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2 shadow-xs">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600 dark:text-blue-400" />
                <span>Formulating personalized Pakistan career strategy...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[11px] font-bold text-slate-400 dark:text-slate-400 shrink-0">
            Quick Topics:
          </span>
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p.text)}
              className="px-3 py-1.5 rounded-lg text-xs bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/70 text-slate-800 dark:text-slate-200 hover:text-blue-700 dark:hover:text-blue-300 border border-slate-200 dark:border-slate-700 whitespace-nowrap transition font-medium"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <input
            type="text"
            id="input-ai-career-chat"
            placeholder="Ask anything about Pakistan tech jobs, Fulbright SOP, startup grants, or salary..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
          />
          <button
            id="btn-send-ai-query"
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className="px-4 py-2.5 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white font-bold rounded-xl text-xs sm:text-sm transition flex items-center gap-1.5 shadow-xs"
          >
            <span>Send</span>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

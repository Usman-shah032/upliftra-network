import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { ROLE_CONFIG, RoleBadge } from '../common/RoleBadge';
import { VerificationBadge } from '../common/VerificationBadge';
import { PortalSwitcherModal } from '../common/PortalSwitcherModal';
import {
  GraduationCap,
  Briefcase,
  Users,
  Search,
  Building2,
  Rocket,
  School,
  Landmark,
  HeartHandshake,
  Award,
  Globe2,
  ShieldCheck,
  BookOpen,
  UserCog,
  Crown,
  Layers,
  Sparkles,
  Plus,
  CheckCircle,
  Clock,
  Video,
  FileText,
  TrendingUp,
  BarChart3,
  Calendar,
  DollarSign,
  MapPin,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const RoleDashboardRouter: React.FC<{ onOpenAICoach: () => void }> = ({ onOpenAICoach }) => {
  const {
    currentUser,
    isAuthenticated,
    switchUserRole,
    opportunities,
    savedOpportunityIds,
    mentors,
    mentorRequests,
    updateMentorshipRequestStatus,
    courses,
    events,
    startups,
    stats,
    setActiveView,
    verifyOpportunity
  } = useApp();

  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);
  const [meetingInputModal, setMeetingInputModal] = useState<{ reqId: string; time: string; link: string } | null>(null);

  const activeUser = currentUser || {
    id: 'guest_user',
    name: 'Guest Explorer',
    email: 'guest@upliftra.pk',
    role: 'student' as UserRole,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    headline: 'Ecosystem Explorer & Aspiring Tech Leader',
    location: 'Pakistan',
    isVerified: false,
    profileCompletion: 20,
    joinedDate: 'Today',
    skills: ['Career Exploration', 'Learning']
  };

  // Student specific calculations
  const savedOpps = opportunities.filter((o) => savedOpportunityIds.includes(o.id));
  const myRequests = mentorRequests.filter((r) => r.menteeId === activeUser.id);
  const enrolledCourses = courses.filter((c) => c.isEnrolled);

  // Mentor specific calculations
  const incomingRequests = mentorRequests.filter((r) => r.mentorId === activeUser.id);

  // Recruiter / Company specific
  const myPostedOpps = opportunities.filter((o) => o.postedByUserId === activeUser.id || o.organization.toLowerCase().includes('systems') || o.organization.toLowerCase().includes('tech'));

  // Moderator specific
  const pendingOpps = opportunities.filter((o) => o.verificationStatus === 'pending');

  return (
    <div className="py-10 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Identity Banner */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={activeUser.avatar}
              alt={activeUser.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-500/30"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {activeUser.name}
                </h1>
                {activeUser.isVerified && <VerificationBadge size="sm" />}
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {activeUser.headline}
              </p>
              <div className="flex items-center gap-2 pt-0.5">
                <RoleBadge role={activeUser.role} size="sm" />
                <span className="text-xs text-slate-400">• {activeUser.location}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              id="btn-portal-switch-in-dashboard"
              onClick={() => setIsSwitcherOpen(true)}
              className="px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950 text-slate-800 dark:text-slate-200 font-semibold text-xs border border-slate-200 dark:border-slate-700 transition flex items-center gap-2"
            >
              <Layers className="w-4 h-4 text-blue-700" />
              <span>Switch Portal (15 Roles)</span>
            </button>

            <button
              id="btn-open-ai-coach-dashboard"
              onClick={onOpenAICoach}
              className="px-3.5 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs shadow-xs transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-200" />
              <span>AI Career Advisor</span>
            </button>
          </div>
        </div>

        {/* Dynamic Content based on UserRole */}
        {activeUser.role === 'student' && (
          <div className="space-y-8">
            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-400">Profile Completion</span>
                <div className="text-xl font-bold text-blue-600 mt-1">{activeUser.profileCompletion}%</div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: `${activeUser.profileCompletion}%` }} />
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-400">Saved Opportunities</span>
                <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">{savedOpps.length}</div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-400">Mentorship Sessions</span>
                <div className="text-xl font-bold text-emerald-600 mt-1">{myRequests.length}</div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-400">Enrolled Courses</span>
                <div className="text-xl font-bold text-purple-600 mt-1">{enrolledCourses.length}</div>
              </div>
            </div>

            {/* Main grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left 2 Cols: AI Recommendations + Saved Opps */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">
                        AI Recommended Mentors for You
                      </h3>
                    </div>
                    <button onClick={() => setActiveView('mentorship')} className="text-xs text-blue-600 hover:underline">
                      View all mentors →
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {mentors.slice(0, 2).map((m) => (
                      <div key={m.id} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 space-y-3">
                        <div className="flex items-center gap-3">
                          <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-xl object-cover" />
                          <div>
                            <h4 className="font-bold text-xs text-slate-900 dark:text-white">{m.name}</h4>
                            <p className="text-[11px] text-blue-600 dark:text-blue-400">{m.title}</p>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-2">{m.bio}</p>
                        <button
                          onClick={() => setActiveView('mentorship')}
                          className="w-full py-1.5 bg-blue-600 text-white font-bold text-xs rounded-lg"
                        >
                          Request 1-on-1 Session
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Saved Opportunities */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">
                      Saved Jobs & Scholarships ({savedOpps.length})
                    </h3>
                    <button onClick={() => setActiveView('opportunities')} className="text-xs text-blue-600 hover:underline">
                      Explore more →
                    </button>
                  </div>

                  <div className="space-y-3">
                    {savedOpps.map((opp) => (
                      <div key={opp.id} className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-xs text-slate-900 dark:text-white">{opp.title}</h4>
                          <p className="text-[11px] text-slate-500">{opp.organization} • {opp.location}</p>
                        </div>
                        <button
                          onClick={() => setActiveView('opportunities')}
                          className="px-3 py-1 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-bold"
                        >
                          View & Apply
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Col: Academic Info & Mentorship Status */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <School className="w-4 h-4 text-blue-600" />
                    <span>Academic & Career Targets</span>
                  </h3>
                  <div className="text-xs space-y-2 text-slate-600 dark:text-slate-300">
                    <div>
                      <span className="text-slate-400 block">University</span>
                      <strong>{activeUser.universityName || 'FAST NUCES, Islamabad'}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Degree & Graduation</span>
                      <strong>{activeUser.degree || 'BS Computer Science (2026)'}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Target Aspiration</span>
                      <strong>Fulbright MS in AI / Silicon Valley Remote SWE</strong>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Video className="w-4 h-4 text-emerald-600" />
                    <span>My Mentorship Sessions</span>
                  </h3>
                  {myRequests.length === 0 ? (
                    <p className="text-xs text-slate-400">No active sessions requested yet.</p>
                  ) : (
                    myRequests.map((r) => (
                      <div key={r.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs space-y-1">
                        <div className="font-bold text-slate-800 dark:text-slate-200">With {r.mentorName}</div>
                        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 uppercase">{r.status}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeUser.role === 'mentor' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-400">Total Mentorship Sessions</span>
                <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">142</div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-400">Mentee Rating</span>
                <div className="text-2xl font-bold text-amber-500 mt-1">★ 4.95 / 5.0</div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-400">Incoming Mentee Requests</span>
                <div className="text-2xl font-bold text-blue-600 mt-1">{mentorRequests.length}</div>
              </div>
            </div>

            {/* Incoming Requests Queue */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Mentee Session Requests & Management
              </h3>
              <div className="space-y-3">
                {mentorRequests.map((req) => (
                  <div key={req.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <img src={req.menteeAvatar} alt={req.menteeName} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white">{req.menteeName}</h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700 uppercase">{req.status}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5"><strong>Goals:</strong> {req.goals}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{req.message}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {req.status === 'pending' && (
                        <>
                          <button
                            onClick={() =>
                              updateMentorshipRequestStatus(
                                req.id,
                                'accepted',
                                'Tomorrow, 6:00 PM PKT',
                                'https://meet.google.com/upl-ift-net'
                              )
                            }
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl"
                          >
                            Accept & Schedule
                          </button>
                          <button
                            onClick={() => updateMentorshipRequestStatus(req.id, 'rejected')}
                            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
                          >
                            Decline
                          </button>
                        </>
                      )}
                      {req.status === 'accepted' && (
                        <div className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          <span>Scheduled: {req.scheduledTime || 'Confirmed'}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {(activeUser.role === 'recruiter' || activeUser.role === 'company') && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-400">Active Job Postings</span>
                <div className="text-2xl font-bold text-blue-600 mt-1">4 Openings</div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-400">Total Applicants</span>
                <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">186 Candidates</div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-400">Shortlisted for Tech Interview</span>
                <div className="text-2xl font-bold text-emerald-600 mt-1">24</div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-400">Verification Status</span>
                <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">Verified Partner</div>
              </div>
            </div>

            {/* Candidate Pipeline */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Active Candidate Pipeline for {activeUser.companyName || 'Systems Ltd'}
                </h3>
                <button
                  onClick={() => setActiveView('opportunities')}
                  className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Post New Job Opening</span>
                </button>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'Hamza Khan', role: 'Full-Stack Developer Applicant', uni: 'LUMS 2025', gpa: '3.82', match: '98%' },
                  { name: 'Ayesha Malik', role: 'Associate Data Scientist', uni: 'NUST 2024', gpa: '3.90', match: '96%' },
                  { name: 'Usman Ghani', role: 'DevOps & Cloud Engineer', uni: 'FAST NUCES 2025', gpa: '3.75', match: '94%' }
                ].map((cand, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">{cand.name}</h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">{cand.match} Match</span>
                      </div>
                      <p className="text-xs text-slate-500">{cand.role} • {cand.uni} (GPA: {cand.gpa})</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg">
                        Schedule Interview
                      </button>
                      <button className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg">
                        View Portfolio
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {(activeUser.role === 'admin' || activeUser.role === 'super_admin' || activeUser.role === 'moderator') && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-400">Total Registered Members</span>
                <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{stats.totalUsers.toLocaleString()}</div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-400">Verified Opportunities</span>
                <div className="text-2xl font-bold text-blue-600 mt-1">{stats.verifiedOpportunities}</div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-400">Pending Review Queue</span>
                <div className="text-2xl font-bold text-amber-500 mt-1">{pendingOpps.length}</div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-400">Platform Health</span>
                <div className="text-2xl font-bold text-emerald-600 mt-1">99.98% OK</div>
              </div>
            </div>

            {/* Moderation Queue */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <span>Opportunity Verification Queue</span>
              </h3>

              {pendingOpps.length === 0 ? (
                <p className="text-xs text-slate-400">All submissions verified! No items currently in queue.</p>
              ) : (
                pendingOpps.map((opp) => (
                  <div key={opp.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{opp.title}</h4>
                      <p className="text-xs text-slate-500">{opp.organization} • {opp.location}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => verifyOpportunity(opp.id, 'verified')}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl"
                      >
                        Approve & Verify
                      </button>
                      <button
                        onClick={() => verifyOpportunity(opp.id, 'rejected')}
                        className="px-3 py-2 bg-rose-100 hover:bg-rose-200 text-rose-700 text-xs font-semibold rounded-xl"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Generic Portal View for other roles (University, Startup, Ambassador, Volunteer, Trainer, Partner) */}
        {!['student', 'mentor', 'recruiter', 'company', 'admin', 'super_admin', 'moderator'].includes(activeUser.role) && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                    {ROLE_CONFIG[activeUser.role]?.label} Specialized Workspace
                  </h3>
                  <p className="text-xs text-slate-500">
                    {ROLE_CONFIG[activeUser.role]?.desc}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                  <span className="text-xs text-slate-400">Ecosystem Network Reach</span>
                  <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">48,000+ Members</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                  <span className="text-xs text-slate-400">Collaboration Opportunities</span>
                  <div className="text-xl font-bold text-blue-600 mt-1">Active Pipeline</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                  <span className="text-xs text-slate-400">Status</span>
                  <div className="text-xl font-bold text-emerald-600 mt-1">Authorized</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <PortalSwitcherModal isOpen={isSwitcherOpen} onClose={() => setIsSwitcherOpen(false)} />
    </div>
  );
};

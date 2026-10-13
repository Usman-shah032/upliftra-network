import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mentor } from '../../types';
import { VerificationBadge } from '../common/VerificationBadge';
import {
  Users,
  Search,
  Sparkles,
  Star,
  Clock,
  Calendar,
  MessageSquare,
  Video,
  CheckCircle,
  Brain,
  X,
  Send,
  Building,
  GraduationCap,
  MapPin,
  Award,
  BookOpen,
  Globe
} from 'lucide-react';

interface MentorshipHubProps {
  onOpenAuth: (mode?: 'login' | 'register') => void;
}

export const MentorshipHub: React.FC<MentorshipHubProps> = ({ onOpenAuth }) => {
  const {
    mentors,
    mentorRequests,
    sendMentorshipRequest,
    currentUser,
    isAuthenticated,
    isGeneratingAI,
    fetchAIMentorRecommendations
  } = useApp();

  const [searchMentor, setSearchMentor] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('all');
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [requestModalMentor, setRequestModalMentor] = useState<Mentor | null>(null);
  const [requestMessage, setRequestMessage] = useState('');
  const [requestGoals, setRequestGoals] = useState('');
  const [activeTab, setActiveTab] = useState<'browse' | 'my-requests'>('browse');

  const expertiseList = [
    'all',
    'AI / Machine Learning',
    'Software Architecture',
    'Fulbright / Overseas Scholarships',
    'Product Management',
    'Cybersecurity',
    'Startup Venture Building'
  ];

  const filteredMentors = mentors.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchMentor.toLowerCase()) ||
      m.company.toLowerCase().includes(searchMentor.toLowerCase()) ||
      m.expertise.some((e) => e.toLowerCase().includes(searchMentor.toLowerCase())) ||
      m.mentoringTopics.some((t) => t.toLowerCase().includes(searchMentor.toLowerCase()));

    const matchesExp =
      selectedExpertise === 'all' ||
      m.expertise.some((e) => e.toLowerCase().includes(selectedExpertise.toLowerCase()));

    return matchesSearch && matchesExp;
  });

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestModalMentor || !requestMessage.trim()) return;

    sendMentorshipRequest(requestModalMentor.id, requestMessage, requestGoals || 'Career mentorship & strategy');
    setRequestModalMentor(null);
    setRequestMessage('');
    setRequestGoals('');
    setActiveTab('my-requests');
  };

  const myRequests = currentUser?.id ? mentorRequests.filter((r) => r.menteeId === currentUser.id) : [];

  return (
    <div className="py-10 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header with AI Match trigger */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-8 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI-Assisted Matchmaking</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                Mentorship Ecosystem
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Connect 1-on-1 with verified Pakistani engineers, engineering directors, Fulbright scholars, and tech founders across Karachi, Lahore, Islamabad, Silicon Valley, and Europe.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                id="btn-recalculate-ai-mentors"
                onClick={() => fetchAIMentorRecommendations()}
                disabled={isGeneratingAI}
                className="px-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold text-xs rounded-xl transition shadow-md flex items-center gap-2"
              >
                <Brain className="w-4 h-4 text-cyan-200" />
                <span>{isGeneratingAI ? 'Recalculating AI Matches...' : 'Recalculate AI Match'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation: Browse vs My Requests */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-4">
            <button
              id="tab-mentors-browse"
              onClick={() => setActiveTab('browse')}
              className={`text-sm font-bold pb-2 transition border-b-2 ${
                activeTab === 'browse'
                  ? 'text-blue-600 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'text-slate-500 border-transparent hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Verified Mentors ({filteredMentors.length})
            </button>
            <button
              id="tab-mentors-requests"
              onClick={() => setActiveTab('my-requests')}
              className={`text-sm font-bold pb-2 transition border-b-2 flex items-center gap-2 ${
                activeTab === 'my-requests'
                  ? 'text-blue-600 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'text-slate-500 border-transparent hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <span>My Mentorship Requests</span>
              {myRequests.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs">
                  {myRequests.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {activeTab === 'browse' ? (
          <>
            {/* Search & Filter */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by mentor name, company (Google, Careem, Fast NUCES), or topic..."
                    value={searchMentor}
                    onChange={(e) => setSearchMentor(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Expertise Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {expertiseList.map((exp) => (
                  <button
                    key={exp}
                    onClick={() => setSelectedExpertise(exp)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                      selectedExpertise === exp
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {exp === 'all' ? 'All Domains' : exp}
                  </button>
                ))}
              </div>
            </div>

            {/* Mentors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMentors.map((mentor) => (
                <div
                  key={mentor.id}
                  id={`mentor-card-${mentor.id}`}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-blue-300 dark:hover:border-slate-700 transition flex flex-col justify-between"
                >
                  <div>
                    {/* Top: Avatar + Rating + Match score */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={mentor.avatar}
                          alt={mentor.name}
                          className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-200 dark:border-slate-700"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-bold text-base text-slate-900 dark:text-white">
                              {mentor.name}
                            </h3>
                            <VerificationBadge size="sm" />
                          </div>
                          <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                            {mentor.title}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {mentor.company} • {mentor.location}
                          </p>
                        </div>
                      </div>

                      {mentor.matchScore && (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold shrink-0 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          <span>{mentor.matchScore}% Match</span>
                        </span>
                      )}
                    </div>

                    {/* Bio */}
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                      {mentor.bio}
                    </p>

                    {/* AI Match Reasons Callout if present */}
                    {mentor.matchReasons && mentor.matchReasons.length > 0 && (
                      <div className="p-3 mb-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 text-xs space-y-1">
                        <div className="font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1">
                          <Brain className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          <span>AI Match Context</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                          {mentor.matchReasons[0]}
                        </p>
                      </div>
                    )}

                    {/* Topics */}
                    <div className="mb-4">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                        Mentoring Topics
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {mentor.mentoringTopics.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded font-medium"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer details & Request CTA */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{mentor.rating} ({mentor.reviewCount} sessions)</span>
                      </div>
                      <div className="text-slate-400">
                        {mentor.availability}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        id={`btn-view-mentor-${mentor.id}`}
                        onClick={() => setSelectedMentor(mentor)}
                        className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition text-center"
                      >
                        Profile
                      </button>
                      <button
                        id={`btn-request-session-${mentor.id}`}
                        onClick={() => {
                          if (!isAuthenticated) {
                            onOpenAuth('login');
                          } else {
                            setRequestModalMentor(mentor);
                          }
                        }}
                        className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition text-center flex items-center justify-center gap-1.5"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Request 1-on-1</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* My Requests List */
          <div className="space-y-4">
            {myRequests.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 p-12 text-center rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                <Users className="w-12 h-12 text-slate-400 mx-auto" />
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                  No Active Mentorship Requests
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Browse our verified Pakistani mentors and request a 1-on-1 session for resume teardowns, Fulbright SOP feedback, or technical roadmap advice.
                </p>
                <button
                  onClick={() => setActiveTab('browse')}
                  className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
                >
                  Browse Mentors
                </button>
              </div>
            ) : (
              myRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={req.mentorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                      alt={req.mentorName}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                          Session with {req.mentorName}
                        </h4>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                            req.status === 'accepted'
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                              : req.status === 'pending'
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                              : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                          }`}
                        >
                          {req.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        <strong>Goals:</strong> {req.goals}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {req.message}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {req.meetingLink && (
                      <a
                        href={req.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Join Meeting</span>
                      </a>
                    )}
                    <span className="text-xs text-slate-400">
                      Requested {req.requestedDate}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* 1-on-1 Request Modal */}
      {requestModalMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={requestModalMentor.avatar}
                  alt={requestModalMentor.name}
                  className="w-10 h-10 rounded-xl object-cover"
                />
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    Request Mentorship with {requestModalMentor.name}
                  </h3>
                  <p className="text-xs text-slate-500">{requestModalMentor.title}</p>
                </div>
              </div>
              <button onClick={() => setRequestModalMentor(null)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSendRequest} className="p-6 space-y-4 text-xs sm:text-sm">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Primary Goals & Discussion Topic *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fulbright SOP Review, Frontend to Full-Stack transition, Startup feedback"
                  value={requestGoals}
                  onChange={(e) => setRequestGoals(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Message to Mentor *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Briefly introduce your academic/professional background, what you have accomplished so far, and the specific blockers you need guidance on..."
                  value={requestMessage}
                  onChange={(e) => setRequestMessage(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-xs text-blue-700 dark:text-blue-300">
                💡 <strong>Tip:</strong> Mentors on Upliftra volunteer their time. Providing a concise agenda increases request acceptance rate by 80%.
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRequestModalMentor(null)}
                  className="px-4 py-2 text-slate-600 dark:text-slate-400 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Mentorship Request</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mentor Profile Modal */}
      {selectedMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white flex items-start justify-between border-b border-slate-800">
              <div className="flex items-center gap-4">
                <img
                  src={selectedMentor.avatar}
                  alt={selectedMentor.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20 shadow-md"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-white">{selectedMentor.name}</h3>
                    {selectedMentor.isVerified && <VerificationBadge size="sm" />}
                  </div>
                  <p className="text-xs font-semibold text-cyan-300 mt-0.5">{selectedMentor.title}</p>
                  <p className="text-xs text-slate-300">{selectedMentor.company} • {selectedMentor.location}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMentor(null)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Rating</span>
                  <strong className="text-amber-500 font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{selectedMentor.rating} / 5.0</span>
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Total Sessions</span>
                  <strong className="text-slate-900 dark:text-white font-bold">{selectedMentor.reviewCount || selectedMentor.totalMenteesHelped || 45}+ Mentees</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Availability</span>
                  <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{selectedMentor.availability}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Fee / Session</span>
                  <strong className="text-blue-600 dark:text-blue-400 font-bold">100% Free (Pro Bono)</strong>
                </div>
              </div>

              {/* Bio */}
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2">About & Track Record</h4>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                  {selectedMentor.bio}
                </p>
              </div>

              {/* Expertise Areas */}
              <div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider mb-2">Core Domains of Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMentor.expertise.map((exp, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold text-xs border border-blue-100 dark:border-blue-900">
                      ✓ {exp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mentoring Topics */}
              <div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider mb-2">What You Can Discuss</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedMentor.mentoringTopics.map((topic, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 shrink-0" />
                      <span className="text-xs font-medium text-slate-800 dark:text-slate-200">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages & Target Mentees */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-slate-400 block text-[11px] mb-1">Preferred Mentee Profile</span>
                  <p className="text-xs font-medium text-slate-800 dark:text-slate-200">{selectedMentor.preferredMenteeType || 'Undergraduates, fresh graduates, and career transitioners'}</p>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] mb-1">Languages Supported</span>
                  <p className="text-xs font-medium text-slate-800 dark:text-slate-200">{selectedMentor.languages ? selectedMentor.languages.join(', ') : 'English, Urdu'}</p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => setSelectedMentor(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
              >
                Close Profile
              </button>
              <button
                onClick={() => {
                  const target = selectedMentor;
                  setSelectedMentor(null);
                  if (!isAuthenticated) {
                    onOpenAuth('login');
                  } else {
                    setRequestModalMentor(target);
                  }
                }}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-md transition"
              >
                <Video className="w-4 h-4" />
                <span>Request 1-on-1 Session</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

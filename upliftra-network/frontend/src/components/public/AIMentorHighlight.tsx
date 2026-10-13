import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VerificationBadge } from '../common/VerificationBadge';
import {
  Sparkles,
  Bot,
  ArrowRight,
  CheckCircle2,
  Brain,
  Star,
  Users,
  ShieldCheck
} from 'lucide-react';

interface AIMentorHighlightProps {
  onOpenAuth: (mode?: 'login' | 'register') => void;
}

export const AIMentorHighlight: React.FC<AIMentorHighlightProps> = ({ onOpenAuth }) => {
  const { mentors, currentUser, setActiveView, isGeneratingAI, fetchAIMentorRecommendations } = useApp();

  const [selectedDemoMentor, setSelectedDemoMentor] = useState(mentors[0] || null);

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden border-y border-slate-800">
      {/* Decorative Grid Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Col: Explanatory & Value Proposition */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Core Differentiator</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              AI-Powered Mentor & Opportunity Matching
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              When a student or professional completes their profile, our multi-factor AI engine evaluates education, technical skills, career aspirations, and scholarship goals to formulate tailored 1-on-1 mentor pairings with transparent rationale.
            </p>

            {/* Matching Criteria Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Education & Degree Evaluation</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Skill Overlap & Gap Analysis</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pakistani & Global Market Alignment</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Higher Studies & Fulbright Alignment</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                id="btn-ai-explore-mentors"
                onClick={() => setActiveView('mentorship')}
                className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg text-xs sm:text-sm transition shadow-xs flex items-center gap-2"
              >
                <span>Find Your Recommended Mentors</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                id="btn-trigger-ai-refresh"
                onClick={() => fetchAIMentorRecommendations()}
                disabled={isGeneratingAI}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg text-xs border border-slate-700 transition flex items-center gap-2"
              >
                <Brain className="w-4 h-4 text-cyan-400" />
                <span>{isGeneratingAI ? 'Computing AI Matches...' : 'Simulate AI Match'}</span>
              </button>
            </div>
          </div>

          {/* Right Col: Live Interactive Match Card Mockup */}
          <div className="lg:col-span-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl relative">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-900/60 text-blue-300 border border-blue-800">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">
                      AI Recommendation Engine
                    </h3>
                    <p className="text-xs text-slate-400">
                      Matched for: <span className="text-cyan-300 font-medium">{currentUser?.name || 'Aspiring Professional'}</span>
                    </p>
                  </div>
                </div>
                <div className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>95% Match</span>
                </div>
              </div>

              {/* Mentor Profile Snapshot */}
              {selectedDemoMentor && (
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={selectedDemoMentor.avatar}
                      alt={selectedDemoMentor.name}
                      className="w-16 h-16 rounded-xl object-cover border-2 border-blue-500/40 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-white">
                          {selectedDemoMentor.name}
                        </h4>
                        <VerificationBadge size="sm" />
                      </div>
                      <p className="text-xs text-cyan-300 font-medium">
                        {selectedDemoMentor.title}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {selectedDemoMentor.company} • {selectedDemoMentor.location}
                      </p>
                    </div>
                  </div>

                  {/* Why this mentor matches Callout */}
                  <div className="p-4 rounded-xl bg-blue-950/60 border border-blue-800/80 text-xs space-y-2">
                    <div className="font-bold text-blue-200 flex items-center gap-1.5">
                      <Brain className="w-4 h-4 text-cyan-400" />
                      <span>Why This Mentor Matches Your Profile</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      {selectedDemoMentor.matchReasons?.[0] ||
                        `Specializes in ${selectedDemoMentor.expertise[0]} and has successfully guided over 140+ Pakistani students into global scholarship and engineering careers.`}
                    </p>
                  </div>

                  {/* Skills / Topics overlap */}
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Key Overlapping Topics
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedDemoMentor.mentoringTopics.map((topic, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md bg-slate-700/60 text-slate-200 text-xs font-medium border border-slate-600/60"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action row */}
                  <div className="pt-2 flex items-center justify-between border-t border-slate-700">
                    <div className="text-xs text-slate-400">
                      ★ {selectedDemoMentor.rating} ({selectedDemoMentor.reviewCount} reviews)
                    </div>
                    <button
                      id="btn-demo-request-mentor"
                      onClick={() => setActiveView('mentorship')}
                      className="px-3.5 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs rounded-lg transition shadow-xs"
                    >
                      Connect with Mentor →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

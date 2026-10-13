import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Users,
  Briefcase,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Building2,
  Rocket,
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';

interface HeroSectionProps {
  onOpenAuth: (mode?: 'login' | 'register') => void;
  onOpenAICoach: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAuth, onOpenAICoach }) => {
  const { setActiveView, searchQuery, setSearchQuery, stats } = useApp();

  const quickRoles = [
    { label: 'Students & Fresh Grads', role: 'student', icon: <GraduationCap className="w-3.5 h-3.5" /> },
    { label: 'Industry Mentors', role: 'mentor', icon: <Users className="w-3.5 h-3.5" /> },
    { label: 'Recruiters & Companies', role: 'company', icon: <Building2 className="w-3.5 h-3.5" /> },
    { label: 'Startups & Founders', role: 'startup', icon: <Rocket className="w-3.5 h-3.5" /> },
    { label: 'Universities & Placement', role: 'university', icon: <Award className="w-3.5 h-3.5" /> }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background Decorative Mesh with Brand Colors */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-cyan-600 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Pakistan’s Unified Professional & Career Tech Ecosystem</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            One Trusted Ecosystem for{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-200 bg-clip-text text-transparent">
              Career Growth, Mentorship & Opportunities
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Connecting students, graduates, working professionals, mentors, recruiters, and startups across Pakistan into a unified platform backed by AI-powered mentor matching and verified career pathways.
          </p>

          {/* Search Box */}
          <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-xl p-2 shadow-lg border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1 flex items-center">
              <Search className="w-4 h-4 absolute left-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search jobs, internships, scholarships, mentors (e.g., React, Fulbright, Careem)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setActiveView('opportunities');
                }}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 bg-transparent focus:outline-none"
              />
            </div>
            <button
              id="btn-hero-search-submit"
              onClick={() => setActiveView('opportunities')}
              className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Search</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Role Quick Filter Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="text-xs text-slate-400">Explore by Role:</span>
            {quickRoles.map((qr) => (
              <button
                key={qr.role}
                onClick={() => {
                  setActiveView('opportunities');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-slate-800/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition"
              >
                {qr.icon}
                <span>{qr.label}</span>
              </button>
            ))}
          </div>

          {/* Primary Call to Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              id="btn-hero-explore-opps"
              onClick={() => setActiveView('opportunities')}
              className="px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs sm:text-sm transition shadow-xs flex items-center gap-2"
            >
              <Briefcase className="w-4 h-4" />
              <span>Explore Opportunities</span>
            </button>
            <button
              id="btn-hero-find-mentor"
              onClick={() => setActiveView('mentorship')}
              className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm border border-slate-700 transition flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              <span>Find a Mentor (AI Match)</span>
            </button>
            <button
              id="btn-hero-join"
              onClick={() => onOpenAuth('register')}
              className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm transition shadow-xs flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Join Upliftra Network</span>
            </button>
          </div>
        </div>

        {/* Live Ecosystem Stats Strip */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-white">
              {stats.totalUsers.toLocaleString()}+
            </div>
            <div className="text-xs text-slate-400 font-medium mt-1">
              Active Members
            </div>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-400">
              {stats.verifiedOpportunities.toLocaleString()}+
            </div>
            <div className="text-xs text-slate-400 font-medium mt-1">
              Verified Opportunities
            </div>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400">
              {stats.verifiedMentors.toLocaleString()}+
            </div>
            <div className="text-xs text-slate-400 font-medium mt-1">
              Verified Mentors
            </div>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
              {stats.partnerUniversities.toLocaleString()}+
            </div>
            <div className="text-xs text-slate-400 font-medium mt-1">
              Partner Universities
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

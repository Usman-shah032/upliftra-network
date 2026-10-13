import React from 'react';
import {
  UserPlus,
  Compass,
  Sparkles,
  Users,
  TrendingUp,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HowItWorksSection: React.FC = () => {
  const { setActiveView } = useApp();

  const steps = [
    {
      step: '01',
      title: 'Create Your Profile',
      desc: 'Build your professional profile and tell Upliftra about your career ambitions, skills, and background.',
      icon: <UserPlus className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      action: 'register',
      actionLabel: 'Join Upliftra'
    },
    {
      step: '02',
      title: 'Discover Opportunities',
      desc: 'Find verified jobs, internships, scholarships, tech events, and structured learning roadmaps.',
      icon: <Compass className="w-5 h-5 text-sky-600 dark:text-sky-400" />,
      action: 'opportunities',
      actionLabel: 'Browse Roles'
    },
    {
      step: '03',
      title: 'Get Matched',
      desc: 'Receive AI-powered recommendations connecting you with relevant mentors, peers, and openings.',
      icon: <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      action: 'mentorship',
      actionLabel: 'Find Mentors'
    },
    {
      step: '04',
      title: 'Connect & Learn',
      desc: 'Schedule 1-on-1 mentorship sessions, attend live events, and participate in community discussions.',
      icon: <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      action: 'community',
      actionLabel: 'Join Community'
    },
    {
      step: '05',
      title: 'Grow Your Career',
      desc: 'Build real-world skills, gain valuable experience, expand your network, and accelerate long-term success.',
      icon: <TrendingUp className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      action: 'learning',
      actionLabel: 'Start Learning'
    }
  ];

  return (
    <section id="how-it-works-section" className="py-20 bg-slate-50 dark:bg-slate-950 border-y border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Clear 5-Step Ecosystem Journey</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            How Upliftra Network Works
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            A clear, transparent pathway designed to take you from foundational profile building to long-term career growth.
          </p>
        </div>

        {/* 5-Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs hover:border-blue-500/50 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Step {item.step}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => setActiveView(item.action as any)}
                  className="w-full text-left text-xs font-semibold text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center justify-between group/btn py-1"
                >
                  <span>{item.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

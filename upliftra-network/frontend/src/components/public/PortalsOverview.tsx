import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  GraduationCap,
  Briefcase,
  UserCheck,
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
  ArrowRight
} from 'lucide-react';

const ROLE_ITEMS: { role: UserRole; title: string; desc: string; icon: React.ReactNode }[] = [
  {
    role: 'student',
    title: 'Student Portal',
    desc: 'Profile completion, AI mentor recommendations, scholarships, internships, and skill progress tracking.',
    icon: <GraduationCap className="w-5 h-5 text-blue-700 dark:text-blue-400" />
  },
  {
    role: 'professional',
    title: 'Professional Portal',
    desc: 'High-growth tech jobs, career roadmap analytics, executive networking, and leadership mentoring.',
    icon: <Briefcase className="w-5 h-5 text-indigo-700 dark:text-indigo-400" />
  },
  {
    role: 'mentor',
    title: 'Mentor Portal',
    desc: 'Manage incoming mentee requests, schedule 1-on-1 video sessions, availability calendar, and feedback.',
    icon: <UserCheck className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
  },
  {
    role: 'recruiter',
    title: 'Recruiter Portal',
    desc: 'Post job openings, search pre-vetted Pakistani tech talent, pipeline candidate applications.',
    icon: <Search className="w-5 h-5 text-sky-700 dark:text-sky-400" />
  },
  {
    role: 'company',
    title: 'Company Portal',
    desc: 'Enterprise employer branding, graduate trainee programs, internship drives, and corporate events.',
    icon: <Building2 className="w-5 h-5 text-slate-700 dark:text-slate-300" />
  },
  {
    role: 'startup',
    title: 'Startup / Founder Portal',
    desc: 'Find co-founders, post collaboration requirements, hire early technical talent, and pitch deck access.',
    icon: <Rocket className="w-5 h-5 text-amber-700 dark:text-amber-400" />
  },
  {
    role: 'university',
    title: 'University Portal',
    desc: 'Campus placement management, alumni engagement, university-wide hackathons, and employer liaisons.',
    icon: <School className="w-5 h-5 text-blue-800 dark:text-blue-300" />
  },
  {
    role: 'organization',
    title: 'Organization / NGO Portal',
    desc: 'Publish public fellowships, youth development programs, grants, and national capacity-building drives.',
    icon: <Landmark className="w-5 h-5 text-teal-700 dark:text-teal-400" />
  },
  {
    role: 'volunteer',
    title: 'Volunteer Portal',
    desc: 'Community STEM outreach in secondary cities, event organizing, and social impact tracking.',
    icon: <HeartHandshake className="w-5 h-5 text-rose-700 dark:text-rose-400" />
  },
  {
    role: 'campus_ambassador',
    title: 'Campus Ambassador Portal',
    desc: 'Drive Upliftra workshops on campus, track student signups, organize mentor office hours, and gain awards.',
    icon: <Award className="w-5 h-5 text-cyan-700 dark:text-cyan-400" />
  },
  {
    role: 'partner',
    title: 'Partner Portal',
    desc: 'Joint international scholarship initiatives, cultural exchanges, and corporate partner programs.',
    icon: <Globe2 className="w-5 h-5 text-violet-700 dark:text-violet-400" />
  },
  {
    role: 'moderator',
    title: 'Moderator Portal',
    desc: 'Community trust & safety queue, opportunity verification checks, report resolution, and compliance.',
    icon: <ShieldCheck className="w-5 h-5 text-orange-700 dark:text-orange-400" />
  },
  {
    role: 'trainer',
    title: 'Trainer Portal',
    desc: 'Publish technical courses, conduct live training bootcamps, and issue verified skill certificates.',
    icon: <BookOpen className="w-5 h-5 text-emerald-800 dark:text-emerald-300" />
  },
  {
    role: 'admin',
    title: 'Admin Portal',
    desc: 'Centralized operations, opportunity approval, user auditing, and ecosystem growth metrics.',
    icon: <UserCog className="w-5 h-5 text-slate-800 dark:text-slate-200" />
  },
  {
    role: 'super_admin',
    title: 'Super Admin Portal',
    desc: 'Full platform governance, security control, multi-role authorization, audit logs, and system settings.',
    icon: <Crown className="w-5 h-5 text-blue-900 dark:text-blue-300" />
  }
];

export const PortalsOverview: React.FC = () => {
  const { switchUserRole, setActiveView } = useApp();

  const handleLaunchPortal = (role: UserRole) => {
    switchUserRole(role);
    setActiveView('dashboard');
  };

  return (
    <section id="portals-overview-section" className="py-20 bg-slate-50/70 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold">
            <span>Unified Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            15 Dedicated Role Portals
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            One unified authentication engine with specialized role-based workspaces. Click any portal to experience its tailored environment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {ROLE_ITEMS.map((item, idx) => (
            <div
              key={item.role}
              id={`portal-card-${item.role}`}
              onClick={() => handleLaunchPortal(item.role)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs hover:shadow-md hover:border-blue-500/50 dark:hover:border-blue-500/50 transition cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-mono font-medium text-slate-400">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-3 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-blue-700 dark:text-blue-400">
                <span>Enter Portal</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortalsOverview;

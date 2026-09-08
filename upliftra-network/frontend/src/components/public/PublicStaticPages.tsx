import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Globe,
  Award,
  Users,
  Building2,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  HelpCircle,
  FileText
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setActiveView } = useApp();

  const coreTeam = [
    {
      name: 'Usman Ali Shah',
      role: 'Founder & Strategy Lead',
      description:
        'Founder of Upliftra Network. Leads its vision, strategy, technology direction, and overall development.',
      isFounder: true,
      tag: 'FOUNDER & STRATEGY LEAD',
      iconColor: 'from-[#0284C7] to-[#0044B2]'
    },
    {
      name: 'Anus Khalil',
      role: 'Tech and Partnership Lead',
      description:
        'Directs platform technical architecture, infrastructure engineering, and strategic industry & institutional partnerships.',
      isFounder: false,
      tag: 'TECH & PARTNERSHIP LEAD',
      iconColor: 'from-blue-600 to-indigo-600'
    },
    {
      name: 'Bisma',
      role: 'Operations & Research Lead',
      description:
        'Drives operational workflows, research initiatives, and strategic ecosystem planning.',
      isFounder: false,
      tag: 'OPERATIONS & RESEARCH',
      iconColor: 'from-sky-600 to-blue-700'
    },
    {
      name: 'Yusra Firdous',
      role: 'Community Engagement & Growth Lead',
      description:
        'Manages member engagement, campus growth initiatives, and nationwide community outreach.',
      isFounder: false,
      tag: 'COMMUNITY & GROWTH',
      iconColor: 'from-indigo-600 to-blue-800'
    },
    {
      name: 'Misbah Ferdous',
      role: 'Social Media Lead',
      description:
        'Spearheads social presence, digital awareness campaigns, and community storytelling.',
      isFounder: false,
      tag: 'SOCIAL MEDIA',
      iconColor: 'from-cyan-600 to-blue-600'
    }
  ];

  const corePillars = [
    {
      title: 'Verified Trust & Zero Scam',
      desc: 'Every job posting, scholarship listing, fellowship, and mentor credential is systematically vetted to maintain a scam-free ecosystem.',
      icon: <ShieldCheck className="w-5 h-5 text-[#0284C7] dark:text-[#38BDF8]" />
    },
    {
      title: 'AI-Powered Matchmaking',
      desc: 'Context-aware intelligence connects Pakistani talent with experienced mentors based on specific career goals and skill profiles.',
      icon: <Sparkles className="w-5 h-5 text-[#0077FF] dark:text-[#67E8F9]" />
    },
    {
      title: '1-on-1 Direct Mentorship',
      desc: 'Democratizing access to seasoned professionals across Silicon Valley, Europe, and leading Pakistani tech firms for actionable 1-on-1 guidance.',
      icon: <Users className="w-5 h-5 text-[#0044B2] dark:text-[#38BDF8]" />
    },
    {
      title: 'Pan-Pakistan & Global Reach',
      desc: 'Bridging tier-1 metropolises and secondary regional cities with top international scholarships, USD remote contracts, and graduate traineeships.',
      icon: <Globe className="w-5 h-5 text-[#0369A1] dark:text-[#67E8F9]" />
    }
  ];

  return (
    <div id="about-section" className="py-14 sm:py-20 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#0077FF] dark:bg-[#38BDF8] animate-pulse" />
            <span>About Upliftra Network</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Unifying Pakistan’s Career & Mentorship Ecosystem
          </h1>
          <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Upliftra Network is a Pakistan-focused career, professional development, mentorship, learning, and opportunity ecosystem designed to connect students, fresh graduates, working professionals, mentors, recruiters, companies, startups, universities, and public organizations in one verified, high-trust environment.
          </p>
        </div>

        {/* What We Do / Core Pillars Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Ecosystem Core Pillars
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Engineered with purpose to solve Pakistan’s career divide with clarity and transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {corePillars.map((p, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-[#0284C7] dark:hover:border-[#0077FF] transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/70 border border-blue-100 dark:border-blue-900/60 w-fit">
                    {p.icon}
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership & Core Team */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-2 border border-blue-200 dark:border-blue-800">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0077FF]" />
                <span>Platform Leadership</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                The Core Team Behind Upliftra
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                Committed leaders, technologists, and researchers dedicated to empowering Pakistan’s youth and talent landscape.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Founder Card - Featured Prominently with Upliftra Gradient */}
            <div className="md:col-span-2 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#002D72] via-[#0052CC] to-[#0284C7] text-white border border-blue-400/40 shadow-md relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-56 h-56 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {coreTeam[0].name}
                    </h3>
                    <span className="px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 text-white text-xs font-bold tracking-wider">
                      FOUNDER & STRATEGY LEAD
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-blue-50 leading-relaxed max-w-3xl font-normal">
                    {coreTeam[0].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Other Core Team Members */}
            {coreTeam.slice(1).map((member, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:border-[#0284C7] dark:hover:border-[#0077FF] transition-all shadow-xs"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                      {member.name}
                    </h3>
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-blue-100 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 shrink-0">
                      {member.tag}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-[#0052CC] dark:text-[#38BDF8]">
                    {member.role}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 15 Portals Architecture Callout */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white p-8 sm:p-10 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-900/60 border border-blue-700/60 text-cyan-300 text-xs font-semibold">
              <span>Comprehensive Stakeholder Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              15 Dedicated Role Workspaces
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Unlike generic job listings or fragmented forums, Upliftra Network delivers specialized portals with dynamic role-based access for: Students, Working Professionals, Mentors, Recruiters, Companies, Startups/Founders, Universities, Organizations, Volunteers, Campus Ambassadors, Strategic Partners, Content Moderators, Trainers, Admins, and Super Administrators.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => setActiveView('register')}
                className="px-5 py-2.5 bg-[#0077FF] hover:bg-[#0052CC] text-white font-bold text-xs rounded-xl transition shadow-xs"
              >
                Join Upliftra Network →
              </button>
              <button
                onClick={() => setActiveView('opportunities')}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition"
              >
                Explore Opportunities
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const VisionPage: React.FC = () => (
  <div className="py-16 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Our Long-Term Vision for Pakistan
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
          Positioning Pakistan as a top-tier global exporter of digital intellect, ethical technology leaders, and venture innovators.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-950 text-blue-600 rounded-xl">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">1. Elevating Academic Output</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              Transitioning university projects (FYPs) from theoretical grades into commercialized open-source repositories and incubated startups with funding readiness.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">2. Democratizing 1-on-1 Mentorship</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              Ensuring students from Peshawar, Quetta, Sukkur, and Multan have identical access to top Silicon Valley and European mentor networks as those in Lahore and Islamabad.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-3 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 rounded-xl">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">3. Building Remote Economic Resilience</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              Facilitating direct USD international remote employment and high-value foreign remittances through verified technical capability benchmarks.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const FAQPage: React.FC = () => {
  const faqs = [
    {
      q: 'Is Upliftra Network free for Pakistani students?',
      a: 'Yes, all core platform features including profile creation, AI mentor recommendations, job browsing, community discussions, and course enrollments are 100% free.'
    },
    {
      q: 'How does the AI Mentor Matching algorithm work?',
      a: 'Our Gemini-powered engine evaluates your declared technical skills, university background, GPA, career aspirations (e.g. Fulbright vs Remote SWE), and cross-references them against active mentors’ historical guidance domains to score alignment and supply contextual reasons.'
    },
    {
      q: 'Can companies and universities post opportunities?',
      a: 'Yes! Companies, recruiters, and university placement directors can create verified postings that appear instantly in the centralized Opportunities feed upon review.'
    },
    {
      q: 'How do I switch between the 15 role portals?',
      a: 'Click the "Portal: [Role]" badge in the top navigation bar or the "Switch Portal" button inside your dashboard to switch into any role workspace with 1 click.'
    }
  ];

  return (
    <div className="py-16 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Frequently Asked Questions</h1>
          <p className="text-xs sm:text-sm text-slate-500">Everything you need to know about Upliftra Network ecosystem</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">{faq.q}</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => (
  <div className="py-16 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Contact Upliftra Team</h1>
        <p className="text-xs sm:text-sm text-slate-500">We are here to support universities, recruiters, mentors, and students.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6 text-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-blue-600" />
            <div>
              <span className="text-xs text-slate-400 block">General Inquiries</span>
              <strong className="text-slate-900 dark:text-white">contact@upliftra.pk</strong>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-emerald-600" />
            <div>
              <span className="text-xs text-slate-400 block">University & Corporate Partnerships</span>
              <strong className="text-slate-900 dark:text-white">partnerships@upliftra.pk</strong>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-purple-600" />
            <div>
              <span className="text-xs text-slate-400 block">Headquarters</span>
              <strong className="text-slate-900 dark:text-white">Upliftra Network, Sector F-7, Islamabad, Pakistan</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const PrivacyPage: React.FC = () => (
  <div className="py-16 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Privacy Policy & Data Security</h1>
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <p>Upliftra Network is committed to protecting the privacy and personal data of Pakistani students, mentors, universities, and corporate recruiters.</p>
        <h3 className="font-bold text-slate-900 dark:text-white pt-2">1. Data Collected</h3>
        <p>We collect academic credentials, project links, resume information, and mentorship preference data solely to match you with opportunities and verified mentors.</p>
        <h3 className="font-bold text-slate-900 dark:text-white pt-2">2. AI Confidentiality</h3>
        <p>All AI-assisted matching calls made to Gemini are conducted server-side without releasing contact phone numbers or private communications.</p>
      </div>
    </div>
  </div>
);

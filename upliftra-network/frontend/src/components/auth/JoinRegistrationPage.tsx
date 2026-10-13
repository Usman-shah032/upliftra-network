import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { ROLE_CONFIG } from '../common/RoleBadge';
import UpliftraLogo from '../common/UpliftraLogo';
import {
  User,
  Mail,
  Lock,
  MapPin,
  Sparkles,
  Building,
  GraduationCap,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Compass
} from 'lucide-react';

interface JoinRegistrationPageProps {
  onNavigate?: (view: string) => void;
}

export const JoinRegistrationPage: React.FC<JoinRegistrationPageProps> = ({ onNavigate }) => {
  const { register, setActiveView } = useApp();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('Islamabad, Pakistan');
  const [role, setRole] = useState<UserRole>('student');
  const [headline, setHeadline] = useState('');
  const [organizationOrUniversity, setOrganizationOrUniversity] = useState('');
  const [skills, setSkills] = useState('');
  const [goals, setGoals] = useState('Career Growth & Mentorship');
  const [acceptedTerms, setAcceptedTerms] = useState(true);

  const roleCategories: { label: string; roles: UserRole[] }[] = [
    {
      label: 'Learning & Academics',
      roles: ['student', 'university', 'campus_ambassador', 'trainer']
    },
    {
      label: 'Professionals & Mentors',
      roles: ['professional', 'mentor', 'volunteer']
    },
    {
      label: 'Employers & Founders',
      roles: ['recruiter', 'company', 'startup', 'partner', 'organization']
    },
    {
      label: 'Platform Operations',
      roles: ['moderator', 'admin', 'super_admin']
    }
  ];

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    const skillsList = skills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    register({
      name: name || 'New Upliftra Member',
      email: email || 'member@upliftra.pk',
      role,
      headline: headline || `${ROLE_CONFIG[role]?.label} on Upliftra Network`,
      location: location || 'Pakistan',
      skills: skillsList.length > 0 ? skillsList : ['Career Development', 'Networking'],
      universityName: ['student', 'campus_ambassador', 'university'].includes(role)
        ? organizationOrUniversity
        : undefined,
      companyName: ['recruiter', 'company', 'startup', 'professional'].includes(role)
        ? organizationOrUniversity
        : undefined
    });

    if (onNavigate) {
      onNavigate('dashboard');
    } else {
      setActiveView('dashboard');
    }
  };

  const steps = [
    { num: 1, title: 'Create Account', desc: 'Personal details' },
    { num: 2, title: 'Choose Role', desc: 'Stakeholder persona' },
    { num: 3, title: 'Build Profile', desc: 'Skills & ambitions' },
    { num: 4, title: 'Start Journey', desc: 'Confirmation' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center mb-2">
            <button
              onClick={() => setActiveView('home')}
              className="inline-block transition-transform hover:scale-105"
            >
              <UpliftraLogo size="lg" />
            </button>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Join Upliftra Network
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Become part of Pakistan’s unified ecosystem for professional advancement, verified opportunities, and 1-on-1 mentorship.
          </p>
        </div>

        {/* Step Progression Bar */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
          <div className="grid grid-cols-4 gap-2">
            {steps.map((s) => {
              const isDone = currentStep > s.num;
              const isCurrent = currentStep === s.num;

              return (
                <div
                  key={s.num}
                  onClick={() => {
                    if (s.num < currentStep) setCurrentStep(s.num as any);
                  }}
                  className={`text-center py-2 px-1 rounded-lg transition ${
                    isCurrent
                      ? 'bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-semibold'
                      : isDone
                      ? 'text-slate-700 dark:text-slate-300 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800'
                      : 'text-slate-400 dark:text-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1.5 text-xs">
                    {isDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <span className="w-4 h-4 rounded-full border text-[10px] flex items-center justify-center font-mono">
                        {s.num}
                      </span>
                    )}
                    <span className="hidden sm:inline font-medium">{s.title}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 shadow-xs">
          <form onSubmit={handleFinish} className="space-y-6">
            {/* STEP 1: CREATE YOUR ACCOUNT */}
            {currentStep === 1 && (
              <div className="space-y-5">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Step 1: Create Your Account
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Enter your essential credentials to establish your verified account.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Bilal Ahmed"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                      <input
                        type="email"
                        required
                        placeholder="bilal@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Password *
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                      <input
                        type="password"
                        required
                        placeholder="••••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      City & Country *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Islamabad, Pakistan"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      if (!name.trim()) setName('New Upliftra Member');
                      if (!email.trim()) setEmail('member@upliftra.pk');
                      setCurrentStep(2);
                    }}
                    className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg text-sm transition flex items-center gap-2 shadow-xs"
                  >
                    <span>Next: Choose Your Role</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: CHOOSE YOUR ROLE */}
            {currentStep === 2 && (
              <div className="space-y-5">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Step 2: Choose Your Stakeholder Role
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Select which of the 15 dedicated portals best matches your participation.
                  </p>
                </div>

                <div className="space-y-4">
                  {roleCategories.map((cat, catIdx) => (
                    <div key={catIdx} className="space-y-2">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {cat.label}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {cat.roles.map((r) => {
                          const config = ROLE_CONFIG[r];
                          const isSelected = role === r;

                          return (
                            <div
                              key={r}
                              onClick={() => setRole(r)}
                              className={`p-3 rounded-lg border text-left cursor-pointer transition flex items-start gap-3 ${
                                isSelected
                                  ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200'
                                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-850 text-slate-800 dark:text-slate-200'
                              }`}
                            >
                              <div
                                className={`w-4 h-4 rounded-full border mt-0.5 shrink-0 flex items-center justify-center ${
                                  isSelected
                                    ? 'border-blue-600 bg-blue-600'
                                    : 'border-slate-300 dark:border-slate-600'
                                }`}
                              >
                                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-bold">{config?.label || r}</div>
                                <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                                  {config?.desc || 'Portal Access'}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg text-sm transition flex items-center gap-2 shadow-xs"
                  >
                    <span>Next: Build Your Profile</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: BUILD YOUR PROFILE */}
            {currentStep === 3 && (
              <div className="space-y-5">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Step 3: Build Your Profile
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Highlight your current affiliation, professional headline, and skills.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Professional Headline / Current Focus
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. BS Software Engineering Student @ NUST | Aspiring Backend Developer"
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      University, Company, or Organization Name
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                      <input
                        type="text"
                        placeholder="e.g. NUST, Systems Limited, Careem, FAST-NUCES, or GIKI"
                        value={organizationOrUniversity}
                        onChange={(e) => setOrganizationOrUniversity(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Key Skills & Areas of Interest (comma separated)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Python, React, AI, Product Management, Scholarships, Cloud Architecture"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Primary Ecosystem Goal
                    </label>
                    <select
                      value={goals}
                      onChange={(e) => setGoals(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                    >
                      <option value="Find Tech Job or Internship">Find Tech Job or Graduate Internship</option>
                      <option value="Secure International Scholarship (Fulbright/Chevening)">Secure International Scholarship (Fulbright/Chevening)</option>
                      <option value="1-on-1 Career Mentorship">1-on-1 Career Mentorship & Resume Review</option>
                      <option value="Hire Top Pakistani Tech Talent">Hire Top Pakistani Tech Talent</option>
                      <option value="Find Startup Co-founders & Funding">Find Startup Co-founders & Incubator Funding</option>
                      <option value="Host Campus Hackathons & Workshops">Host Campus Hackathons & Workshops</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg text-sm transition flex items-center gap-2 shadow-xs"
                  >
                    <span>Next: Start Your Upliftra Journey</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: START YOUR UPLIFTRA JOURNEY */}
            {currentStep === 4 && (
              <div className="space-y-5">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Step 4: Start Your Upliftra Journey
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Review your account summary and finalize your onboarding.
                  </p>
                </div>

                {/* Account Summary Card */}
                <div className="bg-slate-50 dark:bg-slate-850 rounded-xl p-5 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800 pb-3">
                    <div>
                      <div className="font-bold text-sm text-slate-900 dark:text-white">
                        {name || 'New Upliftra Member'}
                      </div>
                      <div className="text-xs text-slate-500">{email || 'member@upliftra.pk'}</div>
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      {ROLE_CONFIG[role]?.label || role}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block">Location</span>
                      <span className="font-medium text-slate-700 dark:text-slate-300">{location}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Affiliation</span>
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        {organizationOrUniversity || 'Independent'}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 text-xs">
                    <span className="text-slate-400 block">Primary Goal</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">{goals}</span>
                  </div>
                </div>

                {/* Terms Agreement */}
                <label className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>
                    I agree to Upliftra Network’s Code of Professional Conduct, verified opportunities policy, and terms of service.
                  </span>
                </label>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                  <button
                    type="submit"
                    disabled={!acceptedTerms}
                    className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white font-bold rounded-lg text-sm transition flex items-center gap-2 shadow-xs"
                  >
                    <span>Complete Registration</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* Switch to Login */}
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
            <span>Already have an account? </span>
            <button
              onClick={() => {
                if (onNavigate) onNavigate('login');
                else setActiveView('login' as any);
              }}
              className="font-semibold text-blue-700 dark:text-blue-400 hover:underline"
            >
              Sign In to Upliftra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinRegistrationPage;

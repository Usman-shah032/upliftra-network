import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { ROLE_CONFIG } from '../common/RoleBadge';
import UpliftraLogo from '../common/UpliftraLogo';
import { Lock, Mail, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';

interface LoginPageProps {
  onNavigate?: (view: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { login, switchUserRole, setActiveView } = useApp();

  const [email, setEmail] = useState('student@upliftra.pk');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState<UserRole>('student');
  const [rememberMe, setRememberMe] = useState(true);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, role);
    if (onNavigate) {
      onNavigate('dashboard');
    } else {
      setActiveView('dashboard');
    }
  };

  const handleQuickRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    switchUserRole(selectedRole);
    if (onNavigate) {
      onNavigate('dashboard');
    } else {
      setActiveView('dashboard');
    }
  };

  const sampleRoles: { role: UserRole; title: string }[] = [
    { role: 'student', title: 'Student Portal' },
    { role: 'professional', title: 'Professional Portal' },
    { role: 'mentor', title: 'Mentor Portal' },
    { role: 'recruiter', title: 'Recruiter Portal' },
    { role: 'company', title: 'Company Portal' },
    { role: 'startup', title: 'Startup Portal' },
    { role: 'university', title: 'University Portal' },
    { role: 'admin', title: 'Admin Portal' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto space-y-8">
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
            Sign In to Ecosystem
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Access your verified portal, mentorship requests, and opportunity pipeline.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.name@example.com"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setForgotEmail(email);
                    setForgotSuccess(false);
                    setIsForgotPasswordOpen(true);
                  }}
                  className="text-xs text-blue-700 dark:text-blue-400 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Portal Role Selection
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
              >
                {Object.keys(ROLE_CONFIG).map((r) => (
                  <option key={r} value={r}>
                    {ROLE_CONFIG[r as UserRole]?.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Remember this device</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg text-sm transition flex items-center justify-center gap-2 shadow-xs mt-2"
            >
              <span>Sign In to Upliftra</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Instant Role Switcher for Testing */}
          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Instant Test Drive Portals:</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {sampleRoles.map((sr) => (
                <button
                  key={sr.role}
                  onClick={() => handleQuickRoleSelect(sr.role)}
                  className="p-1.5 text-left rounded-md bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-300 transition text-[11px]"
                >
                  {sr.title}
                </button>
              ))}
            </div>
          </div>

          {/* Switch to Register */}
          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
            <span>Don’t have an Upliftra account? </span>
            <button
              onClick={() => {
                if (onNavigate) onNavigate('register');
                else setActiveView('register' as any);
              }}
              className="font-semibold text-blue-700 dark:text-blue-400 hover:underline"
            >
              Join Upliftra Network
            </button>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {isForgotPasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Reset Account Password
              </h3>
              <button
                onClick={() => setIsForgotPasswordOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            {forgotSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-center space-y-2">
                <div className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                  ✓ Reset Link Dispatched!
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Password reset instructions and a secure one-time token have been dispatched to <strong>{forgotEmail}</strong>.
                </p>
                <button
                  onClick={() => setIsForgotPasswordOpen(false)}
                  className="mt-2 px-4 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold text-xs"
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!forgotEmail.trim()) return;
                  setForgotSuccess(true);
                }}
                className="space-y-4 text-xs sm:text-sm"
              >
                <p className="text-xs text-slate-500">
                  Enter your registered Upliftra email address and we'll send you a secure verification link to recover your account.
                </p>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                    Registered Email
                  </label>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="name@organization.pk"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsForgotPasswordOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    Send Recovery Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;

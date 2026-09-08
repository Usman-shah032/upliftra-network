import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { ROLE_CONFIG, RoleBadge } from './RoleBadge';
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
  X,
  Check
} from 'lucide-react';

interface PortalSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ROLE_ICONS: Record<UserRole, React.ReactNode> = {
  student: <GraduationCap className="w-5 h-5 text-blue-600" />,
  professional: <Briefcase className="w-5 h-5 text-indigo-600" />,
  mentor: <UserCheck className="w-5 h-5 text-emerald-600" />,
  recruiter: <Search className="w-5 h-5 text-purple-600" />,
  company: <Building2 className="w-5 h-5 text-slate-600" />,
  startup: <Rocket className="w-5 h-5 text-amber-600" />,
  university: <School className="w-5 h-5 text-sky-600" />,
  organization: <Landmark className="w-5 h-5 text-teal-600" />,
  volunteer: <HeartHandshake className="w-5 h-5 text-rose-600" />,
  campus_ambassador: <Award className="w-5 h-5 text-cyan-600" />,
  partner: <Globe2 className="w-5 h-5 text-violet-600" />,
  moderator: <ShieldCheck className="w-5 h-5 text-orange-600" />,
  trainer: <BookOpen className="w-5 h-5 text-lime-600" />,
  admin: <UserCog className="w-5 h-5 text-zinc-700" />,
  super_admin: <Crown className="w-5 h-5 text-blue-800" />
};

export const PortalSwitcherModal: React.FC<PortalSwitcherModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, switchUserRole, setActiveView } = useApp();

  if (!isOpen) return null;

  const roles: UserRole[] = [
    'student',
    'professional',
    'mentor',
    'recruiter',
    'company',
    'startup',
    'university',
    'organization',
    'volunteer',
    'campus_ambassador',
    'partner',
    'moderator',
    'trainer',
    'admin',
    'super_admin'
  ];

  const handleSelectRole = (role: UserRole) => {
    switchUserRole(role);
    setActiveView('dashboard');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        id="portal-switcher-modal"
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-blue-950/5 to-slate-900/5">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                15 Unified Role Portals Explorer
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
                1-Click Switcher
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Select any of the 15 centralized ecosystem portals to experience its tailored dashboard, permission matrix, and workflows.
            </p>
          </div>
          <button
            id="btn-close-portal-switcher"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Roles Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {roles.map((role) => {
            const config = ROLE_CONFIG[role];
            const isCurrent = (currentUser?.role || 'student') === role;

            return (
              <button
                key={role}
                id={`btn-select-role-${role}`}
                onClick={() => handleSelectRole(role)}
                className={`p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  isCurrent
                    ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 shadow-sm ring-2 ring-blue-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xs">
                      {ROLE_ICONS[role]}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
                        {config.label}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {config.desc}
                      </p>
                    </div>
                  </div>
                  {isCurrent && (
                    <span className="h-5 w-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>Portal #{roles.indexOf(role) + 1}</span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">
                    {isCurrent ? 'Active Portal' : 'Switch →'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex items-center justify-between text-xs text-slate-500">
          <span>Active Identity: <strong className="text-slate-800 dark:text-slate-200">{currentUser?.name || 'Guest / Visitor'}</strong> ({currentUser?.email || 'unauthenticated'})</span>
          <button
            id="btn-done-role-switch"
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
          >
            Close Explorer
          </button>
        </div>
      </div>
    </div>
  );
};

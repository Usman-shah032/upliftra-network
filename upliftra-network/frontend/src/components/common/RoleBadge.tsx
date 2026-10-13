import React from 'react';
import { UserRole } from '../../types';

interface RoleBadgeProps {
  role: UserRole;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const ROLE_CONFIG: Record<
  UserRole,
  { label: string; bg: string; text: string; border: string; desc: string }
> = {
  student: {
    label: 'Student',
    bg: 'bg-blue-50 dark:bg-blue-950/50',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-800',
    desc: 'Learner & Opportunity Seeker'
  },
  professional: {
    label: 'Professional',
    bg: 'bg-indigo-50 dark:bg-indigo-950/50',
    text: 'text-indigo-700 dark:text-indigo-300',
    border: 'border-indigo-200 dark:border-indigo-800',
    desc: 'Working Industry Expert'
  },
  mentor: {
    label: 'Mentor',
    bg: 'bg-emerald-50 dark:bg-emerald-950/50',
    text: 'text-emerald-700 dark:text-emerald-300',
    border: 'border-emerald-200 dark:border-emerald-800',
    desc: 'Career & Tech Advisor'
  },
  recruiter: {
    label: 'Recruiter',
    bg: 'bg-purple-50 dark:bg-purple-950/50',
    text: 'text-purple-700 dark:text-purple-300',
    border: 'border-purple-200 dark:border-purple-800',
    desc: 'Talent Acquisition'
  },
  company: {
    label: 'Company',
    bg: 'bg-slate-100 dark:bg-slate-800',
    text: 'text-slate-800 dark:text-slate-200',
    border: 'border-slate-300 dark:border-slate-700',
    desc: 'Hiring Enterprise / Org'
  },
  startup: {
    label: 'Startup / Founder',
    bg: 'bg-amber-50 dark:bg-amber-950/50',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-800',
    desc: 'Innovator & Venture Builder'
  },
  university: {
    label: 'University',
    bg: 'bg-sky-50 dark:bg-sky-950/50',
    text: 'text-sky-700 dark:text-sky-300',
    border: 'border-sky-200 dark:border-sky-800',
    desc: 'Higher Ed Institution'
  },
  organization: {
    label: 'Organization / NGO',
    bg: 'bg-teal-50 dark:bg-teal-950/50',
    text: 'text-teal-700 dark:text-teal-300',
    border: 'border-teal-200 dark:border-teal-800',
    desc: 'Public / Development Body'
  },
  volunteer: {
    label: 'Volunteer',
    bg: 'bg-rose-50 dark:bg-rose-950/50',
    text: 'text-rose-700 dark:text-rose-300',
    border: 'border-rose-200 dark:border-rose-800',
    desc: 'Community Contributor'
  },
  campus_ambassador: {
    label: 'Campus Ambassador',
    bg: 'bg-cyan-50 dark:bg-cyan-950/50',
    text: 'text-cyan-700 dark:text-cyan-300',
    border: 'border-cyan-200 dark:border-cyan-800',
    desc: 'University Student Lead'
  },
  partner: {
    label: 'Partner',
    bg: 'bg-violet-50 dark:bg-violet-950/50',
    text: 'text-violet-700 dark:text-violet-300',
    border: 'border-violet-200 dark:border-violet-800',
    desc: 'Strategic Ecosystem Partner'
  },
  moderator: {
    label: 'Moderator',
    bg: 'bg-orange-50 dark:bg-orange-950/50',
    text: 'text-orange-700 dark:text-orange-300',
    border: 'border-orange-200 dark:border-orange-800',
    desc: 'Quality & Trust Guardian'
  },
  trainer: {
    label: 'Trainer',
    bg: 'bg-lime-50 dark:bg-lime-950/50',
    text: 'text-lime-700 dark:text-lime-300',
    border: 'border-lime-200 dark:border-lime-800',
    desc: 'Course & Workshop Instructor'
  },
  admin: {
    label: 'Admin',
    bg: 'bg-zinc-100 dark:bg-zinc-800',
    text: 'text-zinc-900 dark:text-zinc-100',
    border: 'border-zinc-300 dark:border-zinc-700',
    desc: 'Platform Manager'
  },
  super_admin: {
    label: 'Super Admin',
    bg: 'bg-blue-900 text-white dark:bg-blue-800',
    text: 'text-white',
    border: 'border-blue-700',
    desc: 'Full Platform Authority'
  }
};

export const RoleBadge: React.FC<RoleBadgeProps> = ({ role, size = 'md' }) => {
  const config = ROLE_CONFIG[role] || ROLE_CONFIG.student;

  const sizeClasses = {
    xs: 'text-[10px] px-1.5 py-0.5 leading-none',
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs font-semibold px-2.5 py-1',
    lg: 'text-sm font-semibold px-3 py-1.5'
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border font-medium whitespace-nowrap transition-colors ${config.bg} ${config.text} ${config.border} ${sizeClasses[size]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {config.label}
    </span>
  );
};

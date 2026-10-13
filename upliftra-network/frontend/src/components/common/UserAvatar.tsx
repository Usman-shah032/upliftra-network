import React, { useState } from 'react';
import { UserRole } from '../../types';

interface UserAvatarProps {
  name?: string;
  avatar?: string;
  role?: UserRole;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function getInitials(name?: string): string {
  if (!name || !name.trim()) return 'U';
  const clean = name.replace(/^(Dr\.|Mr\.|Ms\.|Mrs\.|Prof\.)\s+/i, '').trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'U';
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const ROLE_GRADIENTS: Record<string, string> = {
  student: 'from-blue-600 to-cyan-600',
  professional: 'from-slate-700 to-slate-900',
  mentor: 'from-purple-600 to-indigo-600',
  recruiter: 'from-emerald-600 to-teal-700',
  company: 'from-blue-700 to-slate-900',
  startup: 'from-amber-500 to-orange-600',
  university: 'from-indigo-600 to-blue-800',
  organization: 'from-teal-600 to-cyan-700',
  volunteer: 'from-rose-500 to-pink-600',
  campus_ambassador: 'from-yellow-500 to-amber-600',
  partner: 'from-violet-600 to-purple-800',
  moderator: 'from-orange-600 to-red-700',
  trainer: 'from-teal-500 to-emerald-700',
  admin: 'from-red-600 to-rose-800',
  super_admin: 'from-purple-700 to-rose-700'
};

const SIZE_MAP = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm font-semibold',
  lg: 'w-12 h-12 text-base font-bold',
  xl: 'w-16 h-16 text-xl font-bold'
};

export const UserAvatar: React.FC<UserAvatarProps> = ({
  name = 'User',
  avatar,
  role = 'student',
  size = 'md',
  className = ''
}) => {
  const [hasError, setHasError] = useState(false);
  const initials = getInitials(name);
  const sizeClasses = SIZE_MAP[size] || SIZE_MAP.md;
  const gradient = ROLE_GRADIENTS[role] || 'from-blue-600 to-indigo-600';

  if (avatar && !hasError) {
    return (
      <img
        src={avatar}
        alt={name}
        onError={() => setHasError(true)}
        className={`${sizeClasses} rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-2xs shrink-0 ${className}`}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses} rounded-full bg-gradient-to-tr ${gradient} text-white flex items-center justify-center font-bold tracking-tight shadow-2xs border border-white/20 shrink-0 select-none ${className}`}
      title={name}
    >
      <span>{initials}</span>
    </div>
  );
};

export default UserAvatar;

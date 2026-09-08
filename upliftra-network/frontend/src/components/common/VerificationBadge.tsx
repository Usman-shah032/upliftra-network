import React from 'react';
import { CheckCircle, ShieldCheck } from 'lucide-react';

interface VerificationBadgeProps {
  type?: 'check' | 'shield';
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  type = 'check',
  label = 'Verified by Upliftra',
  size = 'md',
  className = ''
}) => {
  const isSm = size === 'sm';

  return (
    <span
      id={`badge-verification-${size}`}
      className={`inline-flex items-center gap-1 font-medium text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200 dark:border-blue-800/80 rounded-full whitespace-nowrap ${
        isSm ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
      } ${className}`}
      title={label}
    >
      {type === 'shield' ? (
        <ShieldCheck className={isSm ? 'w-3 h-3 text-blue-600 dark:text-blue-400' : 'w-3.5 h-3.5 text-blue-600 dark:text-blue-400'} />
      ) : (
        <CheckCircle className={isSm ? 'w-3 h-3 text-blue-600 dark:text-blue-400' : 'w-3.5 h-3.5 text-blue-600 dark:text-blue-400'} />
      )}
      <span>{label}</span>
    </span>
  );
};

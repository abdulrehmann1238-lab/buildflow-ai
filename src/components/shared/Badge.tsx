import React from 'react';
import { getStatusBadgeClasses } from '../../utils/formatters';

interface BadgeProps {
  label: string;
  size?: 'sm' | 'md';
  showDot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ label, size = 'sm', showDot = true }) => {
  const classes = getStatusBadgeClasses(label);

  const sizeClasses = size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-xs';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium border ${sizeClasses} ${classes.bg} ${classes.text} ${classes.border}`}>
      {showDot && <span className={`w-1.5 h-1.5 rounded-full ${classes.dot}`} />}
      {label}
    </span>
  );
};

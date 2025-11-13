import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary' }) => {
  const classes = variant === 'primary'
    ? 'bg-amber-custom text-white'
    : 'bg-amber-100 text-amber-custom';

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${classes}`}>
      {children}
    </span>
  );
};

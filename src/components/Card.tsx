import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'highlight';
}

export const Card: React.FC<CardProps> = ({ children, className = '', variant = 'default' }) => {
  const baseClasses = 'rounded-lg p-6 shadow-md transition-shadow hover:shadow-lg';
  const variantClasses = variant === 'highlight'
    ? 'bg-amber-50 border border-amber-custom/20'
    : 'bg-white';

  return (
    <div className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </div>
  );
};

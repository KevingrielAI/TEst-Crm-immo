import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: 'cream' | 'white';
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  id,
  background = 'cream'
}) => {
  const bgClass = background === 'white' ? 'bg-white' : 'bg-cream';

  return (
    <section id={id} className={`py-16 px-4 md:px-8 ${bgClass} ${className}`}>
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  );
};

import React, { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
}

export const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left flex justify-between items-center gap-4 group"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-slate-custom group-hover:text-amber-custom transition-colors">
          {question}
        </span>
        <span
          className={`text-2xl text-amber-custom transition-transform ${
            isOpen ? 'rotate-45' : ''
          }`}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      {isOpen && (
        <div className="mt-3 text-gray-700 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

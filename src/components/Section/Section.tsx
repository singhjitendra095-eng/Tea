import React from 'react';

export interface SectionProps {
  /** Optional section title */
  title?: string;
  /** Section content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Background variant */
  background?: 'light' | 'dark' | 'none';
  /** Optional ID for anchor linking */
  id?: string;
}

/**
 * Section wrapper component
 * Provides consistent spacing and layout for homepage sections
 */
export function Section({
  title,
  children,
  className = '',
  background = 'light',
  id,
}: SectionProps) {
  const bgClasses = {
    light: 'bg-tea-50',
    dark: 'bg-charcoal-900 text-white',
    none: 'bg-transparent',
  };

  return (
    <section
      id={id}
      className={`py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-16 ${bgClasses[background]} ${className}`}
    >
      {title && (
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-center">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
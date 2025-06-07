// 創建文件：client/src/components/common/AnimatedSection.jsx
import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export function AnimatedSection({
  children,
  className = '',
  animation = 'animate-slide-up',
  delay = 0
}) {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? animation : 'opacity-0'}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function FadeInSection({ children, className = '', delay = 0 }) {
  return (
    <AnimatedSection
      className={className}
      animation="animate-fade-in"
      delay={delay}
    >
      {children}
    </AnimatedSection>
  );
}

export function SlideUpSection({ children, className = '', delay = 0 }) {
  return (
    <AnimatedSection
      className={className}
      animation="animate-slide-up"
      delay={delay}
    >
      {children}
    </AnimatedSection>
  );
}

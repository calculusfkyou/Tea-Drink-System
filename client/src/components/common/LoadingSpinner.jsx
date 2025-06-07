// 創建文件：client/src/components/common/LoadingSpinner.jsx
import React from 'react';

export function LoadingSpinner({ size = 'medium', color = 'primary' }) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  const colorClasses = {
    primary: 'border-[#5a6440]',
    white: 'border-white',
    gray: 'border-gray-400'
  };

  return (
    <div className={`animate-spin rounded-full border-2 border-t-transparent ${sizeClasses[size]} ${colorClasses[color]}`} />
  );
}

export function LoadingDots() {
  return (
    <div className="loading-dots">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export function PulseLoader() {
  return (
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-[#5a6440] rounded-full animate-pulse"></div>
      <div className="w-2 h-2 bg-[#5a6440] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-2 h-2 bg-[#5a6440] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
    </div>
  );
}

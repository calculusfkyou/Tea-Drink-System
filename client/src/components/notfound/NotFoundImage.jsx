import React from 'react';

export function NotFoundImage() {
  return (
    <div className="flex justify-center mb-8">
      <div className="relative w-64 h-64">
        <div className="absolute inset-0 bg-[#5a6440] opacity-10 rounded-full"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[#5a6440] text-9xl font-bold">404</span>
        </div>
      </div>
    </div>
  );
}

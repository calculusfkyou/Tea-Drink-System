import React from 'react';

export function AuthHeader({ title, subtitle }) {
  return (
    <div className="bg-gray-50 py-12 mb-5">
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-[#5a6440]">{title}</h1>
        <p className="text-xl text-gray-500 mt-2">{subtitle}</p>
      </div>
    </div>
  );
}

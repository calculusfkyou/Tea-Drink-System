import React from 'react';

export function SectionTitle({ title, subtitle }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl font-semibold text-[#5a6440] mb-1">{title}</h2>
      {subtitle && <p className="text-lg font-serif text-gray-500 tracking-widest">{subtitle}</p>}
      <div className="w-24 h-1 bg-[#5a6440] mx-auto mt-3"></div>
      {/* <div className="flex justify-center mt-2">
        {[...Array(4)].map((_, i) => (
          <span key={i} className="inline-block w-1.5 h-1.5 bg-gray-500 rounded-full mx-1"></span>
        ))}
      </div> */}
    </div>
  );
}

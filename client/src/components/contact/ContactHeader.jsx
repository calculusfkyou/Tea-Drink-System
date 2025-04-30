import React from 'react';

export default function ContactHeader() {
  const titleColor = 'text-gray-800';
  const subtitleColor = 'text-gray-500';

  return (
    <div className="bg-gray-50 py-16 mb-8">
      <div className="text-center">
        <h1 className={`text-4xl font-semibold ${titleColor}`}>聯絡我們</h1>
        <p className={`text-xl font-serif tracking-wider mt-2 ${subtitleColor}`}>CONTACT US</p>
      </div>
    </div>
  );
}

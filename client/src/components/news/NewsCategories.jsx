import React from 'react';

export function NewsCategories({ categories, activeCategory, onChange }) {
  return (
    <div className="flex space-x-1 mb-8 border-b overflow-x-auto">
      {categories.map((category) => (
        <button
          key={category}
          className={`py-3 px-5 text-sm font-medium transition-colors relative whitespace-nowrap
            ${activeCategory === category
              ? 'text-[#5a6440] font-medium'
              : 'text-gray-500 hover:text-gray-800'
            }`}
          onClick={() => onChange(category)}
        >
          {category}
          {activeCategory === category && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#5a6440]"></span>
          )}
        </button>
      ))}
    </div>
  );
}

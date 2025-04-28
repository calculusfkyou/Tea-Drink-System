import React from 'react';

export function RegionTabs({ regions, activeRegion, onChange }) {
  return (
    <div className="flex overflow-x-auto pb-2 mb-8">
      <div className="flex space-x-1 border-b w-full">
        {regions.map(region => (
          <button
            key={region}
            onClick={() => onChange(region)}
            className={`py-3 px-5 text-sm font-medium whitespace-nowrap relative
              ${activeRegion === region ? 'text-[#5a6440]' : 'text-gray-500 hover:text-gray-800'}
            `}
          >
            {region}
            {activeRegion === region && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#5a6440]"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

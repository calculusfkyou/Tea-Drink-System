import React from 'react';

export function NewsNotFound({ onBack }) {
  return (
    <div className="text-center py-12">
      <p className="text-xl text-gray-500 mb-4">找不到此新聞</p>
      <button
        onClick={onBack}
        className="px-4 py-2 bg-[#5a6440] text-white rounded hover:bg-opacity-90"
      >
        返回新聞列表
      </button>
    </div>
  );
}

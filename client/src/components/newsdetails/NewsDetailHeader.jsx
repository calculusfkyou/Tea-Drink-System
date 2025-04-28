import React from 'react';

export function NewsDetailHeader({ title, date, category, onBack }) {
  return (
    <>
      {/* 返回按鈕 */}
      <button
        onClick={onBack}
        className="mb-6 flex items-center text-[#5a6440] hover:underline"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        返回最新消息
      </button>

      {/* 標題 */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>

      {/* 日期和分類 */}
      <div className="flex items-center mb-6 text-sm">
        <span className="text-gray-500">{date}</span>
        {category && (
          <>
            <span className="mx-2 text-gray-400">|</span>
            <span className="text-[#5a6440]">{category}</span>
          </>
        )}
      </div>
    </>
  );
}

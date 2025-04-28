import React from 'react';

export function StoreDetailHeader({ name, image, onBack }) {
  return (
    <div className="mb-8">
      {/* 返回按鈕 */}
      <button
        onClick={onBack}
        className="mb-6 flex items-center text-[#5a6440] hover:underline"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        返回門市列表
      </button>

      {/* 門市主圖 */}
      <div className="rounded-lg overflow-hidden mb-6">
        <img
          src={image}
          alt={name}
          className="w-full h-auto"
        />
      </div>

      {/* 門市名稱 */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">拾玖茶屋 {name}</h1>
    </div>
  );
}

import React from 'react';

export function DrinkCard({ name, image, description, price }) {
  return (
    <div className="text-center bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition-shadow flex flex-col">
      {/* 1. 建立固定高度的圖片容器 */}
      <div className="w-full h-48 flex items-center justify-center mb-4 overflow-hidden flex-shrink-0">
        {/* 2. 讓圖片縮放以符合容器，並保持比例 */}
        <img
          src={image}
          alt={name}
          className="max-h-full max-w-full object-contain" // 確保圖片完整顯示且不超出容器
          loading="lazy" // 圖片懶加載
        />
      </div>
      <div className="flex-grow flex flex-col justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-1">{name}</h4>
          {price && <p className="text-sm font-medium text-red-600 mb-2">{price}</p>}
        </div>
        {description && <p className="text-xs text-gray-500 mt-1">{description}</p>} {/* 微調 description 的上間距 */}
      </div>
    </div>
  );
}

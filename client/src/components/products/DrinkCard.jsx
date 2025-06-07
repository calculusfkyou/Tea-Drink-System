import React, { useState } from 'react';

export function DrinkCard({ id, name, image, description, price, onClick }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className="group text-center bg-white border border-gray-200 rounded-xl p-6 shadow-sm
               hover:shadow-xl transition-all duration-500 ease-out cursor-pointer
               transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden"
      onClick={() => onClick(id)}
    >
      {/* 背景光效 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#5a6440]/5 to-transparent
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* 圖片容器 */}
      <div className="relative w-full h-48 flex items-center justify-center mb-4 overflow-hidden rounded-lg">
        {!isLoaded && (
          <div className="absolute inset-0 shimmer rounded-lg" />
        )}
        <img
          src={image}
          alt={name}
          className={`max-h-full max-w-full object-contain transition-all duration-700 ease-out
                     group-hover:scale-110 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
        />

        {/* 價格標籤 */}
        <div className="absolute top-2 right-2 bg-[#5a6440] text-white px-2 py-1 rounded-full
                      text-xs font-semibold transform translate-x-8 group-hover:translate-x-0
                      transition-transform duration-300">
          ${price}
        </div>
      </div>

      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-[#5a6440]
                     transition-colors duration-300">
          {name}
        </h3>

        {description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 group-hover:text-gray-800
                      transition-colors duration-300">
            {description}
          </p>
        )}

        {/* 查看詳情按鈕 */}
        <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0
                      group-hover:opacity-100 transition-all duration-300 delay-100">
          <span className="inline-flex items-center text-[#5a6440] font-medium text-sm">
            查看詳情
            <svg className="ml-1 w-4 h-4 transform transition-transform duration-300
                          group-hover:translate-x-1"
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

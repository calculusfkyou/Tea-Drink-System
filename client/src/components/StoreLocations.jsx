import React from 'react';

export function StoreLocations() {
  const bgColor = 'bg-[#f8f6f1]';
  const textColor = 'text-[#5a6440]';
  const titleColor = 'text-[#8c8273]';

  return (
    <section className={`flex flex-col md:flex-row w-full ${bgColor}`}>
      {/* 左側圖片區 */}
      <div className="md:w-1/2 w-full min-h-[300px] md:min-h-[400px] bg-cover bg-center" style={{ backgroundImage: "url('/assets/StoreLocation.webp')" }}>
      </div>

      {/* 右側內容區 */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-8 md:p-12 lg:p-16"> {/* Added items-center */}
        {/* Flex container for text and image */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 w-full"> {/* Use flex-row on large screens, add gap */}

          {/* Text content group */}
          <div className="flex-grow"> {/* Allow text to take available space */}
            <h2 className={`text-4xl font-serif ${titleColor} tracking-widest mb-1`}>OUR STORES</h2>
            <h3 className={`text-3xl font-semibold ${textColor} mb-4`}>門市據點</h3>
            <p className={`${textColor} text-base leading-relaxed mb-2`}>
              茶即是生活態度。
            </p>
            <p className={`${textColor} text-base leading-relaxed mb-6`}>
              我們相信每一杯茶代表的都是一段情感、一個回憶。
            </p>
            {/* READ MORE 按鈕 */}
            <div className="mt-4">
              <a
                href="/locations" // 連結到門市據點頁面
                // 更新 className 以匹配 RecentNews 的樣式
                className="inline-flex items-center px-6 py-2 border border-yellow-600 text-yellow-700 rounded-full text-sm font-medium hover:bg-yellow-50 transition-colors"
              >
                READ MORE
                {/* 箭頭 SVG - 更新顏色以匹配按鈕文字 */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 text-yellow-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Image group */}
          <div className="flex-shrink-0 mt-8 lg:mt-0 opacity-50 hidden lg:block"> {/* Keep hidden on smaller screens, remove top margin on larger screens */}
             <img src="/assets/Nknu_logo.png" alt="NK" className="w-32 md:w-40 lg:w-48 h-auto" /> {/* Adjust size as needed, removed ml-auto */}
          </div>

        </div>
      </div>
    </section>
  );
}

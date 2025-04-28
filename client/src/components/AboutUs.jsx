import React from 'react';

export function AboutUs() {
  // 定義顏色變數，可以根據您的主題調整
  const bgColor = 'bg-white'; // 背景色
  const textColor = 'text-gray-700'; // 主要文字顏色
  const titleColor = 'text-gray-800'; // 標題顏色
  const subtitleColor = 'text-gray-500'; // 副標題顏色
  const buttonBorderColor = 'border-yellow-600';
  const buttonTextColor = 'text-yellow-700';
  const buttonHoverBg = 'hover:bg-yellow-50';

  return (
    // 可以考慮在此處添加 mb-8 或 mb-12 來控制與 Footer 的間距
    <section className={`flex flex-col md:flex-row w-full ${bgColor}`}>
      {/* 左側內容區 */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-8 md:p-12 lg:p-16 order-2 md:order-1">
        {/* ... (text content and button remain the same) ... */}
         <div className="max-w-md"> {/* 限制文字區塊最大寬度 */}
          <h2 className={`text-4xl font-serif ${subtitleColor} tracking-widest mb-1`}>ABOUT US</h2>
          <h3 className={`text-3xl font-semibold ${titleColor} mb-6`}>關於摸摸茶</h3>
          <p className={`${textColor} text-base leading-relaxed mb-3`}>
            摸摸茶總部設有產品研發部門，每兩季會推出新品上市。
          </p>
          <p className={`${textColor} text-base leading-relaxed mb-3`}>
            摸摸茶將客人的恩惠謹記在心中，把讚美化成心中的動力，批評則虛心接受，不足的地方努力學習改進。
          </p>
          <p className={`${textColor} text-base leading-relaxed mb-8`}>
            堅持用最好的與你/妳相見是給所有顧客的承諾。
          </p>

          {/* READ MORE 按鈕與線條 */}
          <div className="mt-4">
            <a
              href="/about" // 連結到關於我們頁面
              // 保持原樣式，移除 group (如果不需要線條 hover 效果)
              className={`inline-flex items-center px-6 py-2 border ${buttonBorderColor} ${buttonTextColor} rounded-full text-sm font-medium ${buttonHoverBg} transition-colors`}
            >
              <span>READ MORE</span>
              {/* 將 span 替換為 SVG 箭頭 */}
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ml-2 ${buttonTextColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* 右側圖片區 - 改用 img 標籤 */}
      <div className="md:w-1/2 w-full order-1 md:order-2 h-64 md:h-auto"> {/* 移除 min-h-*, 可選設定固定高度 h-64 或讓其自適應 md:h-auto */}
        <img
            src="/assets/Logo4.png"
            alt="About Us Image"
            className="w-full h-full object-cover" // 使用 object-cover 填充並保持比例
        />
      </div>
    </section>
  );
}

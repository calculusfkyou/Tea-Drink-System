import React, { useState, useEffect } from 'react';

// 側邊欄項目資料 - 調整為與附圖一致的項目
const sidebarItems = [
  { name: "所有飲品", href: "#recommended" },
  { name: "經典茶品", href: "#classic" },
  { name: "SPECIAL", href: "#special" },
  // { name: "本家厚奶系列", href: "#milk-tea" },
  { name: "特調系列", href: "#mix" },
  // { name: "醇味鮮奶系列", href: "#fresh-milk" },
  { name: "菜單 MENU", href: "#menu"},
];

export function ProductSidebar() {
  // 獲取當前 URL 的 hash (錨點)
  const [currentHash, setCurrentHash] = useState('');

  // 監聽 hash 變化，用於更新選中項
  useEffect(() => {
    const updateHash = () => {
      setCurrentHash(window.location.hash);
    };

    // 初始設置
    updateHash();

    // 添加事件監聽器
    window.addEventListener('hashchange', updateHash);

    // 清理函數
    return () => {
      window.removeEventListener('hashchange', updateHash);
    };
  }, []);

  return (
    // 添加 fixed 或 sticky 定位使側邊欄持續顯示
    <aside className="w-64 min-w-64 pt-8 pr-4 hidden md:block fixed top-20 self-start h-fit">
      <div>
        <nav className="space-y-0">
          {sidebarItems.map((item, index) => (
            <div
              key={item.name}
              // 只有第一個項目「所有飲品」不要上邊框，其他項目都要有上邊框
              className={`${index > 0 ? 'border-t' : ''} border-gray-200 ${index === sidebarItems.length - 1 ? 'border-b' : ''}`}
            >
              <a
                href={item.href}
                target={item.target}
                rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
                // 根據當前錨點判斷是否為活躍狀態
                className={`block py-3 px-4 text-sm transition-colors ${
                  currentHash === item.href
                    ? 'text-[#5a6440] font-medium bg-gray-50' // 活躍狀態樣式 (綠色文字)
                    : 'text-gray-700 hover:text-[#5a6440]' // 非活躍狀態樣式
                }`}
              >
                {item.name}
              </a>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}

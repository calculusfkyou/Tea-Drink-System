import React from 'react';
// 引入 react-icons 作為範例，您需要安裝它: npm install react-icons
import { FaFacebookF, FaInstagram, FaGithub } from 'react-icons/fa';

export function Footer() {
  // 模擬 Navbar 的連結項目 (請替換成您 Navbar 實際使用的連結)
  const navLinks = [
    { name: "部落格", href: "https://calculusfkyou.github.io/" },
    // { name: "常見問答", href: "/faq" },
    // { name: "加盟專區", href: "/franchise" },
    { name: "最新消息", href: "/news" },
    { name: "飲品介紹", href: "/products" },
    { name: "門市資訊", href: "/locations" },
    { name: "聯絡我們", href: "/contact" },
  ];

  return (
    <footer className="bg-[#7c8861] text-white py-6"> {/* 使用圖片中的顏色 */}
      <div className="max-w-7xl mx-auto px-4">
        {/* 主要內容區: Logo, 導航, 社群圖標 */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            {/* 調整 Logo 大小以符合 Footer */}
            <img src="/assets/Long-Logo-2.png" alt="Logo" className="h-16 w-auto" /> {/* 調整高度 */}
          </div>

          {/* 導航連結 (水平排列) */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-gray-300 transition-colors">
                {link.name}
              </a>
            ))}
          </nav>

          {/* 社群圖標 */}
          <div className="flex space-x-4">
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="bg-white text-[#5a6440] p-2 rounded-full hover:opacity-80 transition-opacity">
              <FaFacebookF size={16} /> {/* 使用 react-icons */}
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="bg-white text-[#5a6440] p-2 rounded-full hover:opacity-80 transition-opacity">
              <FaInstagram size={16} /> {/* 使用 react-icons */}
            </a>
            <a href="https://github.com/CalculusFkyou" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="bg-white text-[#5a6440] p-2 rounded-full hover:opacity-80 transition-opacity">
              <FaGithub size={16} /> {/* 使用 react-icons */}
            </a>
          </div>
        </div>

        {/* 版權資訊 */}
        <div className="mt-4 pt-4 border-t border-gray-600 text-center text-xs text-gray-300">
          {/* 修改版權文字以符合圖片 */}
          &copy; {new Date().getFullYear()} tea-drink-system Co.,Ltd. ALL RIGHTS RESERVED. Designed by Charlie Wu
          {/* 如果需要保留您的名字，可以像這樣添加 */}
          {/* | Developed by Charlie Wu */}
        </div>
      </div>
    </footer>
  );
}

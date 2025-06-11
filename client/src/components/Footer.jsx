import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaInstagram, FaGithub } from 'react-icons/fa';

export function Footer() {
  // 在實際應用中，這裡會從全局狀態或API獲取社群媒體設定
  const [socialLinks, setSocialLinks] = useState({
    facebook: 'https://facebook.com/momotea',
    instagram: 'https://instagram.com/momotea',
    github: 'https://github.com/CalculusFkyou'
  });

  // 將 fetchSettings 函數移到 useEffect 外部
  const fetchSettings = async () => {
    try {
      // 從 localStorage 讀取社群媒體設定
      const savedLinks = localStorage.getItem('socialLinks');
      if (savedLinks) {
        setSocialLinks(JSON.parse(savedLinks));
      }
      // 實際情境:
      // const response = await fetch('https://tea-system.sdpmlab.org/api/settings/social');
      // if (response.ok) {
      //   const data = await response.json();
      //   setSocialLinks(data);
      // }
    } catch (error) {
      console.error('無法獲取社群媒體連結設定:', error);
    }
  };

  // 初始加載設定
  useEffect(() => {
    fetchSettings();
  }, []);

  // 監聽設定更新事件
  useEffect(() => {
    const handleSettingsUpdate = () => fetchSettings();
    window.addEventListener('settingsUpdated', handleSettingsUpdate);

    return () => {
      window.removeEventListener('settingsUpdated', handleSettingsUpdate);
    };
  }, []);

  const navLinks = [
    { name: "部落格", href: "https://calculusfkyou.github.io/" },
    { name: "最新消息", href: "/news" },
    { name: "飲品介紹", href: "/products" },
    { name: "門市資訊", href: "/locations" },
    { name: "聯絡我們", href: "/contact" },
  ];

  return (
    <footer className="bg-[#7c8861] text-white py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* 主要內容區: Logo, 導航, 社群圖標 */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src="/assets/Long-Logo-2.png" alt="Logo" className="h-16 w-auto" />
          </div>

          {/* 導航連結 (水平排列) */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-gray-300 transition-colors">
                {link.name}
              </a>
            ))}
          </nav>

          {/* 社群圖標 - 使用從設定獲取的連結 */}
          <div className="flex space-x-4">
            {socialLinks.facebook && (
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="bg-white text-[#5a6440] p-2 rounded-full hover:opacity-80 transition-opacity"
              >
                <FaFacebookF size={16} />
              </a>
            )}

            {socialLinks.instagram && (
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="bg-white text-[#5a6440] p-2 rounded-full hover:opacity-80 transition-opacity"
              >
                <FaInstagram size={16} />
              </a>
            )}

            {socialLinks.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="bg-white text-[#5a6440] p-2 rounded-full hover:opacity-80 transition-opacity"
              >
                <FaGithub size={16} />
              </a>
            )}
          </div>
        </div>

        {/* 版權資訊 */}
        <div className="mt-4 pt-4 border-t border-gray-600 text-center text-xs text-gray-300">
          &copy; {new Date().getFullYear()} tea-drink-system Co.,Ltd. ALL RIGHTS RESERVED. Designed by Charlie Wu
        </div>
      </div>
    </footer>
  );
}

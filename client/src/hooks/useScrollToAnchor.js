import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollToAnchor() {
  const location = useLocation();
  const lastHashRef = useRef('');

  useEffect(() => {
    // 只有當hash改變時才執行滾動
    if (location.hash && location.hash !== lastHashRef.current) {
      lastHashRef.current = location.hash;

      // 延遲執行以確保DOM已完全渲染
      setTimeout(() => {
        try {
          const id = location.hash.replace('#', '');
          const element = document.getElementById(id);

          if (element) {
            // 設置平滑滾動效果
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // 額外調整，避免導航欄遮擋內容
            window.scrollBy(0, -80);

            console.log(`已滾動到: ${id}`); // 調試信息
          } else {
            console.warn(`找不到ID為 ${id} 的元素`); // 調試信息
          }
        } catch (error) {
          console.error('滾動時發生錯誤:', error);
        }
      }, 300);
    } else if (!location.hash) {
      window.scrollTo(0, 0); // 如果沒有hash，滾動到頂部
    }
  }, [location]);
}

import React, { useState, useEffect, useRef } from 'react';

export function Carousel() {
  const originalImages = [
    "/assets/banners/banner-1.webp",
    "/assets/banners/banner-2.webp",
    "/assets/banners/banner-3.webp",
    "/assets/banners/banner-4.png",
  ];

  // 創建足夠的重複圖片以實現無縫循環<button onClick={togglePlayPause} className="absolute top-4 left-4 z-20">
  const extendedImages = [
    ...originalImages,
    ...originalImages, // 第一次重複
    ...originalImages  // 第二次重複，確保無縫循環
  ];

  const [currentOffset, setCurrentOffset] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(0);

  // 動畫速度 - 每秒移動的像素
  const SPEED = 30; // 可以調整這個值來改變滾動速度

  // 圖片寬度 + 間距
  const getImageWidth = () => {
    if (typeof window !== 'undefined') {
      const vw = window.innerWidth;
      if (vw >= 1024) return 400 + 32; // lg: 圖片寬度 + gap
      if (vw >= 768) return 350 + 24;  // md: 圖片寬度 + gap
      return 300 + 16; // sm: 圖片寬度 + gap
    }
    return 400 + 32;
  };

  const imageWidth = getImageWidth();
  const totalWidth = originalImages.length * imageWidth;

  // 動畫函數
  const animate = (currentTime) => {
    if (!lastTimeRef.current) {
      lastTimeRef.current = currentTime;
    }

    const deltaTime = currentTime - lastTimeRef.current;

    if (isPlaying && !isPaused) {
      setCurrentOffset(prevOffset => {
        const newOffset = prevOffset + (SPEED * deltaTime / 1000);

        // 當滾動完一組原始圖片時，重置位置以創建無限循環效果
        if (newOffset >= totalWidth) {
          return newOffset - totalWidth;
        }

        return newOffset;
      });
    }

    lastTimeRef.current = currentTime;
    animationRef.current = requestAnimationFrame(animate);
  };

  // 啟動動畫
  useEffect(() => {
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, isPaused]);

  // 處理視窗大小變化
  useEffect(() => {
    const handleResize = () => {
      // 重新計算並重置動畫
      setCurrentOffset(0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 處理頁面可見性變化
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
        lastTimeRef.current = 0; // 重置時間參考
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // 滑鼠懸停暫停
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    lastTimeRef.current = 0; // 重置時間參考
  };

  // 播放/暫停控制
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      lastTimeRef.current = 0; // 重置時間參考
    }
  };

  return (
    <div className="relative w-full bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* 主容器 */}
      <div
        className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* 漸層遮罩 - 左右邊緣 */}
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

        {/* 滾動容器 */}
        <div
          ref={containerRef}
          className="flex items-center h-full"
          style={{
            transform: `translateX(-${currentOffset}px)`,
            width: `${extendedImages.length * imageWidth}px`
          }}
        >
          {extendedImages.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="flex-shrink-0 px-2 md:px-3 lg:px-4 h-full flex items-center"
              style={{ width: `${imageWidth}px` }}
            >
              <div className="relative w-full h-5/6 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group">
                {/* 圖片容器 */}
                <div className="relative w-full h-full bg-white">
                  <img
                    src={src}
                    alt={`Banner ${(index % originalImages.length) + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* 懸停遮罩 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* 反射效果 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
                </div>

                {/* 底部漸層 */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 添加自定義 CSS
const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  .animate-float-delay {
    animation: float 6s ease-in-out infinite;
    animation-delay: 2s;
  }
`;

// 將樣式注入到頁面
if (typeof window !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

import React, { useState, useEffect, useRef, useCallback } from 'react';

export function Carousel() {
  const originalImages = [
    "/assets/banners/banner-1.webp",
    "/assets/banners/banner-2.webp",
    "/assets/banners/banner-3.webp",
    "/assets/banners/banner-4.png",
  ];

  // 1. 複製首尾圖片，創建新的 slides 陣列
  const images = [
    originalImages[originalImages.length - 1], // 複製最後一張到開頭
    ...originalImages,
    originalImages[0] // 複製第一張到結尾
  ];

  // 2. 初始索引指向實際的第一張圖片 (在 images 陣列中是索引 1)
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true); // 控制是否有過渡動畫
  const timeoutRef = useRef(null);
  const carouselRef = useRef(null); // Ref for the sliding container

  // 清除計時器
  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  // 自動輪播 Effect
  useEffect(() => {
    // 只有在有過渡效果時才啟動自動播放計時器
    if (isTransitioning) {
      resetTimeout();
      timeoutRef.current = setTimeout(() => {
        goToNext(); // 使用 goToNext 處理索引增加和過渡
      }, 3000);
    }
    // 組件卸載或 currentIndex 變化時清除計時器
    return () => resetTimeout();
    // 依賴 currentIndex 和 isTransitioning
  }, [currentIndex, isTransitioning, resetTimeout]); // goToNext 已用 useCallback 包裹，但為清晰起見加入 resetTimeout

  // 3. 處理過渡結束事件 (關鍵部分)
  const handleTransitionEnd = () => {
    if (currentIndex === 0) { // 如果滑到了複製的最後一張 (在開頭)
      setIsTransitioning(false); // 關閉過渡
      setCurrentIndex(images.length - 2); // 跳轉到實際的最後一張
    } else if (currentIndex === images.length - 1) { // 如果滑到了複製的第一張 (在結尾)
      setIsTransitioning(false); // 關閉過渡
      setCurrentIndex(1); // 跳轉到實際的第一張
    }
    // 如果是正常滑動，不需要做任何事
    // 在下一次渲染或短暫延遲後重新啟用過渡 (確保 DOM 更新後再啟用)
    requestAnimationFrame(() => {
        requestAnimationFrame(() => { // Double requestAnimationFrame for robustness
             if (!isTransitioning && (currentIndex === 1 || currentIndex === images.length - 2)) {
                 setIsTransitioning(true);
             }
        });
    });
  };

   // 在 currentIndex 跳轉後，確保 isTransitioning 被設置回 true
   useEffect(() => {
       // 如果當前索引是實際圖片且過渡被禁用，則重新啟用它
       if (!isTransitioning && currentIndex > 0 && currentIndex < images.length - 1) {
           // 使用 setTimeout 確保在 DOM 更新後再啟用過渡
           const timer = setTimeout(() => setIsTransitioning(true), 50); // 短暫延遲
           return () => clearTimeout(timer);
       }
   }, [currentIndex, isTransitioning, images.length]);


  // 前往上一張
  const goToPrevious = useCallback(() => {
    // 允許過渡效果
    setIsTransitioning(true);
    // 直接減少 currentIndex，handleTransitionEnd 會處理跳轉
    setCurrentIndex(prevIndex => prevIndex - 1);
    resetTimeout(); // 重置自動播放計時器
  }, [resetTimeout]);

  // 前往下一張
  const goToNext = useCallback(() => {
    // 允許過渡效果
    setIsTransitioning(true);
    // 直接增加 currentIndex，handleTransitionEnd 會處理跳轉
    setCurrentIndex(prevIndex => prevIndex + 1);
    resetTimeout(); // 重置自動播放計時器
  }, [resetTimeout]);

  // 跳轉到指定圖片 (基於原始圖片的索引)
  const goToSlide = useCallback((slideIndex) => {
    setIsTransitioning(true);
    // 將原始索引轉換為複製後列表的索引
    setCurrentIndex(slideIndex + 1);
    resetTimeout();
  }, [resetTimeout]);

  // 計算當前顯示的邏輯索引 (用於指示點)
  const logicalIndex = (currentIndex - 1 + originalImages.length) % originalImages.length;

  return (
    <section
      className="relative w-full overflow-hidden"
      onMouseEnter={resetTimeout} // 滑鼠移入時清除計時器 (暫停)
      onMouseLeave={() => { // 滑鼠移出時重新設定計時器 (恢復)
        // 只有在過渡啟用時才恢復自動播放
        if (isTransitioning) {
            resetTimeout();
            timeoutRef.current = setTimeout(goToNext, 3000);
        }
      }}
    >
      {/* 圖片容器 */}
      <div
        ref={carouselRef}
        className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-out' : ''}`} // 根據 isTransitioning 控制過渡
        style={{ transform: `translateX(-${currentIndex * 100}%)` }} // 使用當前索引計算位移
        onTransitionEnd={handleTransitionEnd} // 監聽過渡結束事件
      >
        {/* 遍歷包含複製圖片的 images 陣列 */}
        {images.map((src, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <img
              src={src}
              alt={`Slide ${index}`} // Alt text 可能需要調整
              // 使用 object-cover 填滿容器
              className="w-full h-[40vh] md:h-[60vh] lg:h-[80vh] object-contain"
            />
          </div>
        ))}
      </div>

      {/* 左右導航按鈕 */}
      {originalImages.length > 1 && ( // 判斷條件基於原始圖片數量
        <>
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 left-4 md:left-8 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 focus:outline-none transition-all z-10"
            aria-label="Previous Image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute top-1/2 right-4 md:right-8 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 focus:outline-none transition-all z-10"
            aria-label="Next Image"
          >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
             </svg>
          </button>
        </>
      )}

      {/* 指示點 */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {/* 指示點基於原始圖片數量 */}
        {originalImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            // 使用 logicalIndex 判斷當前活動的指示點
            className={`w-3 h-3 rounded-full ${logicalIndex === index ? 'bg-white' : 'bg-white bg-opacity-50'} hover:bg-opacity-75 focus:outline-none transition-colors`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

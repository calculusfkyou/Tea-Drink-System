import React from 'react';

export function AboutFeatures() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-[#5a6440]">產品特色</h2>
          <div className="w-24 h-1 bg-[#5a6440] mx-auto mt-3"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="rounded-full bg-[#f8f4e5] w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <img src="/assets/about/about-feature-1.jpg" alt="優質茶葉" className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center text-[#5a6440]">精選茶葉</h3>
            <p className="text-gray-700 text-center">
              使用來自台灣高山茶區的優質茶葉，經過專業製茶師傅精心挑選與處理，確保每一批茶葉都保有最佳風味。
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="rounded-full bg-[#f8f4e5] w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <img src="/assets/about/about-feature-2.jpg" alt="新鮮食材" className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center text-[#5a6440]">新鮮食材</h3>
            <p className="text-gray-700 text-center">
              每日採購新鮮水果與食材，堅持自製內餡與配料，不使用濃縮果汁或人工添加物，讓您品嚐到最自然的風味。
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="rounded-full bg-[#f8f4e5] w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <img src="/assets/about/about-feature-3.jpg" alt="專業沖泡" className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center text-[#5a6440]">專業沖泡</h3>
            <p className="text-gray-700 text-center">
              遵循專業沖泡流程與黃金比例，每一杯飲品都經過嚴格的品質管控，確保味道的一致性與完美口感。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';

export function AboutIntro() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-[#5a6440]">茶飲新典範，一杯滿足感</h2>
          <div className="w-24 h-1 bg-[#5a6440] mx-auto mt-3"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <img
              src="/assets/about/about-intro.png"
              alt="摸摸茶品牌介紹"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <p className="text-gray-700 text-lg mb-4 leading-relaxed">
              「摸摸茶」於2018年在台灣成立，以「品質優先，匠心製作」為核心理念。我們相信一杯好茶，應該兼具傳統茶藝的精髓與現代風味的創新。
            </p>
            <p className="text-gray-700 text-lg mb-4 leading-relaxed">
              每一杯摸摸茶，都是由專業的茶藝師精心調配，嚴選來自台灣高山的優質茶葉，搭配新鮮水果與天然食材，呈現最道地的台灣茶飲風味。
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              從日常小確幸到特別場合，摸摸茶致力於為每位顧客帶來優質且健康的飲品體驗，讓生活中的每一刻都能被滿足感所填滿。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

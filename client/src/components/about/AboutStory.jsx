import React from 'react';

export function AboutStory() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-[#5a6440]">品牌故事</h2>
          <div className="w-24 h-1 bg-[#5a6440] mx-auto mt-3"></div>
        </div>

        <div className="flex flex-col md:flex-row-reverse items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pl-8">
            <img
              src="/assets/about/about-story.png"
              alt="摸摸茶品牌故事"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <div className="prose prose-lg max-w-none">
              <p className="mb-4">
                摸摸茶的創始人陳先生，自小在阿里山茶區長大，對茶飲有著濃厚的情感和專業知識。大學畢業後，他曾在國際連鎖茶飲品牌工作，但一直夢想能創立自己的品牌。
              </p>
              <p className="mb-4">
                2018年，秉持著「讓好茶走進日常」的信念，陳先生與志同道合的夥伴們在台北開設了第一家摸摸茶店鋪。店名「摸摸茶」源自於台語中「摸摸生活中的小確幸」的諧音。
              </p>
              <p>
                從最初的小店到如今遍布全台的連鎖品牌，摸摸茶始終堅持使用高品質食材，致力於將傳統茶藝與現代風味結合，創造出獨特且令人難忘的茶飲體驗。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

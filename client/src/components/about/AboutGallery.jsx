import React from 'react';

export function AboutGallery() {
  const images = [
    { src: "/assets/about/gallery-1.webp", alt: "摸摸茶店鋪環境" },
    { src: "/assets/about/gallery-2.png", alt: "製茶過程" },
    { src: "/assets/about/gallery-3.webp", alt: "招牌飲品" },
    { src: "/assets/about/gallery-4.jpg", alt: "團隊合影" }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-[#5a6440]">摸摸茶映像</h2>
          <div className="w-24 h-1 bg-[#5a6440] mx-auto mt-3"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-lg">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

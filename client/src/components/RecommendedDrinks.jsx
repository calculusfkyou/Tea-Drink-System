import React from 'react';

// 假設的推薦飲品資料
const recommendedDrinks = [
  { id: 1, name: "奶蓋蕎麥茶", category: "濃韻系列 芝士奶蓋", image: "/assets/recommend/Recommend-1.jpg" }, // 請替換為實際圖片路徑
  { id: 2, name: "招牌紅茶", category: "茶人系列 原味茶", image: "/assets/recommend/Recommend-2.jpg" }, // 請替換為實際圖片路徑
  { id: 3, name: "逮丸奶茶", category: "香醇系列 奶茶", image: "/assets/recommend/Recommend-3.jpg" }, // 請替換為實際圖片路徑
  // 您可以加入更多推薦飲品
];

// 單個飲品卡片元件 (可以在內部定義或抽離成獨立檔案)
function DrinkCard({ name, category, image }) {
  return (
    <div className="text-center">
      <img src={image} alt={name} className="w-full max-w-xs mx-auto mb-4 h-auto object-contain" /> {/* 調整圖片大小和對齊 */}
      <p className="text-sm text-gray-500 mb-1">{category}</p>
      <h4 className="text-lg font-semibold text-green-800">{name}</h4>
    </div>
  );
}

export function RecommendedDrinks() {
  return (
    <section className="py-12 bg-white"> {/* 背景設為白色，增加垂直 padding */}
      {/* 標題區 */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-serif text-gray-600 tracking-widest mb-1">RECOMMEND</h2>
        <h3 className="text-3xl font-semibold text-gray-800">好評必喝</h3>
      </div>

      {/* 飲品展示區 - 使用 Grid 佈局 */}
      {/* 這裡可以加入左右箭頭按鈕來實現輪播效果，目前先用 Grid 展示 */}
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {recommendedDrinks.map((drink) => (
          <DrinkCard
            key={drink.id}
            name={drink.name}
            category={drink.category}
            image={drink.image}
          />
        ))}
      </div>

      {/* MENU 按鈕 */}
      <div className="text-center mt-10">
        <a
          href="/products" // 連結到您的菜單頁面
          className="inline-flex items-center px-6 py-2 border border-yellow-600 text-yellow-700 rounded-full text-sm font-medium hover:bg-yellow-50 transition-colors"
        >
          MENU
          {/* 將 span 替換成 SVG 箭頭 */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </section>
  );
}

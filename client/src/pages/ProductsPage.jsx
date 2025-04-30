import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ProductSidebar } from '../components/products/ProductSidebar';

// 引入拆分後的元件
import { RecommendedSection } from '../components/products/RecommendedSection';
import { ClassicSection } from '../components/products/ClassicSection';
import { SpecialSection } from '../components/products/SpecialSection';
import { MixSection } from '../components/products/MixSection';
import { MenuSection } from '../components/products/MenuSection';


// 飲品資料
// 假設的飲品資料 (您需要替換成真實資料和圖片路徑)
const recommendedDrinksData = [
  { id: 101, name: "粉粿厚奶茶", image: "/assets/Recommend-1.jpg" },
  { id: 102, name: "檸檬黑糖粉粿", image: "/assets/Recommend-2.jpg" },
  { id: 103, name: "焙煎蕎麥粉粿", image: "/assets/Recommend-3.jpg" },
  { id: 104, name: "綠茶凍梅露", image: "/assets/Recommend-4.jpg" },
  { id: 105, name: "中焙生乳紅茶", image: "/assets/Recommend-5.jpg" },
];

const classicDrinksData = [
  { id: 201, name: "摸摸紅茶", description: "", price: "M $19 | L $25", image: "/assets/products/classic/classic-1.webp" },
  { id: 202, name: "好摸冬瓜青", description: "", price: "M $19｜L $25", image: "/assets/products/classic/classic-2.webp" },
  { id: 203, name: "爽爽摸綠茶", description: "", price: "M $19｜L $25", image: "/assets/products/classic/classic-3.webp" },
  { id: 204, name: "焙煎蕎麥", description: "*微咖啡因", price: "M $19｜L $25", image: "/assets/products/classic/classic-4.webp" },
  { id: 205, name: "烏龍一場", description: "", price: "M $19｜L $25", image: "/assets/products/classic/classic-5.webp" },
  { id: 206, name: "烏龍翠綠", description: "", price: "M $19｜L $25", image: "/assets/products/classic/classic-6.webp" },
];

const specialDrinksData = [
  { id: 301, name: "愛荔殺殺", price: "L $78", description: "*甜度固定 / 僅供冰飲", image: "/assets/products/special/special-1.jpg" },
  { id: 302, name: "橙芝汗", price: "L $87", description: "*甜度固定 / 僅供冰飲", image: "/assets/products/special/special-2.webp" },
  { id: 303, name: "中焙生乳紅茶", price: "M $49", description: "*甜度(正常/減糖) / 冰塊固定", image: "/assets/products/special/special-3.webp" },
  { id: 304, name: "超PINEAPPLE冰茶", price: "L $80", description: "*甜度冰塊固定", image: "/assets/products/special/special-4.webp" },
  { id: 305, name: "珍珠芝麻歐蕾 ", price: "M $59 L$70", description: "*可選固定冰/熱飲・甜度固定", image: "/assets/products/special/special-5.png" },
];

const mixDrinksData = [
  { id: 401, name: "覓蜜紅茶", description: "", price: "M $29｜L $40", image: "/assets/products/mix/mix-1.jpg" },
  { id: 402, name: "覓蜜綠茶", description: "", price: "M $29｜L $40", image: "/assets/products/mix/mix-2.webp" },
  { id: 403, name: "百香三寶", description: "珍珠/椰果/茶凍", price: "L $55", image: "/assets/products/mix/mix-3.png" },
  { id: 404, name: "綠茶凍梅露", description: "", price: "$50", image: "/assets/products/mix/mix-4.webp" },
  { id: 405, name: "甘蔗青茶", description: "", price: "M $49｜L $60", image: "/assets/products/mix/mix-5.webp" },
  { id: 406, name: "覓蜜檸檬蘆薈", description: "", price: "M $39｜L $50", image: "/assets/products/mix/mix-6.webp" },
  { id: 407, name: "檸檬黑糖粉粿", description: "", price: "$60", image: "/assets/products/mix/mix-7.webp" },
  { id: 408, name: "金桔檸檬茶凍", description: "", price: "$65", image: "/assets/products/mix/mix-8.webp" },
  { id: 409, name: "檸檬養樂多", description: "", price: "L $60", image: "/assets/products/mix/mix-9.png" },
  { id: 410, name: "養樂多綠茶", description: "", price: "L $50", image: "/assets/products/mix/mix-10.png" },
  { id: 411, name: "檸檬紅茶", description: "", price: "M $45｜L $55", image: "/assets/products/mix/mix-11.png" },
  { id: 412, name: "檸檬綠茶", description: "", price: "M $45｜L $55", image: "/assets/products/mix/mix-12.png" },
  { id: 413, name: "梅露青", description: "", price: "L $45", image: "/assets/products/mix/mix-13.png" },
  { id: 414, name: "青梅翠綠", description: "", price: "L $45", image: "/assets/products/mix/mix-14.png" },
  { id: 415, name: "百香翠綠", description: "", price: "L $45", image: "/assets/products/mix/mix-15.png" },
];

export default function ProductsPage() {
  const location = useLocation();

  // 處理錨點滾動
  useEffect(() => {
    if (location.hash) {
      // 延遲一下以確保頁面完全渲染
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* 主體內容區 */}
      <div className="w-full max-w-7xl mx-auto px-4 py-8 flex">
        {/* 左側邊欄 - 調整成附圖樣式 */}
        <ProductSidebar />

        {/* 右側主要內容區 */}
        <main className="flex-grow md:ml-64 pl-6">
          {/* 推薦飲品區塊 */}
          <RecommendedSection recommendedDrinksData={recommendedDrinksData} />

          <hr className="my-12 border-gray-300" />

          {/* 經典茶品區塊 */}
          <ClassicSection classicDrinksData={classicDrinksData} />

          <hr className="my-12 border-gray-300" />

          {/* SPECIAL 區塊 */}
          <SpecialSection specialDrinksData={specialDrinksData} />

          <hr className="my-12 border-gray-300" />

          {/* 特調系列區塊 */}
          <MixSection mixDrinksData={mixDrinksData} />

          <hr className="my-12 border-gray-300" />

          {/* 菜單區塊 */}
          <MenuSection />
        </main>
      </div> {/* End container */}

      <Footer />
    </div>
  );
}

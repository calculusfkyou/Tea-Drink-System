import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { PostCard } from '../components/PostCard'
import { Carousel } from '../components/Carousel'
import { RecentNews } from '../components/RecentNews'
import { RecommendedDrinks } from '../components/RecommendedDrinks'
import { StoreLocations } from '../components/StoreLocations'
import { AboutUs } from '../components/AboutUs'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Navbar />

      {/* 主要內容區 - 移除寬度限制，讓子元素自己控制 */}
      <main className="flex flex-col w-full">

        {/* Carousel 全寬 */}
        <Carousel />

        {/* RecentNews 區塊 - 外層 div 控制背景和垂直 padding */}
        <div className="w-full bg-gray-100 py-12"> {/* 新增外層 div，設定背景色和上下 padding */}
          {/* 內層 div 控制內容寬度和水平 padding */}
          <div className="w-full max-w-7xl mx-auto px-4"> {/* 移除 py-12 */}
              <RecentNews />
          </div>
        </div>

        {/* RecommendedDrinks 元件 */}
        <RecommendedDrinks />

        {/* StoreLocations 元件 - 讓它自己控制背景和寬度 */}
        <StoreLocations />

        {/* AboutUs 元件 - 新增 */}
        <AboutUs />

      </main>
      <Footer />
    </div>
  )
}

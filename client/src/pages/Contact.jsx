import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

// 假設的表單元件 (稍後可以建立或直接在此處實作)
function ContactForm() {
  // 表單狀態和處理邏輯會在這裡
  const handleSubmit = (e) => {
    e.preventDefault();
    // 處理表單提交
    console.log('Form submitted');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      {/* 留言類別 */}
      <div>
        <label htmlFor="messageType" className="block text-sm font-medium text-gray-700 mb-1">
          <span className="text-orange-500 mr-1">*</span>留言類別：
        </label>
        <select
          id="messageType"
          name="messageType"
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Please Select</option>
          <option value="general">一般諮詢</option>
          <option value="franchise">加盟洽詢</option>
          <option value="feedback">意見回饋</option>
          {/* 其他選項 */}
        </select>
      </div>

      {/* 姓名/稱謂 */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          <span className="text-orange-500 mr-1">*</span>姓名/稱謂：
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          <span className="text-orange-500 mr-1">*</span>Email：
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* 聯絡電話 */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          <span className="text-orange-500 mr-1">*</span>聯絡電話：
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* 留言內容 */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          <span className="text-orange-500 mr-1">*</span>請輸入您的留言與需求：
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* 送出按鈕 */}
      <div className="text-center">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          送出
        </button>
      </div>

      {/* reCAPTCHA 提示 */}
      <p className="text-xs text-gray-500 text-center mt-4">
        This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline">Privacy Policy</a> and <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline">Terms of Service</a> apply.
      </p>
    </form>
  );
}


export default function ContactPage() {
  const pageBgColor = 'bg-[#dde3d6]'; // 頁面主要背景色 (近似值)
  const textColor = 'text-gray-700';
  const titleColor = 'text-gray-800';
  const subtitleColor = 'text-gray-500';

  return (
    <div className={`flex flex-col min-h-screen ${pageBgColor}`}>
      <Navbar />

      <main className="flex-grow w-full">
        {/* 頂部區塊: 標題 + 圖片 */}
        <section className="bg-white py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
            {/* 左側標題 */}
            <div className="text-center md:text-left mb-8 md:mb-0 md:w-1/2">
              <h1 className={`text-4xl font-semibold ${titleColor} mb-2`}>聯絡我們</h1>
              <p className={`text-lg font-serif ${subtitleColor} tracking-widest`}>CONTACT US</p>
            </div>
            {/* 右側圖片 */}
            <div className="md:w-1/3 flex justify-center md:justify-end">
              <img src="/assets/Contact-Illustration.png" alt="Contact Illustration" className="w-48 h-auto md:w-64" /> {/* 請替換為實際圖片路徑 */}
            </div>
          </div>
        </section>

        {/* 中間區塊: 加盟資訊 */}
        <section className="py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className={`${textColor} text-lg mb-6`}>
              加盟諮詢預約，請至加盟專區填寫表單，我們會盡快聯繫您。
            </p>
            <a
              href="/franchise" // 連結到加盟專區頁面
              className="inline-block px-8 py-3 bg-gray-700 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
            >
              前往加盟專區
            </a>
          </div>
        </section>

        {/* 底部區塊: 聯絡表單 */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <h4 className={`text-2xl font-semibold ${titleColor} mb-4`}>其他聯繫事項請填寫下方表單</h4>
              <p className={`${textColor} text-sm max-w-xl mx-auto`}>
                收到您的留言後，我們將於辦公時間盡快與您聯繫！<br />
                ❖ 預約訂單請撥打訂購門市電話｜或使用線上點餐系統訂購，此聯繫表單不提供訂餐訂單。
              </p>
              <p className={`${textColor} text-sm mt-2`}>
                摸摸茶粉絲專頁 <a href="#" className="underline">Facebook</a> | <a href="#" className="underline">Instagram</a>
              </p>
            </div>
            {/* 分隔線 */}
            <hr className="border-gray-400 my-8" />
            {/* 表單元件 */}
            <ContactForm />
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

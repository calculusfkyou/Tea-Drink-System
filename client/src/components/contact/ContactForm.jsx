import React from 'react';

export default function ContactForm() {
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

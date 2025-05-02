import React from 'react';
import ContactForm from './ContactForm';

export default function ContactFormSection() {
  const textColor = 'text-gray-700';
  const titleColor = 'text-gray-800';

  return (
    <section className="pb-16 md:pb-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <h4 className={`text-2xl font-semibold ${titleColor} mb-4`}>聯繫事項請填寫下方表單</h4>
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
  );
}

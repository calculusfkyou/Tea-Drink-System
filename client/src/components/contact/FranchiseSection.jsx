import React from 'react';

export default function FranchiseSection() {
  const textColor = 'text-gray-700';

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <p className={`${textColor} text-lg mb-6`}>
          加盟諮詢預約，請至加盟專區填寫表單，我們會盡快聯繫您。
        </p>
        <a
          href="/franchise"
          className="inline-block px-8 py-3 bg-gray-700 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
        >
          前往加盟專區
        </a>
      </div>
    </section>
  );
}

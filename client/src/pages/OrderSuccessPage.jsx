import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export default function OrderSuccessPage() {
  const { orderNumber } = useParams();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-16">
        <div className="max-w-md w-full px-4">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h1 className="text-2xl font-semibold text-gray-800 mb-2">訂單已成功送出！</h1>

            <p className="text-gray-600 mb-6">
              感謝您的訂購，我們會盡快為您準備飲品。
              <br />
              您的訂單編號是：<span className="font-medium">{orderNumber}</span>
            </p>

            <div className="space-y-4">
              <Link
                to="/profile"
                className="block w-full py-3 bg-[#5a6440] text-white rounded-md hover:bg-[#4a5332] transition-colors"
              >
                查看訂單記錄
              </Link>

              <Link
                to="/products"
                className="block w-full py-3 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                繼續購物
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

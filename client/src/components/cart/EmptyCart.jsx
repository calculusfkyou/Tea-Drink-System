import React from 'react';
import { Link } from 'react-router-dom';

export function EmptyCart() {
  return (
    <div className="flex-grow flex flex-col justify-center items-center py-20">
      <div className="text-center">
        <svg
          className="mx-auto h-20 w-20 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          ></path>
        </svg>
        <h2 className="mt-4 text-xl font-medium text-gray-700">您的購物車是空的</h2>
        <p className="mt-2 text-gray-500">快去選購喜歡的飲品吧！</p>
        <div className="mt-6">
          <Link
            to="/products"
            className="px-6 py-3 bg-[#5a6440] text-white rounded-md hover:bg-[#4a5332] transition-colors"
          >
            去逛逛吧！
          </Link>
        </div>
      </div>
    </div>
  );
}

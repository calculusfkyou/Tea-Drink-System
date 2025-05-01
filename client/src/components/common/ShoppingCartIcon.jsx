import React from 'react';
import { Link } from 'react-router-dom';

export default function ShoppingCartIcon() {
  // 這裡可以加入購物車品項數量狀態 (暫時先不實作)
  // const [itemCount, setItemCount] = useState(0);

  return (
    <Link to="/cart" className="relative p-1">
      <svg
        className="w-6 h-6 text-gray-600 hover:text-[#4a5332]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        ></path>
      </svg>

      {/* 未來可以加入數量標示 */}
      {/* {itemCount > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )} */}
    </Link>
  );
}

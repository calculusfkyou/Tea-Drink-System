import React from 'react';
import { Link } from 'react-router-dom';

export function NotFoundAction() {
  return (
    <div className="text-center">
      <Link
        to="/"
        className="inline-block px-8 py-3 bg-[#5a6440] text-white rounded-md hover:bg-opacity-90 transition-colors"
      >
        回首頁
      </Link>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';

export function NewsCard({ id, title, date, image }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <Link to={`/news/${id}`}>
        <div className="cursor-pointer">
          {/* 圖片容器，固定高度 */}
          <div className="h-48 overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform hover:scale-105"
              loading="lazy"
            />
          </div>

          {/* 標題與日期 */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-sm text-gray-500">{date}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

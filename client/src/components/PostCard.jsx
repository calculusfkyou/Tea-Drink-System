import React from 'react';
import { Link } from 'react-router-dom';

export function PostCard({ title, date, category, excerpt, link }) {
  return (
    <Link to={link} className="block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer">
      <div className="p-6">
        {/* 日期和類別 */}
        <div className="flex items-center mb-2 text-sm">
          <span className="text-gray-500">{date}</span>
          {category && (
            <>
              <span className="mx-2 text-gray-400">|</span>
              <span className="text-[#5a6440]">{category}</span>
            </>
          )}
        </div>

        {/* 標題 */}
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>

        {/* 摘要（如果有） */}
        {excerpt && <p className="text-gray-600 text-sm line-clamp-3">{excerpt}</p>}

        {/* 閱讀更多連結 */}
        <div className="mt-4 text-[#5a6440] text-sm font-medium flex items-center">
          閱讀更多
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

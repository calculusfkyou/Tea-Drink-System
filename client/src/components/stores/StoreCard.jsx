import React from 'react';
import { Link } from 'react-router-dom';

export function StoreCard({ id, name, address, phone, hours, image, isNew, location, mapLink }) {
  // 顯示的營業時間，如果有weekday和weekend分開，則顯示weekday
  const displayHours = hours.weekday || hours.default;

  // 創建 Google Maps 連結
  const mapUrl = location ?
    `https://www.google.com/maps?q=${location.lat},${location.lng}` :
    `https://www.google.com/maps?q=${encodeURIComponent(address)}`;

  return (
    <Link to={`/locations/${id}`} className="block rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative">
        {/* 門市圖片 */}
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover"
        />

        {/* 新開幕標籤 */}
        {isNew && (
          <div className="absolute top-3 left-3 bg-[#e63946] text-white px-2 py-1 text-xs rounded-md font-medium">
            新開幕
          </div>
        )}
      </div>

      <div className="p-4">
        {/* 門市名稱 */}
        <h3 className="text-lg font-semibold text-center mb-3">
          ✦ {name} ✦
        </h3>

        {/* 地址和MAP連結 */}
        <div className="flex items-start mb-2">
          <svg className="w-5 h-5 text-gray-500 mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <div className="text-sm">
            <span className="text-gray-600">{address}</span>
            <a
              href={mapLink || `https://www.google.com/maps?q=${encodeURIComponent(address)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="ml-2 inline-block text-[#5a6440] font-medium hover:underline"
            >
              (MAP)
            </a>
          </div>
        </div>

        {/* 電話 */}
        <div className="flex items-start mb-2">
          {/* 電話圖標和內容保持不變 */}
          <svg className="w-5 h-5 text-gray-500 mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
          </svg>
          <span className="text-sm text-gray-600">{phone}</span>
        </div>

        {/* 營業時間 */}
        <div className="flex items-start">
          <svg className="w-5 h-5 text-gray-500 mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span className="text-sm text-gray-600">{displayHours}</span>
        </div>
      </div>
    </Link>
  );
}

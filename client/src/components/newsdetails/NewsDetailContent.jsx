import React from 'react';

export function NewsDetailContent({ image, detailImage, images, content, title, details }) {
  // 優先使用詳情頁專用圖片 detailImage
  const mainImage = detailImage || image || (images && images.length > 0 ? images[0] : null);
  // 獲取其他圖片 (如果有)
  const otherImages = images && images.length > 0 ? images : [];

  return (
    <div className="news-detail-content">
      {/* 主要大圖 */}
      {mainImage && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <img
            src={mainImage}
            alt={title}
            className="w-full h-auto"
          />
        </div>
      )}

      {/* 如果有詳細店舖資訊，顯示結構化的內容 */}
      {details && (
        <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-100">
          <div className="space-y-2">
            {details.openingDate && (
              <div className="flex items-start">
                <span className="font-medium w-24 shrink-0">開幕時間：</span>
                <span className="text-gray-700">{details.openingDate}</span>
              </div>
            )}

            {details.phone && (
              <div className="flex items-start">
                <span className="font-medium w-24 shrink-0">聯絡電話：</span>
                <span className="text-gray-700">{details.phone}</span>
              </div>
            )}

            {details.openingHours && (
              <div className="flex items-start">
                <span className="font-medium w-24 shrink-0">營業時間：</span>
                <span className="text-gray-700">{details.openingHours}</span>
              </div>
            )}

            {details.address && (
              <div className="flex items-start">
                <span className="font-medium w-24 shrink-0">店舖地址：</span>
                <span className="text-gray-700">{details.address}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 文章內容 */}
      <div className="prose max-w-none mb-8">
        {content.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4">{paragraph}</p>
        ))}
      </div>

      {/* 其他圖片展示區 */}
      {otherImages.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">更多照片</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {otherImages.map((img, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-sm">
                <img
                  src={img}
                  alt={`${title} - 圖片 ${index + 2}`}
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 開幕優惠資訊或特別提示 */}
      {/* <div className="mt-8 bg-[#edf2eb] border-l-4 border-[#5a6440] p-4 rounded">
        <p className="text-[#5a6440] font-medium">✨ 開幕期間限定優惠</p>
        <p className="mt-1">前往店內消費並出示此則消息，即可獲得開幕限定優惠：飲品買一送一（限量100杯）。</p>
      </div> */}
    </div>
  );
}

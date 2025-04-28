import React from 'react';

export function StoreLocation({ address, mapUrl, location }) {
  // 如果有提供mapUrl就使用它，否則根據地址或坐標生成Google Maps嵌入網址
  const embedUrl = mapUrl || `https://maps.google.com/maps?q=${location.lat},${location.lng}&z=16&output=embed`;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">店舖位置</h3>
      <div className="aspect-video rounded-lg overflow-hidden shadow-md">
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="門市位置"
        ></iframe>
      </div>
    </div>
  );
}

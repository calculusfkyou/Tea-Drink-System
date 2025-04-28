import React from 'react';

export function NotFoundMessage() {
  return (
    <div className="text-center max-w-lg mx-auto mb-12">
      <h2 className="text-3xl font-bold text-[#5a6440] mb-4">哎呀迷路了！</h2>
      <p className="text-gray-600 text-lg">
        我們找不到您要訪問的頁面，請回到首頁再試試看。
      </p>
    </div>
  );
}

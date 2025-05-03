import React from 'react';

export function CartSummary({ selectedItems, couponCode, setCouponCode, onCheckout }) {
  // 計算已選商品總數量和總價
  const selectedCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  const selectedTotal = selectedItems.reduce((sum, item) => sum + parseFloat(item.price), 0);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border">
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <span className="text-gray-700 mr-2">優惠碼:</span>
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="輸入優惠碼"
            className="px-3 py-1 border rounded-md mr-2 focus:outline-none focus:ring-1 focus:ring-[#5a6440]"
          />
          <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
            套用
          </button>
        </div>
        <div className="text-xs text-gray-500">
          * 結帳前輸入優惠碼可享折扣
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-700">商品總金額:</span>
          <span className="font-medium">NT$ {selectedTotal.toFixed(0)}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-700">折扣金額:</span>
          <span className="font-medium text-red-600">- NT$ 0</span>
        </div>
        <div className="h-px bg-gray-200 my-4"></div>
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-bold">結帳金額:</span>
          <span className="text-xl font-bold text-red-600">NT$ {selectedTotal.toFixed(0)}</span>
        </div>
        <button
          onClick={onCheckout}
          disabled={selectedCount === 0}
          className={`px-6 py-3 rounded-md w-full ${
            selectedCount > 0
              ? 'bg-[#5a6440] text-white hover:bg-[#4a5332]'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          前往結帳 ({selectedCount}件商品)
        </button>
      </div>
    </div>
  );
}

import React from 'react';

export function CartItem({ item, isSelected, onSelect, onQuantityChange, onRemove }) {
  // 數量增減處理
  const handleIncrement = () => {
    onQuantityChange(item.productId, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.productId, item.quantity - 1);
    }
  };

  // 選擇狀態變更處理
  const handleSelectChange = (e) => {
    onSelect(item.productId, e.target.checked);
  };

  // 刪除商品處理
  const handleRemove = () => {
    onRemove(item.productId);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      onQuantityChange(item.productId, newQuantity);
    }
  };

  // 計算單價
  const unitPrice = item.price / item.quantity;

  return (
    <div className="grid grid-cols-12 gap-4 p-4 border-b items-center">
      {/* 選擇框 */}
      <div className="col-span-1 flex items-center justify-center">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(item.productId, e.target.checked)}
          className="w-5 h-5"
        />
      </div>

      {/* 商品資訊 */}
      <div className="col-span-5 flex items-center">
        <div className="w-16 h-16 mr-4">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div>
          <p className="font-medium text-gray-800">{item.name}</p>
          <div className="text-xs text-gray-500">
            {item.size === 'M' ? '中杯' : '大杯'} / {item.sugar} / {item.ice}
            {item.toppings?.length > 0 && ` / 加料: ${item.toppings.join(', ')}`}
          </div>
        </div>
      </div>

      {/* 單價 */}
      <div className="col-span-2 text-center">
        NT$ {unitPrice.toFixed(0)}
      </div>

      {/* 數量 */}
      <div className="col-span-2 text-center flex items-center justify-center">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="w-6 h-6 border rounded flex items-center justify-center text-gray-500"
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <input
          type="text"
          value={item.quantity}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (!isNaN(value) && value >= 1) {
              handleQuantityChange(value);
            }
          }}
          className="w-10 mx-2 text-center border rounded"
        />
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="w-6 h-6 border rounded flex items-center justify-center text-gray-500"
        >
          +
        </button>
      </div>

      {/* 小計 */}
      <div className="col-span-1 text-center font-medium">
        NT$ {parseInt(item.price).toFixed(0)}
      </div>

      {/* 操作 */}
      <div className="col-span-1 text-center">
        <button
          onClick={() => onRemove(item.productId)}
          className="text-red-500 hover:text-red-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}

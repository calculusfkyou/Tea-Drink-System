import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function DrinkDetailModal({ product, onClose, isLoggedIn }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedSugar, setSelectedSugar] = useState(null);
  const [selectedIce, setSelectedIce] = useState(null);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // 初始化選項
  useEffect(() => {
    if (product) {
      // 默認選擇中杯(如果有的話)，否則大杯
      const defaultSize = product.priceM !== null ? 'M' : 'L';
      setSelectedSize(defaultSize);

      // 默認糖度和冰塊選第一個選項
      if (product.sugarOptions && product.sugarOptions.length > 0) {
        setSelectedSugar(product.sugarOptions[0]);
      }

      if (product.iceOptions && product.iceOptions.length > 0) {
        setSelectedIce(product.iceOptions[0]);
      }

      // 計算初始價格
      updateTotalPrice(defaultSize, [], quantity);
    }
  }, [product]);

  // 計算總價格的函數
  const updateTotalPrice = (size, toppings, qty) => {
    if (!product) return;

    // 基礎價格 (依據尺寸)
    let basePrice = size === 'M' ? product.priceM : product.priceL;

    // 如果只有一種尺寸價格，使用它
    if (product.priceM === null) basePrice = product.priceL;
    if (product.priceL === null) basePrice = product.priceM;

    // 加料價格 (假設每種加料+10元)
    const toppingPrice = toppings.length * 10;

    // 總價
    const total = (basePrice + toppingPrice) * qty;
    setTotalPrice(total);
  };

  // 處理加料選擇
  const handleToppingToggle = (topping) => {
    const newToppings = selectedToppings.includes(topping)
      ? selectedToppings.filter(item => item !== topping)
      : [...selectedToppings, topping];

    setSelectedToppings(newToppings);
    updateTotalPrice(selectedSize, newToppings, quantity);
  };

  // 處理尺寸變更
  const handleSizeChange = (size) => {
    setSelectedSize(size);
    updateTotalPrice(size, selectedToppings, quantity);
  };

  // 處理數量變更
  const handleQuantityChange = (newQuantity) => {
    const qty = Math.max(1, newQuantity); // 確保數量至少為1
    setQuantity(qty);
    updateTotalPrice(selectedSize, selectedToppings, qty);
  };

  // 處理加入購物車
  const handleAddToCart = () => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }

    const orderItem = {
      productId: product.id,
      name: product.name,
      size: selectedSize,
      sugar: selectedSugar,
      ice: selectedIce,
      quantity,
      toppings: selectedToppings,
      price: totalPrice,
      image: product.image,
      timestamp: Date.now() // 添加時間戳以區分相同商品的不同訂單
    };

    // 獲取現有購物車
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    // 檢查是否有相同商品(完全相同的規格)
    const existingItemIndex = cart.findIndex(item =>
      item.productId === orderItem.productId &&
      item.size === orderItem.size &&
      item.sugar === orderItem.sugar &&
      item.ice === orderItem.ice &&
      JSON.stringify(item.toppings) === JSON.stringify(orderItem.toppings)
    );

    // 如果存在相同商品，更新數量
    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += quantity;
      cart[existingItemIndex].price = parseFloat(cart[existingItemIndex].price) + parseFloat(totalPrice);
    } else {
      cart.push(orderItem);
    }

    // 更新localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // 觸發購物車更新事件
    window.dispatchEvent(new Event('cartUpdated'));

    // 顯示成功提示並關閉彈窗
    alert('成功加入購物車！');
    onClose();
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* 關閉按鈕 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* 飲品詳情 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* 左側：飲品圖片 */}
          <div className="flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-64 object-contain"
            />
          </div>

          {/* 右側：飲品資訊和選項 */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{product.name}</h2>
            {product.description && (
              <p className="text-gray-600 mb-4">{product.description}</p>
            )}
            {product.notes && (
              <p className="text-sm text-red-500 mb-4">{product.notes}</p>
            )}

            {/* 尺寸選擇 */}
            {(product.priceM !== null && product.priceL !== null) && (
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-700 mb-2">尺寸</h3>
                <div className="flex gap-4">
                  <button
                    className={`px-4 py-2 rounded-full ${selectedSize === 'M'
                      ? 'bg-[#5a6440] text-white'
                      : 'bg-gray-200 text-gray-800'}`}
                    onClick={() => handleSizeChange('M')}
                  >
                    中杯 M ${product.priceM}
                  </button>
                  <button
                    className={`px-4 py-2 rounded-full ${selectedSize === 'L'
                      ? 'bg-[#5a6440] text-white'
                      : 'bg-gray-200 text-gray-800'}`}
                    onClick={() => handleSizeChange('L')}
                  >
                    大杯 L ${product.priceL}
                  </button>
                </div>
              </div>
            )}

            {/* 糖度選擇 */}
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-700 mb-2">糖度</h3>
              <div className="flex flex-wrap gap-2">
                {product.sugarOptions?.map((sugar) => (
                  <button
                    key={sugar}
                    className={`px-3 py-1 rounded-full text-sm ${selectedSugar === sugar
                      ? 'bg-[#5a6440] text-white'
                      : 'bg-gray-200 text-gray-800'}`}
                    onClick={() => setSelectedSugar(sugar)}
                  >
                    {sugar}
                  </button>
                ))}
              </div>
            </div>

            {/* 冰塊選擇 */}
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-700 mb-2">冰塊</h3>
              <div className="flex flex-wrap gap-2">
                {product.iceOptions?.map((ice) => (
                  <button
                    key={ice}
                    className={`px-3 py-1 rounded-full text-sm ${selectedIce === ice
                      ? 'bg-[#5a6440] text-white'
                      : 'bg-gray-200 text-gray-800'}`}
                    onClick={() => setSelectedIce(ice)}
                  >
                    {ice}
                  </button>
                ))}
                {product.hotAvailable && (
                  <button
                    className={`px-3 py-1 rounded-full text-sm ${selectedIce === '熱飲'
                      ? 'bg-[#5a6440] text-white'
                      : 'bg-gray-200 text-gray-800'}`}
                    onClick={() => setSelectedIce('熱飲')}
                  >
                    熱飲
                  </button>
                )}
              </div>
            </div>

            {/* 加料選擇 */}
            {product.toppings && product.toppings.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-700 mb-2">加料 (+$10/每項)</h3>
                <div className="flex flex-wrap gap-2">
                  {product.toppings.map((topping) => (
                    <button
                      key={topping}
                      className={`px-3 py-1 rounded-full text-sm ${selectedToppings.includes(topping)
                        ? 'bg-[#5a6440] text-white'
                        : 'bg-gray-200 text-gray-800'}`}
                      onClick={() => handleToppingToggle(topping)}
                    >
                      {topping}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 數量選擇 */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-2">數量</h3>
              <div className="flex items-center">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                  disabled={quantity <= 1}
                >
                  <span className="text-xl">-</span>
                </button>
                <span className="mx-4 text-xl w-8 text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                >
                  <span className="text-xl">+</span>
                </button>
              </div>
            </div>

            {/* 總價和加入購物車按鈕 */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xl font-bold text-red-600 mb-2 sm:mb-0">總價: ${totalPrice}</p>
              <button
                onClick={handleAddToCart}
                className="bg-[#5a6440] hover:bg-[#4a5332] text-white py-2 px-6 rounded-full text-lg"
              >
                加入購物車
              </button>
            </div>
          </div>
        </div>

        {/* 登入提示彈窗 */}
        {showLoginPrompt && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">您尚未登入</h3>
              <p className="text-gray-600 mb-6">請先登入或註冊帳號，才能將商品加入購物車。</p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowLoginPrompt(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  取消
                </button>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-[#5a6440] text-white rounded-md hover:bg-[#4a5332]"
                >
                  前往登入
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

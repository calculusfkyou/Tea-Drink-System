import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { EmptyCart } from '../components/cart/EmptyCart';
import { CartItem } from '../components/cart/CartItem';
import { CartSummary } from '../components/cart/CartSummary';
import { RecommendedProducts } from '../components/cart/RecommendedProducts';

export default function CartPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [couponCode, setCouponCode] = useState('');

  const navigate = useNavigate();

  // 檢查用戶是否登入並獲取購物車數據
  useEffect(() => {
    // 檢查登入狀態
    const userJSON = localStorage.getItem('userDisplay');
    if (!userJSON) {
      // 用戶未登入，跳轉到登入頁面
      navigate('/login', { state: { from: '/cart' } });
      return;
    }

    setIsLoggedIn(true);

    // 讀取購物車數據
    const loadCartData = () => {
      const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
      setCart(cartData);

      // 預設全選所有商品
      setSelectedItems(cartData);
      setIsAllSelected(cartData.length > 0);
    };

    // 初始加載購物車數據
    loadCartData();

    // 監聽購物車更新事件
    const handleCartUpdate = () => {
      loadCartData();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);

    // 清除事件監聽器
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, [navigate]);

  // 處理選擇/取消選擇單個商品
  const handleSelectItem = (productId, isSelected) => {
    if (isSelected) {
      // 添加到已選列表
      const item = cart.find(item =>
        item.productId === productId ||
        item.productId.toString() === productId.toString()
      );
      if (item) {
        setSelectedItems(prev => [...prev, item]);
      }
    } else {
      // 從已選列表中移除
      setSelectedItems(prev => prev.filter(item =>
        item.productId !== productId &&
        item.productId.toString() !== productId.toString()
      ));
    }

    // 更新全選狀態
    setTimeout(() => {
      const updatedSelectedItems = selectedItems.filter(item =>
        cart.some(cartItem => cartItem.productId === item.productId ||
          cartItem.productId.toString() === item.productId.toString())
      );
      setIsAllSelected(updatedSelectedItems.length === cart.length && cart.length > 0);
    }, 0);
  };

  // 處理全選/取消全選
  const handleSelectAll = (isSelected) => {
    setIsAllSelected(isSelected);
    if (isSelected) {
      setSelectedItems([...cart]);
    } else {
      setSelectedItems([]);
    }
  };

  // 更新商品數量
  const handleQuantityChange = (productId, newQuantity) => {
    // 更新購物車
    const updatedCart = cart.map(item => {
      if (item.productId === productId || item.productId.toString() === productId.toString()) {
        const singlePrice = item.price / item.quantity;
        return {
          ...item,
          quantity: newQuantity,
          price: singlePrice * newQuantity // 更新總價
        };
      }
      return item;
    });

    // 更新localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);

    // 更新已選商品
    setSelectedItems(prevSelected => {
      return prevSelected.map(item => {
        if (item.productId === productId || item.productId.toString() === productId.toString()) {
          const singlePrice = item.price / item.quantity;
          return {
            ...item,
            quantity: newQuantity,
            price: singlePrice * newQuantity
          };
        }
        return item;
      });
    });

    // 觸發購物車更新事件
    window.dispatchEvent(new Event('cartUpdated'));
  };

  // 刪除商品
  const handleRemoveItem = (productId) => {
    // 從購物車移除商品
    const updatedCart = cart.filter(item =>
      item.productId !== productId &&
      item.productId.toString() !== productId.toString()
    );

    // 更新localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);

    // 更新已選商品
    setSelectedItems(prevSelected =>
      prevSelected.filter(item =>
        item.productId !== productId &&
        item.productId.toString() !== productId.toString()
      )
    );

    // 更新全選狀態
    setIsAllSelected(updatedCart.length > 0 &&
      selectedItems.filter(item =>
        item.productId !== productId &&
        item.productId.toString() !== productId.toString()
      ).length === updatedCart.length);

    // 觸發購物車更新事件
    window.dispatchEvent(new Event('cartUpdated'));
  };

  // 是否為空購物車
  const isCartEmpty = cart.length === 0;

  // 檢查商品是否被選中
  const isSelected = (productId) => {
    return selectedItems.some(item =>
      item.productId === productId ||
      item.productId.toString() === productId.toString()
    );
  };

  // 處理前往結帳
  const handleCheckout = () => {
    if (selectedItems.length === 0) return;

    // 將所選商品保存到 localStorage
    localStorage.setItem('checkoutItems', JSON.stringify(selectedItems));
    navigate('/checkout');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow container mx-auto px-4 py-8">
        {isCartEmpty ? (
          <EmptyCart />
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* 左側: 商品列表 */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  {/* 標題欄 */}
                  <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 items-center border-b">
                    <div className="col-span-1 flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="w-5 h-5"
                      />
                    </div>
                    <div className="col-span-5 font-medium">商品</div>
                    <div className="col-span-2 text-center font-medium">單價</div>
                    <div className="col-span-2 text-center font-medium">數量</div>
                    <div className="col-span-1 text-center font-medium">小計</div>
                    <div className="col-span-1 text-center font-medium">操作</div>
                  </div>

                  {/* 商品項目 */}
                  {cart.map((item) => (
                    <CartItem
                      key={`${item.productId}-${item.timestamp}`}
                      item={item}
                      isSelected={isSelected(item.productId)}
                      onSelect={handleSelectItem}
                      onQuantityChange={handleQuantityChange}
                      onRemove={handleRemoveItem}
                    />
                  ))}
                </div>
              </div>

              {/* 右側: 結帳摘要 */}
              <div className="lg:col-span-1">
                <CartSummary
                  selectedItems={selectedItems}
                  couponCode={couponCode}
                  setCouponCode={setCouponCode}
                  onCheckout={handleCheckout}
                />
              </div>
            </div>
            {/* 猜你喜歡區塊 - 添加在購物車主內容之後 */}
            <RecommendedProducts cart={cart} />
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export default function CheckoutPage() {
  const [user, setUser] = useState(null);
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [stores, setStores] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [selectedStoreId, setSelectedStoreId] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('自取');
  const [paymentMethod, setPaymentMethod] = useState('現金');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingUserData, setLoadingUserData] = useState(true);
  const [couponCode, setCouponCode] = useState('');

  // 新增地址相關狀態
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    receiverName: '',
    phone: '',
    city: '',
    district: '',
    street: '',
    zipCode: ''
  });
  const [addressError, setAddressError] = useState('');

  const navigate = useNavigate();

  // 計算總金額
  const totalAmount = checkoutItems.reduce((total, item) => {
    return total + parseFloat(item.price);
  }, 0);

  // 獲取用戶數據
  useEffect(() => {
    const userJSON = localStorage.getItem('userDisplay');
    if (!userJSON) {
      navigate('/login');
      return;
    }

    // 從 localStorage 獲取結帳商品
    const items = JSON.parse(localStorage.getItem('checkoutItems') || '[]');
    if (items.length === 0) {
      navigate('/cart');
      return;
    }
    setCheckoutItems(items);

    // 設置用戶數據
    setUser(JSON.parse(userJSON));

    // 獲取用戶地址
    const fetchAddresses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/addresses', {
          method: 'GET',
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          console.log('獲取到的地址數據:', data);

          if (data.data && Array.isArray(data.data)) {
            // 處理地址數據，添加完整地址字段
            const processedAddresses = data.data.map(addr => ({
              ...addr,
              // 確保即使後端數據格式變化，前端也能正確顯示
              fullAddress: `${addr.city || ''}${addr.district || ''}${addr.address || addr.street || ''}`
            }));

            setAddresses(processedAddresses);

            // 優先選擇預設地址，如果沒有則選擇第一個
            const defaultAddress = processedAddresses.find(addr => addr.isDefault);
            if (defaultAddress) {
              setSelectedAddressId(defaultAddress.id);
            } else if (processedAddresses.length > 0) {
              setSelectedAddressId(processedAddresses[0].id);
            }
          } else {
            console.error('地址數據格式錯誤:', data);
            setAddresses([]);
          }
        }
      } catch (error) {
        console.error('獲取地址時發生錯誤:', error);
        setAddresses([]);
      }
    };

    // 獲取門市列表
    const fetchStores = async () => {
      try {
        // 修改為獲取所有門市數據
        const response = await fetch('http://localhost:5000/api/stores?limit=100');

        if (response.ok) {
          const result = await response.json();

          // 處理不同的回應格式
          let storesData;
          if (result.data && Array.isArray(result.data)) {
            storesData = result.data;
          } else if (Array.isArray(result)) {
            storesData = result;
          } else {
            storesData = [];
            console.error('門市數據格式錯誤:', result);
          }

          console.log('獲取到的門市數量:', storesData.length);
          setStores(storesData);

          // 如果有門市數據，設置第一個為默認選擇
          if (storesData.length > 0) {
            setSelectedStoreId(storesData[0].id);
          }
        } else {
          console.error('獲取門市失敗:', response.statusText);
          setStores([]);
        }
      } catch (error) {
        console.error('獲取門市時發生錯誤:', error);
        setStores([]);
      }

      setLoadingUserData(false);
    };

    fetchAddresses();
    fetchStores();
  }, [navigate]);

  // 處理地址表單輸入變化
  const handleAddressInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 處理新增地址提交
  const handleAddAddress = async (e) => {
    e.preventDefault();
    setAddressError('');

    // 簡單驗證
    if (!newAddress.receiverName || !newAddress.phone || !newAddress.city ||
      !newAddress.district || !newAddress.street) {
      setAddressError('請填寫所有必要欄位');
      return;
    }

    try {
      // 構建地址數據 - 修改字段以匹配後端
      const addressData = {
        recipient: newAddress.receiverName,  // 將 receiverName 映射到 recipient
        phone: newAddress.phone,
        city: newAddress.city,
        district: newAddress.district,
        address: newAddress.street,  // 將 street 映射到 address
        zipCode: newAddress.zipCode || '',
        isDefault: addresses.length === 0  // 如果是第一個地址，設為默認
      };

      console.log('發送地址數據:', addressData);

      // 發送請求到後端
      const response = await fetch('http://localhost:5000/api/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(addressData)
      });

      const result = await response.json();
      console.log('地址添加結果:', result);

      if (response.ok) {
        // 添加新地址到地址列表並選中它
        const newAddressWithId = {
          ...addressData,
          id: result.data.id,
          fullAddress: `${addressData.city}${addressData.district}${addressData.address}`
        };

        setAddresses([...addresses, newAddressWithId]);
        setSelectedAddressId(result.data.id);
        setShowAddAddress(false);

        // 重置表單
        setNewAddress({
          receiverName: '',
          phone: '',
          city: '',
          district: '',
          street: '',
          zipCode: ''
        });
      } else {
        setAddressError(result.message || '新增地址失敗');
      }
    } catch (error) {
      console.error('新增地址時發生錯誤:', error);
      setAddressError('新增地址時發生錯誤');
    }
  };

  // 處理訂單提交
  const handleSubmitOrder = async () => {
    if (loading) return;

    if (deliveryMethod === '外送' && !selectedAddressId) {
      alert('請選擇配送地址');
      return;
    }

    if (deliveryMethod === '自取' && !selectedStoreId) {
      alert('請選擇自取門市');
      return;
    }

    try {
      setLoading(true);

      // 構建訂單數據
      const selectedStore = deliveryMethod === '自取' ?
        stores.find(store => store.id === parseInt(selectedStoreId)) : null;

      const orderData = {
        cartItems: checkoutItems,
        deliveryMethod,
        paymentMethod,
        addressId: deliveryMethod === '外送' ? parseInt(selectedAddressId) : null,
        storeId: deliveryMethod === '自取' ? parseInt(selectedStoreId) : null,
        storeName: deliveryMethod === '自取' && selectedStore ? selectedStore.name : null,
        couponCode: couponCode || null,
        notes
      };

      // 發送訂單到後端
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(orderData)
      });

      const result = await response.json();

      if (response.ok) {
        // 清空購物車中已結帳的商品
        const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
        const remainingItems = cartItems.filter(cartItem =>
          !checkoutItems.some(item => item.productId === cartItem.productId)
        );

        localStorage.setItem('cart', JSON.stringify(remainingItems));
        localStorage.removeItem('checkoutItems');

        // 導航到訂單成功頁面
        navigate(`/order-success/${result.data.orderNumber}`);
      } else {
        alert(`訂單提交失敗: ${result.message}`);
      }
    } catch (error) {
      console.error('提交訂單時發生錯誤:', error);
      alert('訂單提交過程中發生錯誤，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  if (loadingUserData) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#5a6440] mx-auto mb-4"></div>
            <p className="text-gray-600">載入中...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow w-full py-8">
        <div className="max-w-5xl mx-auto px-4">
          {/* <h1 className="text-2xl font-semibold text-gray-800 mb-8">結帳</h1> */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 左側：訂單資訊和配送方式 */}
            <div className="lg:col-span-2 space-y-6">
              {/* 訂單商品列表 */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-[#5a6440] mb-4 pb-2 border-b-2 border-[#5a6440] inline-block">訂單商品</h2>
                <div className="space-y-4">
                  {checkoutItems.map(item => (
                    <div key={item.productId} className="flex items-center">
                      <div className="w-14 h-14 flex-shrink-0 mr-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-gray-500">
                          {item.size === 'M' ? '中杯' : '大杯'} / {item.sugar} / {item.ice}
                          {item.toppings?.length > 0 && ` / 加料: ${item.toppings.join(', ')}`}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 mr-4">x{item.quantity}</div>
                      <div className="font-medium">NT$ {item.price}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 配送方式 */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-[#5a6440] mb-4 pb-2 border-b-2 border-[#5a6440] inline-block">配送方式</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="delivery-pickup"
                      name="delivery-method"
                      value="自取"
                      checked={deliveryMethod === '自取'}
                      onChange={() => setDeliveryMethod('自取')}
                      className="mr-2"
                    />
                    <label htmlFor="delivery-pickup" className="text-gray-700">門市自取</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="delivery-ship"
                      name="delivery-method"
                      value="外送"
                      checked={deliveryMethod === '外送'}
                      onChange={() => setDeliveryMethod('外送')}
                      className="mr-2"
                    />
                    <label htmlFor="delivery-ship" className="text-gray-700">外送到府</label>
                  </div>

                  {/* 根據選擇的配送方式顯示不同的表單 */}
                  {deliveryMethod === '自取' ? (
                    <div className="mt-4">
                      <label htmlFor="store" className="block text-gray-700 mb-2">選擇門市</label>
                      {stores && stores.length > 0 ? (
                        <select
                          id="store"
                          value={selectedStoreId}
                          onChange={(e) => setSelectedStoreId(e.target.value)}
                          className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#5a6440]"
                        >
                          {stores.map(store => (
                            <option key={store.id} value={store.id}>
                              {store.name} - {store.address}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <p className="text-red-500">暫無可用門市，請選擇外送或稍後再試</p>
                      )}
                    </div>
                  ) : (
                    <div className="mt-4">
                      <label htmlFor="address" className="block text-gray-700 mb-2">選擇配送地址</label>
                      {!showAddAddress ? (
                        <>
                          {addresses.length > 0 ? (
                            <div className="mb-4">
                              <select
                                id="address"
                                value={selectedAddressId}
                                onChange={(e) => setSelectedAddressId(e.target.value)}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#5a6440]"
                              >
                                {addresses.map(address => (
                                  <option key={address.id} value={address.id}>
                                    {address.receiverName} - {address.fullAddress}
                                  </option>
                                ))}
                              </select>
                            </div>
                          ) : (
                            <p className="text-orange-500 mb-4">您尚未新增任何地址。請使用下方按鈕新增。</p>
                          )}
                          <button
                            type="button"
                            onClick={() => setShowAddAddress(true)}
                            className="text-white bg-[#5a6440] px-4 py-2 rounded-md hover:bg-[#4a5332]"
                          >
                            新增配送地址
                          </button>
                        </>
                      ) : (
                        <div className="border rounded-md p-4 bg-gray-50">
                          <h3 className="font-medium text-gray-800 mb-4">新增配送地址</h3>

                          {addressError && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                              {addressError}
                            </div>
                          )}

                          <form onSubmit={handleAddAddress}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <label htmlFor="receiverName" className="block text-sm text-gray-700 mb-1">收件人姓名 *</label>
                                <input
                                  type="text"
                                  id="receiverName"
                                  name="receiverName"
                                  value={newAddress.receiverName}
                                  onChange={handleAddressInputChange}
                                  className="w-full p-2 border rounded-md"
                                  required
                                />
                              </div>

                              <div>
                                <label htmlFor="phone" className="block text-sm text-gray-700 mb-1">聯絡電話 *</label>
                                <input
                                  type="tel"
                                  id="phone"
                                  name="phone"
                                  value={newAddress.phone}
                                  onChange={handleAddressInputChange}
                                  className="w-full p-2 border rounded-md"
                                  required
                                />
                              </div>

                              <div>
                                <label htmlFor="city" className="block text-sm text-gray-700 mb-1">縣市 *</label>
                                <input
                                  type="text"
                                  id="city"
                                  name="city"
                                  value={newAddress.city}
                                  onChange={handleAddressInputChange}
                                  className="w-full p-2 border rounded-md"
                                  required
                                />
                              </div>

                              <div>
                                <label htmlFor="district" className="block text-sm text-gray-700 mb-1">區域 *</label>
                                <input
                                  type="text"
                                  id="district"
                                  name="district"
                                  value={newAddress.district}
                                  onChange={handleAddressInputChange}
                                  className="w-full p-2 border rounded-md"
                                  required
                                />
                              </div>

                              <div className="md:col-span-2">
                                <label htmlFor="street" className="block text-sm text-gray-700 mb-1">街道地址 *</label>
                                <input
                                  type="text"
                                  id="street"
                                  name="street"
                                  value={newAddress.street}
                                  onChange={handleAddressInputChange}
                                  className="w-full p-2 border rounded-md"
                                  required
                                />
                              </div>

                              <div>
                                <label htmlFor="zipCode" className="block text-sm text-gray-700 mb-1">郵遞區號</label>
                                <input
                                  type="text"
                                  id="zipCode"
                                  name="zipCode"
                                  value={newAddress.zipCode}
                                  onChange={handleAddressInputChange}
                                  className="w-full p-2 border rounded-md"
                                />
                              </div>
                            </div>

                            <div className="flex justify-end space-x-3">
                              <button
                                type="button"
                                onClick={() => setShowAddAddress(false)}
                                className="px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-100"
                              >
                                取消
                              </button>
                              <button
                                type="submit"
                                className="px-4 py-2 bg-[#5a6440] text-white rounded-md hover:bg-[#4a5332]"
                              >
                                保存地址
                              </button>
                            </div>
                          </form>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* 付款方式 */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-[#5a6440] mb-4 pb-2 border-b-2 border-[#5a6440] inline-block">付款方式</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="payment-cash"
                      name="payment-method"
                      value="現金"
                      checked={paymentMethod === '現金'}
                      onChange={() => setPaymentMethod('現金')}
                      className="mr-2"
                    />
                    <label htmlFor="payment-cash" className="text-gray-700">現金付款</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="payment-credit"
                      name="payment-method"
                      value="信用卡"
                      checked={paymentMethod === '信用卡'}
                      onChange={() => setPaymentMethod('信用卡')}
                      className="mr-2"
                    />
                    <label htmlFor="payment-credit" className="text-gray-700">信用卡支付</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="payment-mobile"
                      name="payment-method"
                      value="行動支付"
                      checked={paymentMethod === '行動支付'}
                      onChange={() => setPaymentMethod('行動支付')}
                      className="mr-2"
                    />
                    <label htmlFor="payment-mobile" className="text-gray-700">行動支付</label>
                  </div>
                </div>
              </div>

              {/* 備註 */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-[#5a6440] mb-4 pb-2 border-b-2 border-[#5a6440] inline-block">備註</h2>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="有任何特殊要求請在這裡留言"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#5a6440] h-32"
                ></textarea>
              </div>
            </div>

            {/* 右側：訂單摘要 */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-24">
                <h2 className="text-xl font-bold text-[#5a6440] mb-4 pb-2 border-b-2 border-[#5a6440] inline-block">訂單摘要</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>商品總額</span>
                    <span>NT$ {totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>運費</span>
                    <span>NT$ {deliveryMethod === '外送' ? 30 : 0}</span>
                  </div>

                  {/* 優惠碼輸入 */}
                  <div className="pt-3 border-t">
                    <div className="flex items-center mb-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="優惠碼"
                        className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#5a6440]"
                      />
                      <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300">
                        套用
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-medium">總計</span>
                    <span className="text-xl font-bold text-red-600">
                      NT$ {totalAmount + (deliveryMethod === '外送' ? 30 : 0)}
                    </span>
                  </div>

                  <button
                    onClick={handleSubmitOrder}
                    disabled={loading}
                    className="w-full py-3 bg-[#5a6440] text-white rounded-md hover:bg-[#4a5332] transition-colors"
                  >
                    {loading ? '處理中...' : '確認訂單'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

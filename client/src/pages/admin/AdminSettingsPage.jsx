import React, { useState, useEffect, useRef } from 'react';
import { FiSave, FiGlobe, FiPhone, FiMail, FiMapPin, FiClock,
         FiDollarSign, FiInstagram, FiFacebook, FiGithub, FiSettings, FiImage, FiInfo, FiTag, FiUpload } from 'react-icons/fi';
import AdminLayout from '../../components/admin/AdminLayout';

// Toast 提示元件
function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-5 right-5 p-4 rounded-md shadow-md z-50 ${
      type === 'success' ? 'bg-green-50 text-green-700 border-l-4 border-green-500' :
      'bg-red-50 text-red-700 border-l-4 border-red-500'
    }`}>
      <div className="flex justify-between">
        <p>{message}</p>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 ml-4">×</button>
      </div>
    </div>
  );
}

export default function AdminSettingsPage() {
  // 設定分類
  const [activeTab, setActiveTab] = useState('general');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // 圖片上傳用的 ref
  const logoInputRef = useRef(null);
  const faviconInputRef = useRef(null);

  // 設定資料
  const [settings, setSettings] = useState({
    general: {
      siteName: '',
      siteDescription: '',
      logo: '',
      favicon: ''
    },
    contact: {
      email: '',
      phone: '',
      address: '',
      businessHours: ''
    },
    social: {
      facebook: '',
      instagram: '',
      github: '',  // 改為GitHub
    },
    order: {
      minimumOrderAmount: 0,
      deliveryFee: 0,
      orderNote: '',
      acceptSelfPickup: true,
      acceptDelivery: true
    },
    store: {
      mainStoreName: '',
      mainStoreAddress: '',
      mainStorePhone: '',
      mainStoreHours: '',
      branchStores: []
    }
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 載入設定
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        // 在真實情境中，這會是一個 API 請求
        // const response = await fetch('http://localhost:5000/api/settings', {
        //   credentials: 'include'
        // });

        // if (!response.ok) {
        //   throw new Error('獲取設定失敗');
        // }

        // const result = await response.json();
        // setSettings(result.data);

        // 目前使用模擬資料
        const mockResponse = {
          general: {
            siteName: '摸摸茶飲',
            siteDescription: '提供各種新鮮手工製作的茶飲與特調飲品',
            logo: '/assets/Logo.png',
            favicon: '/favicon.ico'
          },
          contact: {
            email: 'contact@momotea.com',
            phone: '02-1234-5678',
            address: '台北市信義區信義路五段7號',
            businessHours: '週一至週五 9:00-21:00，週六至週日 10:00-22:00'
          },
          social: {
            facebook: 'https://facebook.com/momotea',
            instagram: 'https://instagram.com/momotea',
            github: 'https://github.com/CalculusFkyou'
          },
          order: {
            minimumOrderAmount: 150,
            deliveryFee: 60,
            orderNote: '外送服務僅限方圓3公里內',
            acceptSelfPickup: true,
            acceptDelivery: true
          },
          store: {
            mainStoreName: '摸摸茶飲 信義總店',
            mainStoreAddress: '台北市信義區信義路五段7號',
            mainStorePhone: '02-1234-5678',
            mainStoreHours: '週一至週日 9:00-21:00',
            branchStores: [
              {
                id: 1,
                name: '摸摸茶飲 忠孝店',
                address: '台北市大安區忠孝東路四段100號',
                phone: '02-2345-6789',
                hours: '週一至週日 10:00-22:00'
              },
              {
                id: 2,
                name: '摸摸茶飲 西門店',
                address: '台北市萬華區西寧南路70號',
                phone: '02-3456-7890',
                hours: '週一至週日 11:00-22:00'
              }
            ]
          }
        };

        // 模擬 API 延遲
        setTimeout(() => {
          setSettings(mockResponse);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('獲取設定失敗:', error);
        showToast('載入設定資料時發生錯誤，請稍後再試', 'error');
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // 處理設定變更
  const handleChange = (section, field, value) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [section]: {
        ...prevSettings[section],
        [field]: value
      }
    }));
  };

  // 處理分店資料變更
  const handleBranchStoreChange = (index, field, value) => {
    setSettings(prevSettings => {
      const updatedBranchStores = [...prevSettings.store.branchStores];
      updatedBranchStores[index] = {
        ...updatedBranchStores[index],
        [field]: value
      };

      return {
        ...prevSettings,
        store: {
          ...prevSettings.store,
          branchStores: updatedBranchStores
        }
      };
    });
  };

  // 新增分店
  const handleAddBranchStore = () => {
    setSettings(prevSettings => {
      const newStore = {
        id: Date.now(), // 臨時 ID
        name: '',
        address: '',
        phone: '',
        hours: ''
      };

      return {
        ...prevSettings,
        store: {
          ...prevSettings.store,
          branchStores: [...prevSettings.store.branchStores, newStore]
        }
      };
    });
  };

  // 刪除分店
  const handleRemoveBranchStore = (index) => {
    setSettings(prevSettings => {
      const updatedBranchStores = prevSettings.store.branchStores.filter((_, i) => i !== index);

      return {
        ...prevSettings,
        store: {
          ...prevSettings.store,
          branchStores: updatedBranchStores
        }
      };
    });
  };

  // 處理圖片上傳
  const handleImageUpload = (section, field, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      handleChange(section, field, event.target.result);
    };
    reader.readAsDataURL(file);
  };

  // 觸發文件選擇
  const triggerFileInput = (inputRef) => {
    inputRef.current.click();
  };

  // 處理設定儲存
  const handleSave = async () => {
    try {
      setSaving(true);

      // 在真實情境中，這會是一個 API 請求
      // const response = await fetch('http://localhost:5000/api/settings', {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   credentials: 'include',
      //   body: JSON.stringify(settings)
      // });

      // if (!response.ok) {
      //   throw new Error('儲存設定失敗');
      // }

      // 模擬 API 延遲
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 更新 Footer 中的社群媒體連結
      // 在實際應用中，這可能通過全局狀態管理或重新載入頁面來實現
      // 此處僅為示意，表示我們會進行這樣的更新
      console.log('社群媒體連結已更新:', settings.social);

      // 更新網站 favicon (在實際應用中)
      if (settings.general.favicon && settings.general.favicon.startsWith('data:')) {
        const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = settings.general.favicon;
        document.getElementsByTagName('head')[0].appendChild(link);
      }

      showToast('設定已成功儲存！網站圖標和社群媒體連結已更新', 'success');
    } catch (error) {
      console.error('儲存設定失敗:', error);
      showToast('儲存設定時發生錯誤，請稍後再試', 'error');
    } finally {
      setSaving(false);
    }
  };

  // 顯示通知
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  // 關閉通知
  const hideToast = () => {
    setToast({ ...toast, show: false });
  };

  // Tab 標籤設定
  const tabs = [
    { id: 'general', name: '一般設定', icon: FiSettings },
    { id: 'contact', name: '聯絡資訊', icon: FiPhone },
    { id: 'social', name: '社群媒體', icon: FiFacebook },
    { id: 'order', name: '訂單設定', icon: FiTag },
    { id: 'store', name: '店鋪設定', icon: FiMapPin }
  ];

  return (
    <AdminLayout>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}

      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">網站設定</h2>
        <button
          onClick={handleSave}
          disabled={loading || saving}
          className={`px-4 py-2 rounded flex items-center ${saving || loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-[#5a6440] hover:bg-[#4a5332]'} text-white`}
        >
          {saving ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              儲存中...
            </>
          ) : (
            <>
              <FiSave className="mr-2" /> 儲存設定
            </>
          )}
        </button>
      </div>

      {loading ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <div className="flex justify-center">
            <svg className="animate-spin h-8 w-8 text-[#5a6440]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="mt-2 text-gray-600">載入設定中...</p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          {/* 側邊標籤欄 */}
          <div className="md:w-64 shrink-0">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <ul>
                {tabs.map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-left ${
                        activeTab === tab.id
                          ? 'bg-[#5a6440] text-white'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <tab.icon className={`mr-2 ${activeTab === tab.id ? 'text-white' : 'text-[#5a6440]'}`} />
                      {tab.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 設定內容 */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow p-6">
              {/* 一般設定 */}
              {activeTab === 'general' && (
                <div>
                  <h3 className="text-lg font-medium mb-4">一般設定</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        網站名稱
                      </label>
                      <input
                        type="text"
                        value={settings.general.siteName}
                        onChange={(e) => handleChange('general', 'siteName', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a6440] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        網站簡介
                      </label>
                      <textarea
                        value={settings.general.siteDescription}
                        onChange={(e) => handleChange('general', 'siteDescription', e.target.value)}
                        rows="3"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a6440] focus:border-transparent"
                      ></textarea>
                    </div>

                    {/* 網站 Logo 上傳 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        網站 Logo
                      </label>
                      <div className="flex flex-col space-y-2">
                        {settings.general.logo && (
                          <div className="mb-2">
                            <img
                              src={settings.general.logo}
                              alt="Logo Preview"
                              className="h-16 object-contain"
                              onError={(e) => e.target.src = 'https://via.placeholder.com/200x80?text=Logo+Preview'}
                            />
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => triggerFileInput(logoInputRef)}
                          className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200"
                        >
                          <FiUpload className="mr-2" /> 上傳 Logo 圖片
                        </button>
                        <input
                          ref={logoInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload('general', 'logo', e)}
                          className="hidden"
                        />
                        <p className="text-sm text-gray-500">
                          建議尺寸：200 x 80 像素，支援格式：PNG, JPG
                        </p>
                      </div>
                    </div>

                    {/* 網站 Favicon 上傳 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        網站圖示 (Favicon)
                      </label>
                      <div className="flex flex-col space-y-2">
                        {settings.general.favicon && (
                          <div className="mb-2">
                            <img
                              src={settings.general.favicon}
                              alt="Favicon Preview"
                              className="h-8 w-8 object-contain border border-gray-200"
                              onError={(e) => e.target.src = 'https://via.placeholder.com/32x32?text=Icon'}
                            />
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => triggerFileInput(faviconInputRef)}
                          className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200"
                        >
                          <FiUpload className="mr-2" /> 上傳網站圖示
                        </button>
                        <input
                          ref={faviconInputRef}
                          type="file"
                          accept="image/x-icon,image/png,image/jpeg"
                          onChange={(e) => handleImageUpload('general', 'favicon', e)}
                          className="hidden"
                        />
                        <p className="text-sm text-gray-500">
                          建議尺寸：32 x 32 像素，支援格式：ICO, PNG, JPG
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 聯絡資訊 */}
              {activeTab === 'contact' && (
                <div>
                  <h3 className="text-lg font-medium mb-4">聯絡資訊</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <FiMail className="inline mr-1" /> 電子郵件
                      </label>
                      <input
                        type="email"
                        value={settings.contact.email}
                        onChange={(e) => handleChange('contact', 'email', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a6440] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <FiPhone className="inline mr-1" /> 電話號碼
                      </label>
                      <input
                        type="tel"
                        value={settings.contact.phone}
                        onChange={(e) => handleChange('contact', 'phone', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a6440] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <FiMapPin className="inline mr-1" /> 公司地址
                      </label>
                      <input
                        type="text"
                        value={settings.contact.address}
                        onChange={(e) => handleChange('contact', 'address', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a6440] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <FiClock className="inline mr-1" /> 客服時間
                      </label>
                      <textarea
                        value={settings.contact.businessHours}
                        onChange={(e) => handleChange('contact', 'businessHours', e.target.value)}
                        rows="3"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a6440] focus:border-transparent"
                        placeholder="例如：週一至週五 9:00-18:00，週六至週日 10:00-17:00"
                      ></textarea>
                    </div>
                  </div>
                </div>
              )}

              {/* 社群媒體 - 修改為與 Footer 一致 */}
              {activeTab === 'social' && (
                <div>
                  <h3 className="text-lg font-medium mb-4">社群媒體連結</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <FiFacebook className="inline mr-1 text-blue-600" /> Facebook 連結
                      </label>
                      <input
                        type="url"
                        value={settings.social.facebook}
                        onChange={(e) => handleChange('social', 'facebook', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a6440] focus:border-transparent"
                        placeholder="https://facebook.com/yourpage"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <FiInstagram className="inline mr-1 text-pink-600" /> Instagram 連結
                      </label>
                      <input
                        type="url"
                        value={settings.social.instagram}
                        onChange={(e) => handleChange('social', 'instagram', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a6440] focus:border-transparent"
                        placeholder="https://instagram.com/youraccount"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <FiGithub className="inline mr-1 text-gray-800" /> GitHub 連結
                      </label>
                      <input
                        type="url"
                        value={settings.social.github}
                        onChange={(e) => handleChange('social', 'github', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a6440] focus:border-transparent"
                        placeholder="https://github.com/youraccount"
                      />
                    </div>

                    <div className="bg-blue-50 p-4 rounded-md">
                      <p className="text-sm text-blue-600">
                        <strong>提示:</strong> 這些社群媒體連結將直接顯示在網站頁尾。設定後保存即可立即生效。
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 訂單設定 */}
              {activeTab === 'order' && (
                <div>
                  <h3 className="text-lg font-medium mb-4">訂單設定</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <FiDollarSign className="inline mr-1" /> 最低訂購金額 (NT$)
                      </label>
                      <input
                        type="number"
                        value={settings.order.minimumOrderAmount}
                        onChange={(e) => handleChange('order', 'minimumOrderAmount', Number(e.target.value))}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a6440] focus:border-transparent"
                        min="0"
                        step="10"
                      />
                      <p className="mt-1 text-sm text-gray-500">設為 0 表示無最低消費限制</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <FiDollarSign className="inline mr-1" /> 外送費用 (NT$)
                      </label>
                      <input
                        type="number"
                        value={settings.order.deliveryFee}
                        onChange={(e) => handleChange('order', 'deliveryFee', Number(e.target.value))}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a6440] focus:border-transparent"
                        min="0"
                        step="10"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <FiInfo className="inline mr-1" /> 訂單備註
                      </label>
                      <textarea
                        value={settings.order.orderNote}
                        onChange={(e) => handleChange('order', 'orderNote', e.target.value)}
                        rows="3"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a6440] focus:border-transparent"
                        placeholder="例如：外送服務僅限方圓3公里內"
                      ></textarea>
                    </div>

                    <div className="flex space-x-6">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="acceptSelfPickup"
                          checked={settings.order.acceptSelfPickup}
                          onChange={(e) => handleChange('order', 'acceptSelfPickup', e.target.checked)}
                          className="h-4 w-4 text-[#5a6440] focus:ring-[#5a6440] border-gray-300 rounded"
                        />
                        <label htmlFor="acceptSelfPickup" className="ml-2 block text-sm text-gray-700">
                          接受門市自取
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="acceptDelivery"
                          checked={settings.order.acceptDelivery}
                          onChange={(e) => handleChange('order', 'acceptDelivery', e.target.checked)}
                          className="h-4 w-4 text-[#5a6440] focus:ring-[#5a6440] border-gray-300 rounded"
                        />
                        <label htmlFor="acceptDelivery" className="ml-2 block text-sm text-gray-700">
                          接受外送服務
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 店鋪設定 */}
              {activeTab === 'store' && (
                <div>
                  <h3 className="text-lg font-medium mb-4">主要門市設定</h3>

                  <div className="space-y-4 mb-8">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        主門市名稱
                      </label>
                      <input
                        type="text"
                        value={settings.store.mainStoreName}
                        onChange={(e) => handleChange('store', 'mainStoreName', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a6440] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        主門市地址
                      </label>
                      <input
                        type="text"
                        value={settings.store.mainStoreAddress}
                        onChange={(e) => handleChange('store', 'mainStoreAddress', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a6440] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        主門市電話
                      </label>
                      <input
                        type="text"
                        value={settings.store.mainStorePhone}
                        onChange={(e) => handleChange('store', 'mainStorePhone', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a6440] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        主門市營業時間
                      </label>
                      <textarea
                        value={settings.store.mainStoreHours}
                        onChange={(e) => handleChange('store', 'mainStoreHours', e.target.value)}
                        rows="2"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a6440] focus:border-transparent"
                      ></textarea>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">分店管理</h3>
                      <button
                        type="button"
                        onClick={handleAddBranchStore}
                        className="px-3 py-1 bg-[#5a6440] text-white text-sm rounded-md hover:bg-[#47512f]"
                      >
                        新增分店
                      </button>
                    </div>

                    {settings.store.branchStores.length === 0 ? (
                      <div className="text-center py-4 text-gray-500 bg-gray-50 rounded-md">
                        尚未設置分店。點擊「新增分店」按鈕開始添加。
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {settings.store.branchStores.map((store, index) => (
                          <div key={store.id} className="border border-gray-200 rounded-md p-4 relative">
                            <button
                              type="button"
                              onClick={() => handleRemoveBranchStore(index)}
                              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                              title="刪除分店"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  分店名稱
                                </label>
                                <input
                                  type="text"
                                  value={store.name}
                                  onChange={(e) => handleBranchStoreChange(index, 'name', e.target.value)}
                                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a6440] focus:border-transparent"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  分店電話
                                </label>
                                <input
                                  type="text"
                                  value={store.phone}
                                  onChange={(e) => handleBranchStoreChange(index, 'phone', e.target.value)}
                                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a6440] focus:border-transparent"
                                />
                              </div>

                              <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  分店地址
                                </label>
                                <input
                                  type="text"
                                  value={store.address}
                                  onChange={(e) => handleBranchStoreChange(index, 'address', e.target.value)}
                                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a6440] focus:border-transparent"
                                />
                              </div>

                              <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  營業時間
                                </label>
                                <input
                                  type="text"
                                  value={store.hours}
                                  onChange={(e) => handleBranchStoreChange(index, 'hours', e.target.value)}
                                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a6440] focus:border-transparent"
                                  placeholder="例如: 週一至週日 10:00-21:00"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

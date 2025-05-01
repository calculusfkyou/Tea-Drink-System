import React, { useState, useEffect } from 'react';

export default function AddressSection({ user }) {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);

  const [formData, setFormData] = useState({
    nickname: '',
    recipient: '',
    phone: '',
    city: '',
    district: '',
    address: '',
    isDefault: false
  });

  // 模擬獲取地址數據
  useEffect(() => {
    // 假設的地址數據
    const mockAddresses = [
      {
        id: '1',
        nickname: '家',
        recipient: '王小明',
        phone: '0912345678',
        city: '台北市',
        district: '大安區',
        address: '忠孝東路四段2號5樓',
        isDefault: true
      },
      {
        id: '2',
        nickname: '公司',
        recipient: '王小明',
        phone: '0923456789',
        city: '台北市',
        district: '信義區',
        address: '松仁路100號',
        isDefault: false
      }
    ];

    setTimeout(() => {
      setAddresses(mockAddresses);
      setLoading(false);
    }, 1000); // 模擬載入延遲
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddClick = () => {
    setFormData({
      nickname: '',
      recipient: '',
      phone: '',
      city: '',
      district: '',
      address: '',
      isDefault: false
    });
    setShowForm(true);
    setEditingAddressId(null);
  };

  const handleEditClick = (address) => {
    setFormData({
      nickname: address.nickname || '',
      recipient: address.recipient || '',
      phone: address.phone || '',
      city: address.city || '',
      district: address.district || '',
      address: address.address || '',
      isDefault: address.isDefault || false
    });
    setShowForm(true);
    setEditingAddressId(address.id);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('確定要刪除這個地址嗎？')) {
      // 模擬刪除操作
      setAddresses(prev => prev.filter(address => address.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 模擬提交表單
    if (editingAddressId) {
      // 更新地址
      setAddresses(prev =>
        prev.map(address =>
          address.id === editingAddressId
            ? { ...address, ...formData }
            : address
        )
      );
    } else {
      // 添加新地址
      const newAddress = {
        ...formData,
        id: String(Date.now()) // 模擬生成ID
      };
      setAddresses(prev => [...prev, newAddress]);
    }

    setShowForm(false);
    setEditingAddressId(null);
  };

  if (loading) {
    return <div className="text-center py-8">載入地址中...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">配送地址</h2>
        {!showForm && (
          <button
            onClick={handleAddClick}
            className="px-3 py-1 bg-[#4a5332] text-white rounded hover:bg-[#3c4c31]"
          >
            添加新地址
          </button>
        )}
      </div>

      {showForm ? (
        <form onSubmit={handleSubmit} className="border rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="nickname">地址標籤</label>
              <input
                id="nickname"
                name="nickname"
                type="text"
                value={formData.nickname}
                onChange={handleInputChange}
                placeholder="例如：家、公司"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#4a5332]"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1" htmlFor="recipient">收件人</label>
              <input
                id="recipient"
                name="recipient"
                type="text"
                value={formData.recipient}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#4a5332]"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1" htmlFor="phone">聯絡電話</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#4a5332]"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1" htmlFor="city">縣市</label>
              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#4a5332]"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1" htmlFor="district">區域</label>
              <input
                id="district"
                name="district"
                type="text"
                value={formData.district}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#4a5332]"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1" htmlFor="address">詳細地址</label>
              <input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#4a5332]"
                required
              />
            </div>
          </div>

          <div className="mt-4 flex items-center">
            <input
              id="isDefault"
              name="isDefault"
              type="checkbox"
              checked={formData.isDefault}
              onChange={handleInputChange}
              className="h-4 w-4 text-[#4a5332] border-gray-300 rounded focus:ring-[#4a5332]"
            />
            <label htmlFor="isDefault" className="ml-2 text-gray-700">
              設為預設地址
            </label>
          </div>

          <div className="mt-6 flex space-x-3">
            <button
              type="submit"
              className="px-4 py-2 bg-[#4a5332] text-white rounded hover:bg-[#3c4c31]"
            >
              {editingAddressId ? '更新地址' : '添加地址'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingAddressId(null);
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              取消
            </button>
          </div>
        </form>
      ) : addresses.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          您還沒有添加任何配送地址
        </div>
      ) : (
        <div className="space-y-4">
          {addresses.map(address => (
            <div key={address.id} className="border rounded-lg p-4 relative">
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium">
                      {address.nickname && `${address.nickname} - `}{address.recipient}
                    </h3>
                    {address.isDefault && (
                      <span className="ml-2 px-2 py-0.5 bg-[#4a5332] text-white text-xs rounded-full">
                        預設
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500">{address.phone}</p>
                  <p>{address.city}{address.district}{address.address}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEditClick(address)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    編輯
                  </button>
                  <button
                    onClick={() => handleDeleteClick(address.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    刪除
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

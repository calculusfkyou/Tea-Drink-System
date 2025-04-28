import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { StoreCard } from '../../components/stores/StoreCard';
import { RegionTabs } from '../../components/stores/RegionTabs';

export default function LocationsPage() {
  const [stores, setStores] = useState([]);
  const [regions, setRegions] = useState(['全部']);
  const [activeRegion, setActiveRegion] = useState('全部');
  const [isLoading, setIsLoading] = useState(true);

  // 獲取地區和門市資料
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // 獲取所有地區
        const regionsResponse = await axios.get('/api/stores/regions');
        setRegions(regionsResponse.data);

        // 獲取門市資料
        const storesResponse = await axios.get('/api/stores', {
          params: { region: activeRegion !== '全部' ? activeRegion : '' }
        });
        setStores(storesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // 使用靜態資料作為備用
        setRegions(['全部', '基隆', '台北', '新北', '桃園', '新竹', '苗栗', '台中', '彰化', '雲林', '嘉義', '台南', '高雄', '宜蘭']);
        setStores([
          // 這裡可以放一些靜態資料，與storeModel.js中的結構相同
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeRegion]);

  // 處理地區變更
  const handleRegionChange = (region) => {
    setActiveRegion(region);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* 頁面橫幅 */}
      <div className="relative">
        <div className="h-64 overflow-hidden">
          {/* <img
            src="/assets/banners/locations-banner.jpg"
            alt="門市資訊"
            className="w-full h-full object-cover"
          /> */}
          <div className="bg-gray-50 py-16 mb-8">
            <div className="text-center">
              <h1 className="text-4xl font-semibold text-gray-800">門市資訊</h1>
              <p className="text-xl font-serif text-gray-500 tracking-wider mt-2">LOCATIONS</p>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* 地區選擇器 */}
          <RegionTabs
            regions={regions}
            activeRegion={activeRegion}
            onChange={handleRegionChange}
          />

          {/* 門市列表 */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-100 h-64 rounded animate-pulse"></div>
              ))}
            </div>
          ) : stores.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stores.map((store) => (
                <StoreCard
                  key={store.id}
                  id={store.id}
                  name={store.name}
                  address={store.address}
                  phone={store.phone}
                  hours={store.hours}
                  image={store.image}
                  isNew={store.isNew}
                  location={store.location}
                  mapLink={store.mapLink}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">此區域目前沒有門市</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

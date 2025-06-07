import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// 定義 Store 模型
const Store = sequelize.define('Store', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: '門市名稱'
  },
  region: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: '地區'
  },
  address: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '詳細地址'
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
    comment: '聯絡電話'
  },
  weekday_hours: {
    type: DataTypes.STRING(100),
    comment: '平日營業時間'
  },
  weekend_hours: {
    type: DataTypes.STRING(100),
    comment: '週末營業時間'
  },
  default_hours: {
    type: DataTypes.STRING(100),
    comment: '預設營業時間(若無分平日週末)'
  },
  note: {
    type: DataTypes.TEXT,
    comment: '營業備註'
  },
  image: {
    type: DataTypes.STRING(255),
    comment: '門市外觀圖片路徑'
  },
  detail_image: {
    type: DataTypes.STRING(255),
    comment: '門市詳細圖片路徑'
  },
  latitude: {
    type: DataTypes.DOUBLE,
    comment: '緯度'
  },
  longitude: {
    type: DataTypes.DOUBLE,
    comment: '經度'
  },
  map_link: {
    type: DataTypes.STRING(255),
    comment: 'Google Maps連結'
  },
  is_new: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: '是否為新門市'
  },
  online_order: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    comment: '是否支援線上訂餐'
  },
  isHidden: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: '是否隱藏此門市'
  }
}, {
  tableName: 'stores',
  timestamps: true,
  underscored: true,
  comment: '門市資訊表'
});

// 同步資料表結構到資料庫
export const syncStoreModel = async () => {
  await Store.sync({ alter: true });
  console.log('門市資料表已同步');
};

// 獲取所有地區方法
export const getAllRegions = async () => {
  const regions = await Store.findAll({
    attributes: [[sequelize.fn('DISTINCT', sequelize.col('region')), 'region']],
    raw: true
  });

  const regionList = regions.map(item => item.region).sort();
  return ["全部", ...regionList];
};

// 導入初始資料的方法
export const initializeStores = async () => {
  // 檢查是否已有門市資料
  const count = await Store.count();
  if (count > 0) {
    console.log('門市資料已存在，跳過初始化');
    return;
  }

  // 準備要導入的靜態資料
  const initialStores = [
    {
      name: "龍潭北龍店",
      region: "桃園",
      address: "桃園市龍潭區北龍路186號",
      phone: "03-480-6775",
      weekday_hours: "(日)~(四) 10:30-22:00",
      weekend_hours: "(五)~(六) 10:30-24:00",
      note: "特殊節日營業時間請依現場為準",
      image: "/assets/stores/stores-1-out.png",
      detail_image: "/assets/stores/stores-1.png",
      latitude: 24.863671,
      longitude: 121.211828,
      map_link: "https://maps.app.goo.gl/Uao7AGDLQ7ocKp948",
      is_new: false,
      online_order: true
    },
    {
      name: "大溪老街店",
      region: "桃園",
      address: "桃園市大溪區中央路看台下23號",
      phone: "03-3881633",
      default_hours: "(一)~(日) 09:00~19:00",
      note: "特殊節日營業時間請依現場為準",
      image: "/assets/stores/stores-2-out.png",
      detail_image: "/assets/stores/stores-2.png",
      latitude: 24.881371,
      longitude: 121.286879,
      map_link: "https://maps.app.goo.gl/xGd1xodtSfDCdGQS8",
      is_new: false,
      online_order: true
    },
    {
      name: "彰化南郭店",
      region: "彰化",
      address: "彰化市南郭路一段226-2號",
      phone: "04-7284549",
      weekday_hours: "(一)~(五) 10:30-22:00",
      weekend_hours: "(六)~(日) 10:30-21:00",
      note: "特殊節日營業時間請依現場為準",
      image: "/assets/stores/stores-3-out.png",
      detail_image: "/assets/stores/stores-3.png",
      latitude: 24.075321,
      longitude: 120.545372,
      map_link: "https://maps.app.goo.gl/RFJTG2sUEk16b5JJ7",
      is_new: false,
      online_order: true
    },
    {
      name: "台中豐原店",
      region: "台中",
      address: "台中市豐原區中正路21號",
      phone: "04-2515-3123",
      default_hours: "(一)~(日) 10:30-21:30",
      note: "特殊節日營業時間請依現場為準",
      image: "/assets/stores/stores-4-out.webp",
      detail_image: "/assets/stores/stores-4.webp",
      latitude: 24.242546,
      longitude: 120.722562,
      map_link: "https://maps.app.goo.gl/M9HXnGr46tJ1MD4QA",
      is_new: true,
      online_order: true
    },
    {
      name: "新店總站店",
      region: "新北",
      address: "新北市新店區北宜路一段26號",
      phone: "02-8665-6339",
      default_hours: "(一)~(日) 11:00-20:00",
      note: "特殊節日營業時間請依現場為準",
      image: "/assets/stores/stores-5-out.webp",
      detail_image: "/assets/stores/stores-5.webp",
      latitude: 24.969415,
      longitude: 121.537681,
      map_link: "https://maps.app.goo.gl/53KG7Uhub2RNJzUV7",
      is_new: true,
      online_order: true
    }
  ];

  // 批量創建門市記錄
  await Store.bulkCreate(initialStores);
  console.log('初始門市資料已導入');
};

export default Store;

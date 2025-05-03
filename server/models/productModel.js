import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  category: {
    type: DataTypes.ENUM('recommended', 'classic', 'special', 'mix'),
    allowNull: false
  },
  priceM: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: '中杯價格(單位:元)'
  },
  priceL: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: '大杯價格(單位:元)'
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  sugarOptions: {
    type: DataTypes.JSON,
    defaultValue: ['無糖', '微糖', '半糖', '正常糖'],
    comment: '可選的糖度選項'
  },
  iceOptions: {
    type: DataTypes.JSON,
    defaultValue: ['去冰', '微冰', '少冰', '正常冰'],
    comment: '可選的冰塊選項'
  },
  toppings: {
    type: DataTypes.JSON,
    defaultValue: [],
    comment: '可選的加料選項'
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '特殊備註，如：固定甜度等'
  },
  hotAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: '是否提供熱飲'
  }
}, {
  timestamps: true
});

// 初始化資料的函數 - 將ProductsPage.jsx中的靜態資料寫入資料庫
export const initializeProducts = async () => {
  try {
    const count = await Product.count();
    if (count === 0) {
      // 填入推薦飲品
      const recommendedDrinks = [
        {
          name: "粉粿厚奶茶",
          category: "recommended",
          priceM: 55,
          priceL: 65,
          image: "/assets/products/recommend/Recommend-1.jpg",
          description: "香濃奶茶搭配Q彈粉粿，口感層次豐富",
          hotAvailable: true,
          toppings: ['珍珠', '粉粿', '仙草凍']
        },
        {
          name: "檸檬黑糖粉粿",
          category: "recommended",
          priceM: null,
          priceL: 60,
          image: "/assets/products/recommend/Recommend-2.jpg",
          description: "清新檸檬與黑糖粉粿的絕妙組合",
          toppings: ['粉粿', '椰果']
        },
        {
          name: "焙煎蕎麥粉粿",
          category: "recommended",
          priceM: 50,
          priceL: 60,
          image: "/assets/products/recommend/Recommend-3.webp",
          description: "焙煎蕎麥茶與粉粿的完美搭配，微微咖啡因的健康選擇",
          toppings: ['粉粿', '椰果']
        },
        {
          name: "綠茶凍梅露",
          category: "recommended",
          priceM: null,
          priceL: 50,
          image: "/assets/products/recommend/Recommend-4.webp",
          description: "清爽綠茶搭配Q彈茶凍與酸甜梅子",
          toppings: ['茶凍']
        },
        {
          name: "中焙生乳紅茶",
          category: "recommended",
          priceM: 49,
          priceL: null,
          image: "/assets/products/recommend/Recommend-5.png",
          description: "中焙紅茶搭配醇香生乳，口感滑順香醇",
          notes: "*甜度(正常/減糖) / 冰塊固定",
          toppings: []
        }
      ];

      // 填入經典茶品
      const classicDrinks = [
        {
          name: "摸摸紅茶",
          category: "classic",
          priceM: 19,
          priceL: 25,
          image: "/assets/products/classic/classic-1.webp",
          description: "精選阿薩姆紅茶，茶香濃郁回甘",
          hotAvailable: true,
          toppings: ['珍珠', '波霸', '椰果', '粉條']
        },
        {
          name: "好摸冬瓜青",
          category: "classic",
          priceM: 19,
          priceL: 25,
          image: "/assets/products/classic/classic-2.webp",
          description: "冬瓜糖與青茶的經典組合，清爽解渴",
          hotAvailable: false,
          toppings: ['珍珠', '波霸', '椰果', '粉條']
        },
        {
          name: "爽爽摸綠茶",
          category: "classic",
          priceM: 19,
          priceL: 25,
          image: "/assets/products/classic/classic-3.webp",
          description: "選用優質綠茶，口感清新爽口",
          hotAvailable: true,
          toppings: ['珍珠', '波霸', '椰果', '粉條']
        },
        {
          name: "焙煎蕎麥",
          category: "classic",
          priceM: 19,
          priceL: 25,
          image: "/assets/products/classic/classic-4.webp",
          description: "烘焙蕎麥的香氣，微咖啡因健康選擇",
          notes: "*微咖啡因",
          hotAvailable: true,
          toppings: ['珍珠', '波霸', '椰果']
        },
        {
          name: "烏龍一場",
          category: "classic",
          priceM: 19,
          priceL: 25,
          image: "/assets/products/classic/classic-5.webp",
          description: "精選高山烏龍，香氣回甘",
          hotAvailable: true,
          toppings: ['珍珠', '波霸', '椰果', '粉條']
        },
        {
          name: "烏龍翠綠",
          category: "classic",
          priceM: 19,
          priceL: 25,
          image: "/assets/products/classic/classic-6.webp",
          description: "烏龍茶與綠茶的絕妙結合，層次豐富",
          hotAvailable: false,
          toppings: ['珍珠', '波霸', '椰果', '粉條']
        }
      ];

      // 填入特殊系列
      const specialDrinks = [
        {
          name: "愛荔殺殺",
          category: "special",
          priceM: null,
          priceL: 78,
          image: "/assets/products/special/special-1.jpg",
          description: "薄荷、荔枝、紅茶茶湯和Q彈椰果的完美結合",
          notes: "*甜度固定 / 僅供冰飲",
          toppings: ['椰果']
        },
        {
          name: "橙芝汗",
          category: "special",
          priceM: null,
          priceL: 87,
          image: "/assets/products/special/special-2.webp",
          description: "新鮮柑橘與芝士奶蓋的絕配",
          notes: "*甜度固定 / 僅供冰飲",
          toppings: []
        },
        {
          name: "中焙生乳紅茶",
          category: "special",
          priceM: 49,
          priceL: null,
          image: "/assets/products/special/special-3.webp",
          description: "中焙紅茶搭配醇香生乳，口感滑順香醇",
          notes: "*甜度(正常/減糖) / 冰塊固定",
          toppings: []
        },
        {
          name: "超PINEAPPLE冰茶",
          category: "special",
          priceM: null,
          priceL: 80,
          image: "/assets/products/special/special-4.webp",
          description: "新鮮鳳梨與清爽冰茶的完美結合",
          notes: "*甜度冰塊固定",
          toppings: []
        },
        {
          name: "珍珠芝麻歐蕾",
          category: "special",
          priceM: 59,
          priceL: 70,
          image: "/assets/products/special/special-5.png",
          description: "香濃芝麻奶與Q彈珍珠的絕佳組合",
          notes: "*可選固定冰/熱飲・甜度固定",
          hotAvailable: true,
          toppings: ['珍珠']
        }
      ];

      // 填入特調系列
      const mixDrinks = [
        {
          name: "覓蜜紅茶",
          category: "mix",
          priceM: 29,
          priceL: 40,
          image: "/assets/products/mix/mix-1.jpg",
          description: "以蜂蜜調味的紅茶，香甜不膩口",
          hotAvailable: true,
          toppings: ['珍珠', '椰果', '仙草凍']
        },
        {
          name: "覓蜜綠茶",
          category: "mix",
          priceM: 29,
          priceL: 40,
          image: "/assets/products/mix/mix-2.webp",
          description: "蜂蜜與綠茶的清新組合",
          hotAvailable: true,
          toppings: ['珍珠', '椰果', '仙草凍']
        },
        {
          name: "百香三寶",
          category: "mix",
          priceM: null,
          priceL: 55,
          image: "/assets/products/mix/mix-3.png",
          description: "百香果風味搭配珍珠、椰果、茶凍三種配料",
          notes: "珍珠/椰果/茶凍",
          toppings: ['珍珠', '椰果', '茶凍']
        },
        {
          name: "綠茶凍梅露",
          category: "mix",
          priceM: null,
          priceL: 50,
          image: "/assets/products/mix/mix-4.webp",
          description: "清爽綠茶搭配Q彈茶凍與酸甜梅子",
          toppings: ['茶凍']
        },
        {
          name: "甘蔗青茶",
          category: "mix",
          priceM: 49,
          priceL: 60,
          image: "/assets/products/mix/mix-5.webp",
          description: "甘蔗汁與青茶的天然甜美組合",
          toppings: ['椰果', '粉條']
        },
        {
          name: "覓蜜檸檬蘆薈",
          category: "mix",
          priceM: 39,
          priceL: 50,
          image: "/assets/products/mix/mix-6.webp",
          description: "清爽檸檬與蘆薈粒，搭配蜂蜜調味",
          toppings: ['蘆薈']
        },
        {
          name: "檸檬黑糖粉粿",
          category: "mix",
          priceM: null,
          priceL: 60,
          image: "/assets/products/mix/mix-7.webp",
          description: "清新檸檬與黑糖粉粿的絕妙組合",
          toppings: ['粉粿']
        },
        {
          name: "金桔檸檬茶凍",
          category: "mix",
          priceM: null,
          priceL: 65,
          image: "/assets/products/mix/mix-8.webp",
          description: "金桔與檸檬的酸甜搭配Q彈茶凍",
          toppings: ['茶凍']
        },
        {
          name: "檸檬養樂多",
          category: "mix",
          priceM: null,
          priceL: 60,
          image: "/assets/products/mix/mix-9.png",
          description: "清新檸檬與乳酸菌飲品的健康組合",
          toppings: []
        },
        {
          name: "養樂多綠茶",
          category: "mix",
          priceM: null,
          priceL: 50,
          image: "/assets/products/mix/mix-10.png",
          description: "乳酸菌飲品與綠茶的清爽混搭",
          toppings: []
        },
        {
          name: "檸檬紅茶",
          category: "mix",
          priceM: 45,
          priceL: 55,
          image: "/assets/products/mix/mix-11.png",
          description: "經典檸檬紅茶，酸甜可口",
          hotAvailable: true,
          toppings: ['椰果', '蘆薈']
        },
        {
          name: "檸檬綠茶",
          category: "mix",
          priceM: 45,
          priceL: 55,
          image: "/assets/products/mix/mix-12.png",
          description: "清新檸檬綠茶，提神解渴",
          toppings: ['椰果', '蘆薈']
        },
        {
          name: "梅露青",
          category: "mix",
          priceM: null,
          priceL: 45,
          image: "/assets/products/mix/mix-13.png",
          description: "酸甜梅子搭配清爽青茶",
          toppings: []
        },
        {
          name: "青梅翠綠",
          category: "mix",
          priceM: null,
          priceL: 45,
          image: "/assets/products/mix/mix-14.png",
          description: "青梅與綠茶的清新組合",
          toppings: []
        },
        {
          name: "百香翠綠",
          category: "mix",
          priceM: null,
          priceL: 45,
          image: "/assets/products/mix/mix-15.png",
          description: "熱帶百香果風味與綠茶的絕配",
          toppings: []
        }
      ];

      // 合併所有飲品並一次創建
      const allDrinks = [...recommendedDrinks, ...classicDrinks, ...specialDrinks, ...mixDrinks];
      await Product.bulkCreate(allDrinks);

      console.log('產品資料初始化成功');
    } else {
      console.log('產品資料已存在，跳過初始化');
    }
  } catch (error) {
    console.error('初始化產品資料時發生錯誤:', error);
    throw error;
  }
};

export default Product;

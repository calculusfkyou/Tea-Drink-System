import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// 定義 News 模型
export const News = sequelize.define('News', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  excerpt: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  detailImage: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  details: {
    type: DataTypes.JSON,
    allowNull: true
  },
  images: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  isHidden: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  tableName: 'news',
  timestamps: true
});

// 初始化新聞資料
export const initializeNews = async () => {
  try {
    const count = await News.count();
    if (count === 0) {
      // 初始靜態資料
      const initialNews = [
        {
          title: "【新店開幕】新店總站店",
          date: "2025-04-25",
          category: "新店開幕",
          excerpt: "拾玖茶屋持續展店！新店總站店將於6月12日正式開幕營業。",
          image: "/assets/news/news-1-out.png",
          detailImage: "/assets/news/news-1.png",
          content: "拾玖茶屋持續展店！新店總站店將於6月12日正式開幕營業。開幕期間推出多項驚喜活動：\n1. 開幕首週，全品項飲品享9折優惠\n2. 消費滿100元，即贈限量拾玖茶屋環保吸管乙支\n3. 打卡分享並標記好友，有機會獲得免費飲品券",
          details: {
            openingDate: "2026/06/12",
            phone: "02-8665-6339",
            openingHours: "(一)～(日) 11:00~20:00",
            address: "新北市新店區北宜路一段26號"
          }
        },
        {
          title: "【新店開張】豐原中正店",
          date: "2025-04-22",
          category: "新店開幕",
          excerpt: "我們很興奮地宣布，「拾玖茶屋」豐原中正店即將於6月1日盛大開幕！",
          image: "/assets/news/news-2-out.png",
          detailImage: "/assets/news/news-2.png",
          content: "我們很興奮地宣布，「拾玖茶屋」豐原中正店即將於6月1日盛大開幕！前往店內消費並出示此則消息，即可獲得開幕限定優惠：飲品買一送一（限量100杯）。期待您的蒞臨！",
          details: {
            openingDate: "2025/06/01",
            phone: "04-2515-3123",
            openingHours: "(一)～(日) 10:30~21:30",
            address: "台中市豐原區中正路21號"
          },
          images: []
        },
        {
          title: "【新店開幕】土城學府店",
          date: "2025-03-01",
          category: "新店開幕",
          excerpt: "土城的茶粉們來點名 (∩^o^)⊃━☆ﾟ.*･｡ 一起揪團喝爆！【拾汣茶屋土城學府店】即將於03/04 試營運囉！",
          image: "/assets/news/news-3-out.webp",
          detailImage: "/assets/news/news-3.webp",
          images: ["/assets/news/news-3-2.webp"],
          content: "土城學府店即將於3月4日開始試營運！試營運期間，全品項飲品享8折優惠。此外，凡消費並填寫意見回饋表，即贈送點數加倍。您的寶貴意見將幫助我們提供更好的服務！",
          details: {
            openingDate: "2025/03/04",
            phone: "02-8260-1919",
            openingHours: "(一)～(日) 10:00~22:00",
            address: "新北市土城區學府路一段62號"
          }
        },
        {
          title: "【新品上市】超 PINEAPPLE 冰茶",
          date: "2025-02-22",
          category: "新品摸摸",
          excerpt: "初夏限定，繽紛水果茶系列驚喜登場！",
          image: "/assets/news/news-4-out.webp",
          detailImage: "/assets/news/news-4.webp",
          content: "誰最 PINE？我最 PINE！ (╯‵□′)╯超～派～登場啦！！\n價格大爆殺！原價 $120 殺！ $99 再折 19 元！\n超派價 【每杯 $80 元】\n一口喝下就脫口而出 「超派」的絕贊滋味等你來品嚐(*´∀`)~\n.\n▶︎超 PINEAPPLE 冰茶◀︎ L $80｜10/28 起全門市開賣\n.\n✤ 限定飲品每日有限量，實際販售情形請依店內為準。 起全門市開賣",
          images: []
        },
        {
          title: "【新品上市】中焙生乳紅茶",
          date: "2025-02-10",
          category: "新品摸摸",
          excerpt: "新品上市！中焙生乳紅茶，讓你一口愛上！",
          image: "/assets/news/news-5-out.webp",
          detailImage: "/assets/news/news-5.png",
          content: "『不管什麼恩怨，今天都用飲料解決吧！』\n聽起來很耳熟(*´･д･)? 別想了～重點是超好喝新品來囉！\n.\n✸ 中焙生～乳紅茶 ✸ M $49｜6/23 起全門市開賣\n拾汣究極生乳配方 對上 焙火紅茶茶湯 ～\n綿密濃醇乳香與茶香，在杯中交融出完美層次感ヾ(´︶`*)ﾉ\n.\n✤ 限定飲品每日有限量，實際販售情形請依店內為準。",
          images: []
        },
        {
          title: "【新品上市】愛荔殺殺",
          date: "2025-02-10",
          category: "新品摸摸",
          excerpt: "新品上市！中焙生乳紅茶，讓你一口愛上！",
          image: "/assets/news/news-6-out.webp",
          detailImage: "/assets/news/news-6.png",
          content: "沒時間解釋了 ( • ̀ω•́ ) 快跟汣編一起唸：\n『 霹哩卡☆霹哩拉拉～ ❤︎ 愛荔殺殺 ❤︎ 變好喝吧☆ 』\n什麼，你說資訊量過大？下面才是重點捏！\n.\n❤︎ 愛荔殺殺 ❤︎ L $78｜4/22 起全門市開賣\n薄荷、荔枝、紅茶茶湯和Ｑ彈椰果為你施下夢的魔法 ☆⌒(*^-゜)v\n更加入「舒亮姊姊超晶明」金盞花葉黃素飲，讓你明辨是非 👀\n價格也殺 殺 殺！ #夢想便宜大甩賣 ✨✨✨\n媽！汣編終於也買得起夢想了！｡ﾟ(ﾟ´ω`ﾟ)ﾟ｡\n.\n✤ 期間限定飲品每日限量100杯，實際販售情形請依店內為準。",
          images: []
        },
        {
          title: "【重要公告】𝗗𝗲𝗠𝗮𝗿𝗰𝘂𝘀 𝗖𝗼𝘂𝘀𝗶𝗻𝘀 x 拾汣茶屋一日店長見面會",
          date: "2024-01-25",
          category: "重要公告",
          excerpt: "表弟 𝗗𝗲𝗠𝗮𝗿𝗰𝘂𝘀 𝗖𝗼𝘂𝘀𝗶𝗻𝘀 即將到 永吉店 與大家互動囉！",
          image: "/assets/news/news-7-out.webp",
          detailImage: "/assets/news/news-7.webp",
          content: "急報！就在明天(⁎⁍̴̛ᴗ⁍̴̛⁎) 表弟 𝗗𝗲𝗠𝗮𝗿𝗰𝘂𝘀 𝗖𝗼𝘂𝘀𝗶𝗻𝘀 即將到 永吉店 與大家互動囉！\n當天還有限定飲品 表弟奶茶 免費送給你❤︎\n.\n活動資訊\n𝟮𝟬𝟮𝟰.𝟭.𝟮𝟲 𝙁𝙍𝙄. 𝟭𝟬:𝟬𝟬~𝟭𝟭:𝟯𝟬\n❢拾汣茶屋永吉店｜台北市信義區永吉路30巷112號應！\n.\n▶︎表弟奶茶｜當日限量𝟭𝟬𝟬杯免費贈！一人限一杯，贈完為止。",
          images: []
        }
      ];

      await News.bulkCreate(initialNews);
      console.log('新聞資料初始化成功');
    } else {
      console.log('新聞資料已存在，跳過初始化');
    }
  } catch (error) {
    console.error('初始化新聞資料時發生錯誤:', error);
    throw error;
  }
};

// 提供模型類別索引方法
export const findNewsByCategory = async (category) => {
  try {
    const whereClause = category ? { category } : {};
    return await News.findAll({
      where: whereClause,
      order: [['date', 'DESC']]
    });
  } catch (error) {
    console.error('依類別查詢新聞失敗:', error);
    throw error;
  }
};

// 提供最新消息查詢方法
export const findRecentNews = async (limit = 3) => {
  try {
    return await News.findAll({
      order: [['date', 'DESC']],
      limit: parseInt(limit)
    });
  } catch (error) {
    console.error('查詢最新消息失敗:', error);
    throw error;
  }
};

// 提供相關新聞查詢方法
export const findRelatedNews = async (category, currentId, limit = 2) => {
  try {
    return await News.findAll({
      where: {
        category,
        id: { [Op.ne]: currentId } // 不包括目前的新聞
      },
      order: [['date', 'DESC']],
      limit: parseInt(limit)
    });
  } catch (error) {
    console.error('查詢相關新聞失敗:', error);
    throw error;
  }
};

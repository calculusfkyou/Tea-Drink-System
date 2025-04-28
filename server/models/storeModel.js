export const storeData = [
  {
    id: 1,
    name: "龍潭北龍店",
    region: "桃園",
    address: "桃園市龍潭區北龍路186號",
    phone: "03-480-6775",
    hours: {
      weekday: "(日)~(四) 10:30-22:00",
      weekend: "(五)~(六) 10:30-24:00"
    },
    note: "特殊節日營業時間請依現場為準",
    image: "/assets/stores/stores-1-out.png",
    detailImage: "/assets/stores/stores-1.png",
    location: {
      lat: 24.863671,
      lng: 121.211828
    },
    mapLink: "https://maps.app.goo.gl/Uao7AGDLQ7ocKp948",
    isNew: false,
    onlineOrder: true
  },
  {
    id: 2,
    name: "大溪老街店",
    region: "桃園",
    address: "桃園市大溪區中央路看台下23號",
    phone: "03-3881633",
    hours: {
      default: "(一)~(日) 09:00~19:00"
    },
    note: "特殊節日營業時間請依現場為準",
    image: "/assets/stores/stores-2-out.png",
    detailImage: "/assets/stores/stores-2.png",
    location: {
      lat: 24.881371,
      lng: 121.286879
    },
    mapLink: "https://maps.app.goo.gl/xGd1xodtSfDCdGQS8",
    isNew: false,
    onlineOrder: true
  },
  {
    id: 3,
    name: "彰化南郭店",
    region: "彰化",
    address: "彰化市南郭路一段226-2號",
    phone: "04-7284549",
    hours: {
      weekday: "(一)~(五) 10:30-22:00",
      weekend: "(六)~(日) 10:30-21:00"
    },
    note: "特殊節日營業時間請依現場為準",
    image: "/assets/stores/stores-3-out.png",
    detailImage: "/assets/stores/stores-3.png",
    location: {
      lat: 24.075321,
      lng: 120.545372
    },
    mapLink: "https://maps.app.goo.gl/RFJTG2sUEk16b5JJ7",
    isNew: false,
    onlineOrder: true
  },
  {
    id: 4,
    name: "台中豐原店",
    region: "台中",
    address: "台中市豐原區中正路21號",
    phone: "04-2515-3123",
    hours: {
      default: "(一)~(日) 10:30-21:30"
    },
    note: "特殊節日營業時間請依現場為準",
    image: "/assets/stores/stores-4-out.webp",
    detailImage: "/assets/stores/stores-4.webp",
    location: {
      lat: 24.242546,
      lng: 120.722562
    },
    mapLink: "https://maps.app.goo.gl/M9HXnGr46tJ1MD4QA",
    isNew: true,
    onlineOrder: true
  },
  {
    id: 5,
    name: "新店總站店",
    region: "新北",
    address: "新北市新店區北宜路一段26號",
    phone: "02-8665-6339",
    hours: {
      default: "(一)~(日) 11:00-20:00"
    },
    note: "特殊節日營業時間請依現場為準",
    image: "/assets/stores/stores-5-out.webp",
    detailImage: "/assets/stores/stores-5.webp",
    location: {
      lat: 24.969415,
      lng: 121.537681
    },
    mapLink: "https://maps.app.goo.gl/53KG7Uhub2RNJzUV7",
    isNew: true,
    onlineOrder: true
  }
];

// 取得所有地區
export const getAllRegions = () => {
  // 取得所有不重複的地區
  const regions = [...new Set(storeData.map(store => store.region))];
  // 確保"全部"選項在最前面
  return ["全部", ...regions.sort()];
};

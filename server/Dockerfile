FROM node:18-alpine

WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製所有後端檔案
COPY . .

# 暴露 API 埠
EXPOSE 5000

# 設定環境變數
ENV NODE_ENV=production

# 啟動應用
CMD ["node", "app.js"]

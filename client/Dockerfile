FROM node:18-alpine as build

WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製所有前端檔案
COPY . .

# 構建應用
RUN npm run build

# 使用輕量級 Nginx 伺服器來提供靜態文件
FROM nginx:alpine

# 複製前端構建檔案到 Nginx 服務目錄
COPY --from=build /app/dist /usr/share/nginx/html

# 複製自定義 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露埠 80
EXPOSE 80

# 啟動 Nginx 服務
CMD ["nginx", "-g", "daemon off;"]

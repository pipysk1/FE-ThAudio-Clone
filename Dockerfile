# Sử dụng Node.js phiên bản 22
FROM node:22.12.0-alpine AS builder

WORKDIR /app

# Sao chép và cài đặt dependencies
COPY package*.json yarn.lock ./
RUN yarn install

# Build ứng dụng
COPY . .
RUN yarn build

# Sử dụng Nginx để phục vụ file tĩnh
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

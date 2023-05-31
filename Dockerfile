FROM --platform=linux/amd64 node:18.14.0-alpine AS builder

WORKDIR /app

COPY ./ ./

RUN yarn install
RUN yarn build

FROM fholzer/nginx-brotli:latest

COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]

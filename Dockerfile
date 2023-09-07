FROM --platform=linux/amd64 fholzer/nginx-brotli:latest

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist /usr/share/nginx/html

FROM --platform=$BUILDPLATFORM node:18.14.0-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY ./ ./

RUN yarn build

FROM --platform=$BUILDPLATFORM fholzer/nginx-brotli:latest AS webber-crm-ui

COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

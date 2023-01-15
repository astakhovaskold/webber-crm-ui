FROM node:alpine as webber-crm-ui

WORKDIR /app

COPY ../../ .

RUN yarn install
RUN yarn build

FROM nginx:alpine

# copy the build folder from react to the root of nginx (www)
ADD ../../nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=webber-crm-ui /build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

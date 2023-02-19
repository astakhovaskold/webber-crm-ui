FROM node:alpine as webber-crm-ui

WORKDIR /app

COPY ./../../ /app

#ENV PATH /app/node_modules/.bin:$PATH

RUN yarn install
RUN yarn build

FROM fholzer/nginx-brotli:latest

# copy the build folder from react to the root of nginx (www)
ADD ../../nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=webber-crm-ui /app/build /usr/share/nginx/html

EXPOSE 80

#CMD ["nginx", "-g", "daemon off;"]

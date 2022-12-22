FROM node:16.16.0 as biblioteca-ui
WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY  . .
RUN npm run build

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=biblioteca-ui app/dist/biblioteca-ui /usr/share/nginx/html
COPY ./config/nginx.conf /etc/ngix/conf.d/default.conf

#docker build -t biblioteca-ui .
#docker run -p 8081:80 biblioteca-ui

FROM node:latest

RUN mkdir -p /usr/src/client_app
WORKDIR /usr/src/client_app

COPY . /usr/src/client_app
RUN npm install

EXPOSE 3000

CMD ["npm", "run", "preview"]

FROM node:latest

WORKDIR /client

COPY package.json package-lock.json /client/

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

FROM node:latest

WORKDIR /server

COPY package.json package-lock.json /server/

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "nodemon"]

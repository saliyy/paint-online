FROM node:latest

WORKDIR /server

COPY package.json package-lock.json /server/

RUN npm install

ARG PORT=5000
ENV PORT=${PORT}
ENV HOST=0.0.0.0

COPY . .

EXPOSE ${PORT}

CMD ["npm", "run", "nodemon"]

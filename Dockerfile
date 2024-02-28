FROM node:14-alpine

WORKDIR /rental/backend

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]

FROM node:20
WORKDIR /app

RUN npm install -g serve

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]

FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
EXPOSE 5173
COPY . .
CMD [ "npm", "run", "dev" ]

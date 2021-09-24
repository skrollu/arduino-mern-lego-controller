FROM node:12.18.3

LABEL version="1.0"
LABEL description="Docker image for frontend react app: Lego Controller."

WORKDIR /app

COPY "package*.json" ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
FROM node:12.18.3

LABEL version="1.0"
LABEL description="Docker image for backend express server: Lego Controller."

WORKDIR /backend

COPY . .

RUN npm install

EXPOSE 5000

CMD ["node", "server.js"]
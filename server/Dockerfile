FROM node:15

LABEL version="1.0"
LABEL description="Docker image for backend express server: Lego Controller."

WORKDIR /backend

COPY ["package.json", "package-lock.json", "./"]
RUN ls
RUN npm install
COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
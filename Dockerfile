FROM mcr.microsoft.com/playwright:v1.57.0-noble

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV PORT=3002
EXPOSE 3002

CMD ["npm", "start"]

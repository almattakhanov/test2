FROM node:24.0.1-alpine3.21 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:24.0.1-alpine3.21 AS production
WORKDIR /app
COPY --from=build /app ./
RUN npm install --production
EXPOSE 3000
CMD ["npx", "next", "start", "-H", "0.0.0.0"]

FROM node:20-alpine

ENV MONGO_URL "mongodb://goalhub-mongo:27017"
ENV JWT_SECRET "JWT_SECRET"

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN --mount=type=cache,target=/root/.yarn \
  YARN_CACHE_FOLDER=/root/.yarn \
  yarn install --frozen-lockfile

COPY . .

EXPOSE 5000

CMD ["yarn","start"]
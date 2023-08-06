FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN --mount=type=cache,target=/root/.yarn \
  YARN_CACHE_FOLDER=/root/.yarn \
  yarn install --frozen-lockfile

COPY . .

CMD ["yarn","dev"]
EXPOSE 5173

###
# FROM nginx:1.25-alpine 
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html


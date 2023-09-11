#development stage

FROM node:18-alpine as server-dev

RUN mkdir -p /app

WORKDIR /app

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000

ENTRYPOINT ["/bin/sh", "entrypoint.sh"]


#build stage

FROM node:18-alpine as server-build

WORKDIR /usr/src/app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn run build


#prod stage

FROM node:18-alpine as server-prod

WORKDIR /usr/src/app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --from=build /usr/src/app/dist ./dist

COPY package*.json ./

RUN yarn install --only=production

RUN rm package*.json

EXPOSE 3000

CMD ["node", "dist/main.js"]
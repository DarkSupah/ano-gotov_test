FROM node:18 as builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

FROM node:18-bullseye-slim as runner
EXPOSE 3000
WORKDIR /app
COPY --from=builder /app .
ENTRYPOINT [ "node", "/app/.output/server/index.mjs" ]


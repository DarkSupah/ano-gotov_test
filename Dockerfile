FROM node:18 as builder

WORKDIR /app

COPY package.json yarn.lock ./

CMD ["npm", "run", "install"]

COPY . .

CMD ["npm", "run", "build"]

FROM node:18-bullseye-slim as runner
EXPOSE 3000
WORKDIR /app
COPY --from=builder /app .
ENTRYPOINT [ "node", "/app/.output/server/index.mjs" ]


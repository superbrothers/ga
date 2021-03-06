ARG NODE_VERSION=

FROM node:${NODE_VERSION}
WORKDIR /app
COPY package*.json ./
RUN set -x && npm install
COPY . .
RUN set -x && \
    apt-get update -qq && \
    apt-get install -qy jq && \
    npm run lint && \
    npm run test && \
    npm run build

FROM node:${NODE_VERSION}-slim
WORKDIR /app
COPY package*.json ./
RUN set -x && npm install --only=production
COPY --from=0 /app/lib /app/lib
COPY bin/cli.js /app/bin/cli.js
COPY LICENSE /app/LICENSE
ENTRYPOINT ["node", "/app/bin/cli.js"]

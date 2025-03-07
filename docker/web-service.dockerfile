FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web-service/package.json ./apps/web-service/
COPY libs ./libs/

RUN pnpm install --frozen-lockfile

COPY nest-cli.json tsconfig.json tsconfig.build.json ./
COPY apps/web-service ./apps/web-service/

RUN pnpm --filter web-service build

FROM node:22-alpine AS runner

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web-service/package.json ./apps/web-service/
COPY --from=builder /app/apps/web-service/dist ./apps/web-service/dist
COPY libs ./libs/

RUN pnpm install --frozen-lockfile --prod

ENV NODE_ENV production

CMD ["node", "apps/web-service/dist/main"]

EXPOSE 3000
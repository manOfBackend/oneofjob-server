FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/job-crawler/package.json ./apps/job-crawler/
COPY libs ./libs/

RUN pnpm install --frozen-lockfile

COPY nest-cli.json tsconfig.json tsconfig.build.json ./
COPY apps/job-crawler ./apps/job-crawler/

RUN pnpm --filter job-crawler build

FROM node:22-alpine AS runner

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/job-crawler/package.json ./apps/job-crawler/
COPY --from=builder /app/apps/job-crawler/dist ./apps/job-crawler/dist
COPY libs ./libs/

RUN pnpm install --frozen-lockfile --prod

ENV NODE_ENV production

CMD ["node", "apps/job-crawler/dist/main"]

EXPOSE 3000
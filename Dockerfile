# syntax=docker/dockerfile:1

# 1. Base image
FROM oven/bun:1-alpine AS base
WORKDIR /app

# 2. Dependencies
FROM base AS deps
WORKDIR /app
COPY web/package.json web/bun.lock ./
RUN bun install --frozen-lockfile

# 3. Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY web ./
ENV NEXT_TELEMETRY_DISABLED=1
RUN bun run build

# 4. Production Runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]

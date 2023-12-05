FROM node:latest

# Add PNPM

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /data

# Install dependencies

COPY package.json .

RUN pnpm install

# Copy source code

COPY . .

# Build

RUN pnpm run build

# Run

CMD ["node" ".output/server/index.mjs "]


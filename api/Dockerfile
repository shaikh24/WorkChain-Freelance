FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production || npm install
COPY . .
RUN npm run build || echo "no build script"

FROM node:20-alpine
WORKDIR /app
RUN addgroup -S app && adduser -S app -G app
COPY --from=builder /app .
# Install only production deps (if package-lock exists this will be faster)
RUN npm ci --only=production || npm install --production
USER app
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "server.js"]

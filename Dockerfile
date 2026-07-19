FROM node:18-alpine

WORKDIR /app

# Copy package.json dan install dependencies (jika ada)
COPY package.json ./
RUN npm install --production 2>/dev/null || true

# Copy source code
COPY src/ ./src/

EXPOSE 8080

CMD ["node", "src/app.js"]
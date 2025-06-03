FROM node:20-alpine

WORKDIR /app
# COPY app .
# COPY public .
# COPY postcss.config.mjs .
# COPY tailwind.config.ts .
# COPY tsconfig.json .
# COPY package*.json .
# COPY package*.json package-lock.json* ./
COPY . .

RUN npm install

EXPOSE 3000

CMD npm run dev
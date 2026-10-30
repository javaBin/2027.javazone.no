FROM node:22-alpine AS build
WORKDIR /app
# Skip husky git hooks; there is no .git in the build context
ENV HUSKY=0
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Unprivileged nginx keeps its pid and temp files in /tmp, which is the only writable path on the platform
FROM nginxinc/nginx-unprivileged:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080

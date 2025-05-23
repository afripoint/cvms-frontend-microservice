# Stage 1: Build the app
FROM node:22-alpine AS builder
 
WORKDIR /app
 
# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci
 
# Copy rest of the code and build
COPY . .
RUN npm run build
 
# Stage 2: Serve the app
FROM node:22-alpine AS production
 
WORKDIR /app
 
# Copy only built files
COPY --from=builder /app/dist ./dist
 
# Install only what's necessary
RUN apk add --no-cache wget \
  && npm install -g serve@14
 
# Create non-root user and fix ownership
RUN adduser -D nodeuser \
  && chown -R nodeuser:nodeuser /app
 
USER nodeuser
 
EXPOSE 80
 
# Health check (using correct flags)
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --spider --quiet http://localhost:80 || exit 1
 
# Start the app
CMD ["serve", "-s", "dist", "-l", "80"]
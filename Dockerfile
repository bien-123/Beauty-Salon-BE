# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build React app
# RUN npm run build

# Install serve to serve build folder
# RUN npm install -g serve

# Expose port
Expose 5000

# Run production build
CMD ["node", "src/index.js"]
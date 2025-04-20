# Backend Service Dockerfile
FROM node:16-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

EXPOSE 5001

# Start the service
CMD ["npm", "start"]
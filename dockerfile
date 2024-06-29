# Use the official Node.js image as a base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json ./
COPY package-lock.json ./

# Define build arguments
ARG CLERK_PUBLISHABLE_KEY

# Set environment variables
ENV CLERK_PUBLISHABLE_KEY=pk_test_c3VpdGFibGUtbW9jY2FzaW4tNzMuY2xlcmsuYWNjb3VudHMuZGV2Jn

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js application
RUN npm run build

# Expose port 3000 to the outside world
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]

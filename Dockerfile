# Base image
FROM node:18.12.1

# Create app directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install app dependencies
RUN yarn install --frozen-lockfile

# Copy app source code
COPY . .

# Build TypeScript code
RUN yarn build

# Expose port 3333 for the Adonis server
EXPOSE 3333

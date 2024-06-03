# Base image
FROM node:18-alpine as development

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY ./package*.json ./

# List the contents of the directory to verify the copy
RUN ls -al /usr/src/app

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# List the contents of the directory to verify the copy
RUN ls -al /usr/src/app

# Expose the port the app runs on
EXPOSE 4000

# Start the application
CMD ["npm", "run", "start:dev"]

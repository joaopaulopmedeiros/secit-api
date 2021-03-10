# Node image
FROM node:12

# Create secit-api directory
WORKDIR /secit-api

# Install dependencies
COPY package*.json /secit-api
RUN npm install

# Bundle app source
COPY . .

# Port map
EXPOSE 3333

# Start server
CMD [ "node", "src/index.js" ]
FROM node:14
COPY package*.json ./
COPY server.js ./
COPY express/ ./express/
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]

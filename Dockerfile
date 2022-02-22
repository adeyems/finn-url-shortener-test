FROM node:16-alpine

# Create app directory
WORKDIR /usr/

COPY tsconfig.json package*.json ./

COPY src ./src

RUN npm install
RUN npm run build

EXPOSE 8080

CMD [ "npm", "start"]

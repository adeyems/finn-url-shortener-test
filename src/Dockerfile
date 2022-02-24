FROM node:16-alpine

WORKDIR /usr

COPY ../package.json ./
COPY ../tsconfig.json ./

COPY src ./src

RUN ls -a

RUN npm install
RUN npm run build


#stage 2
FROM node:16-alpine

WORKDIR /usr

COPY ../package.json ./

RUN npm i -g jest

RUN npm install --only=production

COPY --from=0 /usr/dist .

EXPOSE 8080

CMD ["npm","start"]

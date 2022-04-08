FROM node:latest
WORKDIR /usr/src/app
COPY . .
RUN mkdir dist
RUN npm i
RUN npm run build
RUN npm prune --production
WORKDIR /usr/src/app/dist
EXPOSE 3001
# run npm script start
CMD [ "npm", "start" ]
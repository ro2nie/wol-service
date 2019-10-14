FROM node:12-alpine
WORKDIR /app
COPY . .
RUN yarn
EXPOSE 3000
CMD [ "node", "wol.js" ]
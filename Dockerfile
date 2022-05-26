# Common build stage
FROM node:16.11.1-alpine3.14 as common-build-stage

COPY . ./app

WORKDIR /app

RUN npm install && npm run build

EXPOSE 8080

# Production build stage
FROM common-build-stage as production-build-stage

CMD ["npm", "run", "start"]
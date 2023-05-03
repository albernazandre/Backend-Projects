FROM node:16-alpine

EXPOSE 3001

WORKDIR /app/back-end

COPY . ./

ADD node_modules.tar.gz ./

ENTRYPOINT ["npm"]

CMD ["start"]

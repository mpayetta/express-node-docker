FROM mhart/alpine-node:latest

WORKDIR /code

RUN npm install -g nodemon

COPY package.json /code/package.json
RUN npm install && npm ls
RUN mv /code/node_modules /node_modules

COPY . /code

EXPOSE 3000

CMD ["npm", "start"]

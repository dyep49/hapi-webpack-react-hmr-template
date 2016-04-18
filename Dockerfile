FROM node:5.10.1

# Install dependencies first in order to leverage cache
WORKDIR /tmp
COPY package.json /tmp/
RUN npm config set registry http://registry.npmjs.org/ && npm install

WORKDIR /src
COPY . /src

CMD ["npm", "start"]

EXPOSE 8000

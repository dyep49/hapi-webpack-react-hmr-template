// dependencies
const hapi = require('hapi');
const inert = require('inert');
const path = require('path');

// dev
const webpack = require('webpack');
const hapiWebpackPlugin = require('hapi-webpack-plugin');
const chokidar = require('chokidar');

const watcher = chokidar.watch('./server');

watcher.on('ready', function() {
  watcher.on('all', function() {
    console.log("Clearing /server/ module cache from server");
    Object.keys(require.cache).forEach(function(id) {
      if (/[\/\\]server[\/\\]/.test(id)) delete require.cache[id];
    });
  });
});


// constants
const webRoot = path.join(__dirname, 'client');
const serverHost = '0.0.0.0';
const serverPort = 8000;
const hapiPackages = [];

hapiPackages.push(inert);

hapiPackages.push({
  register: hapiWebpackPlugin,
  options: './webpack.config.js'
})

const server = new hapi.Server();
server.connection({host: serverHost, port: serverPort});

server.register(hapiPackages, (err) => {
  if(err) {
    console.error(err);
  }
})

server.route([
  {
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: webRoot
      }
    }
  }
])

server.start((err) => {
  if(err) {
    throw err;
  }

  console.log(`Server running at ${server.info.uri}`);
})

const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    './client/app/index',
    'webpack-hot-middleware/client?reload=true'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: path.join(__dirname, 'client')
    }]
  },
  assets: {
    publicPath: '/static/',
    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    },
    noInfo: true
  }
};



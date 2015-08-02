var path = require('path');
var webpack = require('webpack');
var isDev = process.argv.slice(2).indexOf('--dev') > -1;
var isPrd = process.argv.slice(2).indexOf('--prd') > -1;
var plugins = [];
var entry = { app: [ './src/canvas.js' ] };

if (isDev) {
  entry.app.push('webpack/hot/dev-server');
} else if (isPrd) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));
}

module.exports = {
  entry: entry,
  output: {
    path: './dist',
    filename: isPrd ? 'canvas.min.js' : 'canvas.js',
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
      },
    ],
  },
  resolve: {
    root: [ path.join(__dirname, 'bower_components') ],
    alias: { lodash: 'lodash-amd/modern' },
  },
  plugins: plugins,
};

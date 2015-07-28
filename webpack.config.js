var path = require('path');
var webpack = require('webpack');
var isDev = process.argv.slice(2).indexOf('--dev') > -1;
var plugins = [
  new webpack.ResolverPlugin(
    new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
  ),
];

if (!isDev) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));
}

module.exports = {
  entry: {
    app: [ './src/canvas.js' ],
  },
  output: {
    path: './dist',
    publicPath: '/assets/',
    filename: isDev ? 'canvas.js' : 'canvas.min.js',
    libraryTarget: 'var',
    library: 'canvas',
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

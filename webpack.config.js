const webpack = require('webpack');
const WebpackHtmlPlugin = require('html-webpack-plugin');
const titleCase = require('title-case');

const { name } = require('./package.json');

module.exports = {
  entry: {
    app: ['./src/index.js'],
  },
  output: {
    filename: `${name}.js`,
    library: name,
    libraryTarget: 'umd',
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify('development'),
    }),
    new WebpackHtmlPlugin({
      name,
      title: titleCase(name),
      template: 'index.html',
      inject: false,
    }),
  ],
  performance: {
    hints: false,
  },
};

const webpack = require('webpack');

module.exports = {
  entry: {
    app: ['./src/index.js'],
  },
  output: {
    filename: 'canvas.js',
    library: 'canvas',
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: 'node_modules/**',
        loader: 'babel',
      },
      {
        test: /\.html$/,
        loader: 'raw',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify('development'),
    }),
  ],
};

const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: process.cwd(),
  entry: {
    library: [
      'three',
      'shader-particle-engine',
      '@tweenjs/tween.js',
      'promise-polyfill'
    ],
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, './'),
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: './[name].json',
    }),
  ],
};

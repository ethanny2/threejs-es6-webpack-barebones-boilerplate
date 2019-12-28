/* eslint-disable */
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    // Content hash used for cache bursting
    filename: 'js/[name].[hash].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      // Loads all image files; no minfication
      {
        test: /\.(png|svg|jpe?g|gif|ico)$/i,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'images/',
            name: '[name].[hash].[ext]'
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: './dist',
    compress: true,
    hot: true,
    port: 9000
  },
  // plugins: [
  //   new webpack.DllReferencePlugin({
  //     context: __dirname,
  //     manifest: require('./library.json')
  //   })
  // ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        /* https://webpack.js.org/plugins/split-chunks-plugin/#split-chunks-example-3
            Creates a custom vendor chunk, which contains certain node_modules 
            packages matched by RegExp. */
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
          reuseExistingChunk: true
        },
        // Extracts all .css files into a single css file
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
});

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  devServer: {
    contentBase: './dist',
    compress: true,
    port: 9000,
    hot: true
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        /* https://webpack.js.org/plugins/split-chunks-plugin/#split-chunks-example-3
            Creates a custom vendor chunk, which contains certain node_modules packages
            matched by RegExp. */
        vendor: {
          test: /[\\/]node_modules[\\/](three|shader-particle-engine|@tweenjs|promise-polyfill)[\\/]/,
          name: 'vendor',
          chunks: 'all',
          reuseExistingChunk: true
        },
          //Extracts all .css files into a single css file
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

const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

//Change Hot module replacement to false in MiniCssExtractPlugin

module.exports = merge(common, {
  mode: 'production',
   devtool: 'source-map',
  //Add in extra loader to minify image assets

  optimization: {
    minimizer: [
      //Minify JS; by default applies to all .js files;
      //Included by default in Webpack 4; inclued for clarity
      new TerserJSPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      //Minify CSS; default applies to all .css files
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        /*https://medium.com/hackernoon/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758 
      chunk all node modules and only trigger download on change in production. */
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          reuseExistingChunk: true,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];
            return `npm.${packageName.replace('@', '')}`;
          }
        }
        // vendor: {
        //     test: /[\\/]node_modules[\\/](three|shader-particle-engine|@tweenjs|promise-polyfill)[\\/]/,
        //     name: 'vendor',
        //     chunks: 'all',
        //     reuseExistingChunk: true
        //   }
      }
    }
  }
});

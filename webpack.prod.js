const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
var OfflinePlugin = require("offline-plugin");
const path = require("path");
module.exports = merge(common, {
  mode: "production",
  devtool: "cheap-module-eval-source-map",
  // Add in extra loader to minify image assets
  output: {
    // Content hash used for cache bursting
    filename: "js/[name].[contenthash].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images/",
              name: "[name].[contenthash].[ext]"
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true // webpack@2.x and newer
            }
          }
        ]
      }
    ]
  },
  plugins: [new OfflinePlugin()],
  optimization: {
    minimizer: [
      // Minify JS; by default applies to all .js files;
      // Included by default in Webpack 4; inclued for clarity
      new TerserJSPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      // Minify CSS; default applies to all .css files
      new OptimizeCSSAssetsPlugin({})
      //Creates service worker for Webpack generated assets
    ],
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        /* https://medium.com/hackernoon/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758
      chunk all node modules and only trigger download on change in production. */
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          reuseExistingChunk: true,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];
            return `vendor/npm.${packageName.replace("@", "")}`;
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

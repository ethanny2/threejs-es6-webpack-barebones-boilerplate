/* eslint-disable */
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  output: {
    filename: "js/[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      // Loads all image files; no minfication
      {
        test: /\.(png|svg|jpe?g|gif|ico)$/i,
        use: {
          loader: "file-loader",
          options: {
            outputPath: "images/",
            name: "[name].[ext]",
            esModule: false
          }
        }
      },
      // Loads all audio files
      {
        test: /\.(ogg|wma|mp3|wav|mpe?g)$/i,
        use: {
          loader: "file-loader",
          options: {
            outputPath: "audio/",
            // name: "[name].[contenthash].[ext]"
            name: "[name].[ext]",
            esModule: false
          }
        }
      },
      // Loads all font files
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: {
          loader: "file-loader",
          options: {
            outputPath: "fonts/",
            name: "[name].[ext]",
            esModule: false
          }
        }
      },
      // Loads all 3D model files; add more based on your needs
      {
        test: /\.(obj|gltf|drc|mtl|glb)$/i,
        use: {
          loader: "file-loader",
          options: {
            outputPath: "models/",
            name: "[name].[ext]",
            esModule: false
          }
        }
      },
      //Load all .html files
      {
        test: /\.(html)$/,
        use: {
          loader: "html-loader",
          options: {
            root: path.resolve(__dirname, "dist")
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "src/static"),
    compress: true,
    hot: true,
    port: 9000
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/style.css",
      chunkFilename: "css/style.[id].css"
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
          reuseExistingChunk: true
        }
      }
    }
  }
});

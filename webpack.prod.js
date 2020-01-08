const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");
const glob = require("glob");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const imageminMozjpeg = require("imagemin-mozjpeg");

module.exports = merge(common, {
  mode: "production",
  devtool: "cheap-module-eval-source-map",
  output: {
    // Content hash used for cache bursting
    filename: "js/[name].[contenthash].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpe?g|gif|ico)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images/",
              name: "[name].[contenthash].[ext]",
              esModule: false
            }
          }
        ]
      },
      // Loads all audio files;
      {
        test: /\.(ogg|wma|mp3|wav|mpe?g)$/i,
        use: {
          loader: "file-loader",
          options: {
            outputPath: "audio/",
            name: "[name].[contenthash].[ext]",
            esModule: false
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: {
          loader: "file-loader",
          options: {
            outputPath: "fonts/",
            name: "[name].[contenthash].[ext]",
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
            name: "[name].[contenthash].[ext]",
            esModule: false
          }
        }
      },
      {
        test: /\.(html)$/,
        use: {
          loader: "html-loader",
          options: {
            // minimize: true
            root: path.resolve(__dirname, "dist")
          }
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/style.[contenthash].css",
      chunkFilename: "css/style.[contenthash].css"
    }),
    new ImageminPlugin({
      optipng: {
        optimizationLevel: 6
      },
      plugins: [
        imageminMozjpeg({
          quality: 100,
          progressive: true
        })
      ]
    }),
    new CompressionPlugin({
      test: /\.(html|css|js)(\?.*)?$/i
    }),
    new PurgecssPlugin({
      paths: glob.sync("src/**/*", { nodir: true })
    })
    // new OfflinePlugin()
  ],
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
      }
    }
  }
});

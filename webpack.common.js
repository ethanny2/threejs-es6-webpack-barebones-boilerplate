/* eslint-disable */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
/* For convenience; denotes often used environment info */
const entry = path.resolve(__dirname, './src/js/index.js');
const nodePath = path.resolve(__dirname, './node_modules');

module.exports = {
  stats: {
    chunks: true,
    colors: true,
    env: true
  },
  entry: {
    app: entry
  },
  output: {
    // Content hash used for cache bursting
    filename: 'js/[name].[hash].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Threejs ES6 Simple Boilerplate',
      filename: 'index.html',
      template: './src/static/html/index.html',
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
      chunkFilename: 'css/style.[id].css'
    })
  ],
  module: {
    rules: [
      // Targets all .js files
      {
        test: /\.m?js$/i,
        exclude: nodePath,
        use: [
          // Transplies from ES6 to ES5.
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ['@babel/preset-env'],
              cacheCompression: true
            }
          },
          // Lint javascript before transpiling
          {
            loader: 'eslint-loader',
            options: {
              cache: true
            }
          }
        ]
      },
      // Loads all audio files
      {
        test: /\.(ogg|wma|mp3|wav|mpe?g)$/i,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'audio/',
            name: '[name].[contenthash].[ext]'
          }
        }
      },
      // Loads all font files
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'fonts/',
            name: '[name].[contenthash].[ext]'
          }
        }
      },
      // Loads all CSS, SASS AND SCSS files
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // Path to assets AFTER build process
               publicPath: '../',
              hmr: true
            }
          },
          // Translates CSS into CommonJS
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          // Adds vendor prefixes with Autoprefixer
          'postcss-loader',
          {
            // Compiles SASS to CSS
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  optimization: {
    runtimeChunk: 'single',
    // Vendor code hash (code that is not often changed) keeps its
    // hash string across builds UNLESS the vendor code has changed.
    // https://webpack.js.org/guides/caching/
    moduleIds: 'hashed',
    // splitChunks: {
    //   cacheGroups: {
    //     // Extracts all .css files into a single css file
    //     styles: {
    //       name: 'styles',
    //       test: /\.css$/,
    //       chunks: 'all',
    //       enforce: true
    //     }
    //   }
    // }
  }
};

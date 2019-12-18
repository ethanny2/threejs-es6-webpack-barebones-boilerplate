const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
/* For convenience; denotes often used environment info */
const entry = path.resolve(__dirname, './src/js/index.js');
const nodePath = path.resolve(__dirname, './node_modules');
const devMode = true;

module.exports = {
  stats: {
    chunks: true,
    colors: true,
    env: true
  },
  entry: {
    app: entry
  },
  plugins: [
    // //cleans /dist directory
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Threejs ES6 Simple Boilerplate',
      filename: 'index.html',
      template: './src/static/html/index.html',
      hash: true
    }),
    new MiniCssExtractPlugin({
      //   filename: devMode ? '[name].css' : '[name].[hash].css',
      //   chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
      filename: 'css/[name].[hash].css',
      //What to use for this name...
      chunkFilename: 'css/[name].[id].[hash].css'
    }),
    //cleans /dist directory
    new CleanWebpackPlugin()
  ],
  output: {
      //Content hash used for cache bursting
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      //Targets all .js files
      {
        test: /\.m?js$/i,
        exclude: nodePath,
        use: [
          //Transplies from ES6 to ES5.
          {
            loader: 'babel-loader?cacheDirectory',
            options: {
              presets: ['@babel/preset-env']
            }
          },
          //Lint javascript before transpiling
          {
            loader: 'eslint-loader',
            options: {
              cache: true
            }
          }
        ]
      },
      //Loads all image files
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'images/',
            name: '[name].[hash].[ext]'
          }
        }
      },
      //Loads all audio files
      {
        test: /\.(ogg|wma|mp3|wav|mpe?g)$/i,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'audio/',
            name: '[name].[hash].[ext]'
          }
        }
      },
      //Loads all font files
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'fonts/',
            name: '[name].[hash].[ext]'
          }
        }
      },
      //Loads all CSS, SASS AND SCSS files
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              //Path to assets AFTER build process
              publicPath: '../',
              //find way to toggle
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
            //Compiles SASS to CSS
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
    //Vendor code hash (code that is not often changed) keeps its 
    //hash string across builds UNLESS the vendor code has changed.
    //https://webpack.js.org/guides/caching/
    moduleIds: 'hashed',
    splitChunks: {
      cacheGroups: {
        /* https://webpack.js.org/plugins/split-chunks-plugin/#split-chunks-example-3
           Creates a custom vendor chunk, which contains certain node_modules packages
           matched by RegExp. 
           Used in both the prod and dev builds
        */
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
};

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

/* For convenience; denotes often used environment info */
const devMode = process.env.NODE_ENV !== 'production';
const entry = path.resolve(__dirname, './src/js/index.js');
const nodePath = path.resolve(__dirname, './node_modules');
const cssOutputDirName = 'css';
// const htmlTemplatePath

module.exports = {
  cache: true,
  entry: entry,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      //Loads all JS files and transpiles ES6 to ES5 
      {
        test: /\.m?js(\?.*)?$/i,
        exclude: nodePath,
        use: {
          loader: 'babel-loader?cacheDirectory',
          options: {
            presets: ['@babel/preset-env']
          }
        }
	  },
	  //Loads all image files
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: ['file-loader']
	  },
	  //Loads all audio files 
      {
        test: /\.(ogg|wma|mp3|wav|mpe?g)$/i,
        use: ['file-loader']
	  },
	  //Loads all CSS, SASS AND SCSS files
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: cssOutputDirName,
              hmr: process.env.NODE_ENV === 'development'
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
              sourceMap: true,
              minimize: false,
              outputStyle: 'expanded'
            }
          }
        ]
      }
    ]
  },
  mode: 'development',
  devtool: 'eval',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Threejs ES6 Simple Boilerplate',
      filename: 'index.html',
      template: './src/static/templates/index.html',
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    })
    // new webpack.DllReferencePlugin({
    // 	context: __dirname,
    // 	manifest: require('./library.json')
    // })
  ],
  optimization: {
    minimizer: [
      //Minify JS; by default applies to all .js files
      new TerserJSPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      //Minify CSS; default applies to all .css files
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      //Optimization; extract all CSS to a single file
      cacheGroups: {
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

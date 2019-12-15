const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	cache: true,
	entry: './src/js/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader?cacheDirectory',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: ['file-loader'],
			},
			{
				test: /\.(ogg|mp3|wav|mpe?g)$/i,
				use: ['file-loader'],
			},
		],
	},
	mode: 'development',
	devtool: 'eval',
	plugins: [
		new HtmlWebpackPlugin({
			title: 'PS2 NOISE SAMPLE',
			filename: 'index.html',
			template: './src/static/templates/index.html',
			hash: true,
		}),
		// new webpack.DllReferencePlugin({
		// 	context: __dirname,
		// 	manifest: require('./library.json')
		// })
	],
};

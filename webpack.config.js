//html压缩插件
var HtmlWebpackPlugin = require("html-webpack-plugin");
//js css分离插件
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");
var webpack = require("webpack");

module.exports = {
	"entry":{
		"build":"./src/main.js"
	},
	"output":{
		"path":path.resolve(__dirname,"./dist"),
		"filename":"[name].js"
	},
	"module":{
		"loaders":[
			{
				"test":/\.js$/,
				"loader":"babel-loader",
				"exclude":/node_modules/
			},
			{
				"test":/\.css$/,
				"use":ExtractTextPlugin.extract({
					"fallback":"style-loader",
					"use":"css-loader"
				})
			},
			{
				"test":/\.scss$/,
				"use":ExtractTextPlugin.extract({
					"fallback":"style-loader",
					"use":["css-loader","sass-loader"]
				})
			},
			{
				"test":/\.(png|jpe?g|gif|svg)(\?|S*)?$/,
				"loader":"file-loader",
				"query":{
					"name":"[name].[ext]?[hash]"
				}
			}
		]
	},
	"plugins":[
		new HtmlWebpackPlugin({
			"template":"./src/index.html"
		}),
		new ExtractTextPlugin({
			"filename":"style.css"
		})
	],
	"devServer":{
		"historyApiFallback":true,
		"noInfo":true
	},
	"devtool":"#eval-source-map"
}
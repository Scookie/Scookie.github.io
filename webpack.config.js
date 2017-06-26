var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	devtool:"eval-source-map",
	entry:{
		app: [
            'webpack-dev-server/client?http://localhost:8077/',
            __dirname + "/app/main.js",
        ]
    },
	output:{
		path:__dirname+"/dist",
		filename:"bundle.js"
	},
	resolve: {
	    extensions: ['', '.js', '.jsx']
	},
	module:{
		loaders:[
			{
				test: /\.json$/,
				loader:"json"
			},
			{
				test: /\.js$/,
	            loader: "babel",
	            exclude: /node_modules/,
	            query: {
	                presets: ['react', 'es2015']
	            }
            },
			{
			    test: /\.css$/,
			    loader:"style!css?module"
			}
		]
	},
	plugins:[
		new HtmlWebpackPlugin({
			template:__dirname+"/app/index.tmpl.html"
		}),
		new webpack.optimize.UglifyJsPlugin()
	],
	devServer:{
		contentBase:"./",
		historyApiFallback:true,
		inline:true,
		port: 8077,
		proxy:{
			'/misc/*':{
				changeOrgin:true,
				target:'http://172.16.1.109:8899'
			}
		}
	}
}
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
			    loader:"style!css"
			}, 
			{
	            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
	            loader: 'url?limit=10000&minetype=application/font-woff'
	        }, 
	        {
	            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
	            loader: 'file'
	        },
	        {
	            test: /\.(png|jpg)$/, 
	            loader: 'url?limit=8192' // 内联的base64的图片地址，图片要小于8k，直接的url的地址则不解析
	        }
		]
	},
	plugins:[
		new HtmlWebpackPlugin({
			template:__dirname+"/app/index.tmpl.html",
			filename: '../dist/index.html',
		}),
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.ProvidePlugin({
			$:"jquery",
			jQuery:'jquery',
			"window.jQuery":"jquery",
		})
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
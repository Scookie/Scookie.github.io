const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('../config');
const ROOT_PATH = path.resolve(__dirname, '../');
const APP_PATH = path.resolve(ROOT_PATH, 'src'); //__dirname 中的src目录，以此类推
const APP_FILE = path.resolve(APP_PATH, 'app'); //根目录文件app地址
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist'); //发布文件所存放的目录

module.exports = function() {
    return {
        entry: {
            app: APP_FILE,
            vendor: [
                'react', 'react-dom', 
                'react-router', 'prop-types',
                'react-redux', 'redux',
                'react-router-redux', 'redux-thunk'
            ]
        },
        output: {
            path: BUILD_PATH,
            chunkFilename: '[name].[hash].js',
            filename: '[name].[hash].js',
            sourceMapFilename: '[name].map',
            publicPath: '/'
        },
        module: {
            rules: [
                { 
                    test: /\.(js|jsx)$/,
                    enforce: "pre",
                    exclude: [/^node_modules$/],
                    loader: ["babel-loader", "eslint-loader"]
                }, {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: ['css-loader', 'postcss-loader']
                    })
                }, {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: ["css-loader?sourceMap", "sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true"]
                    })
                }, {
                    test: /\.less$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use:["css-loader?sourceMap", "less-loader?sourceMap"]
                    }),
                }, {
                    test: /\.(jpg|png|gif)$/,
                    use: 'file-loader?name=[name].[ext]'
                }, {
                    test: /\.(eot|woff|svg|ttf|woff2|gif|appcache|webp)(\?|$)/,
                    use: 'file-loader?name=[name].[ext]'
                }
            ]
        },
        resolve: {
            modules: ['node_modules'],
            extensions: ['.js', '.jsx', '.scss', '.css'] //后缀名自动补全
        },
        plugins: [
            new ExtractTextPlugin('[name].[hash].css'),
            new CopyWebpackPlugin([{
                from: path.resolve(APP_PATH, 'assets')
            }]),
            new webpack.optimize.CommonsChunkPlugin({
                names: ['vendor', 'manifest'] // 指定公共 bundle 的名字。
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    'API_URL': JSON.stringify(config.apiUrl)
                }
            })
        ]
    }
}
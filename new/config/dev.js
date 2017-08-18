const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConf = require('./base.js')();
const config = require('../config');
const ROOT_PATH = path.resolve(__dirname, '../');
const HtmlWebpackPlugin = require('html-webpack-plugin');

baseConf.plugins.push(
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('development')
        }
    }),
    new webpack.SourceMapDevToolPlugin({
        filename: '[file].map'
    }),
    new webpack.HotModuleReplacementPlugin(), // 开启全局的模块热替换(HMR)
    new webpack.NamedModulesPlugin(), // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(ROOT_PATH, 'index.html'),
        inject: 'body',
        chunks: ['vendor', 'app', 'manifest'],
        showErrors: true,
        hash: true
    })
)

const devServer = Object.assign({
    hot: true, // 开启服务器的模块热替换
    host: '0.0.0.0',
    port: 8080,
    historyApiFallback: true,
    stats: {
        colors: true,
        'errors-only': true
    },
    contentBase: baseConf.output.path,
    watchContentBase: true,
    publicPath: baseConf.output.publicPath
}, config.server)

module.exports = function(env) {
    return webpackMerge(baseConf, {
        devtool: 'cheap-module-eval-source-map',
        devServer: devServer
    })
};
const path = require('path');
const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const baseConf = require('./base.js')();
const ROOT_PATH = path.resolve(__dirname, '../');
const HtmlWebpackPlugin = require('html-webpack-plugin');

baseConf.plugins.push(
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            drop_console: true,
            // This feature has been reported as buggy a few times, such as:
            // https://github.com/mishoo/UglifyJS2/issues/1964
            // We'll wait with enabling it by default until it is more solid.
            reduce_vars: false,
        },
        output: {
            comments: false,
        },
    }),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(ROOT_PATH, 'index.html'),
        inject: 'body',
        chunks: ['vendor', 'app', 'manifest'],
        showErrors: true,
        hash: true,
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
        },
    })
)

module.exports = function(env) {
    return webpackMerge(baseConf)
}
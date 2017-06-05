// webpack.config.js
var path = require("path");
module.exports = {
  entry: './main.js',
  output: {
    path: path.join(__dirname, './dist'),
    publicPath: "./dist/",
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.json']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: "babel",
      exclude: /node_modules/,
      query: {
        presets: ['react', 'es2015']
      }
    }, {
      test: /\.css$/,
      loader: "style!css"
    }, {
      test: /\.(jpg|png)$/,
      loader: "url?limit=8192"
    }, {
      test: /\.scss$/,
      loader: "style!css!sass"
    }]
  }
};
const webpack = require('webpack');

module.exports = {
  entry: __dirname + "/src/main.js",
  output: {
    path: __dirname + "/scripts",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
  ]
}

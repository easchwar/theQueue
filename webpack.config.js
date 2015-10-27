var path = require('path');

module.exports = {
  entry: "./src/theQueue.jsx",
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js"
  },
  module: {
    loaders: [
    {
      test: /\.css$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'style-loader!css-loader'
    },
    {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel'
    },
    {
      test: /\.node$/,
      loader: "node-loader"
    }
    ]
  },
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".js", ".node"]
  }
};

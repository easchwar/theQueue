var path = require('path');

module.exports = {
    entry: "./src/theQueue.jsx",
    output: {
        path: path.join(__dirname, "public"),
        filename: "bundle.js"
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel'
        }
      ]
    }
};

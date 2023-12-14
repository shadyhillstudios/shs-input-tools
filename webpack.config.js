var path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/compile.js",
  output: {
    path: path.resolve("dist"),
    filename: "index.js",
    libraryTarget: "umd"
  },
  module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/, 
            use: ['babel-loader']
        },
        {
            test: /\.(s*)css$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        }
    ]
  },
  externals: {
    react: "react"
  }
};
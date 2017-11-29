const webpack = require('webpack');
const path = require('path');
const context = path.resolve(__dirname, 'js');
module.exports = {
  context,
  entry: {
    bundle: "./app.js",
    vis: './vis.js',
  },
  output: {
    path: __dirname + '/static',
    filename: "[name].js"
  },
  module: {
    loaders: [
      {
        include: context,
        loaders: [
          'style-loader',
          'css-loader?importLoader=1&modules&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'sass-loader'
        ],
        test: /\.s?css$/
      },
      {
        include: context,
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['flow', 'env', 'react', 'stage-0'],
          plugins: [
            [
              'react-css-modules',
              {
                context,
                'filetypes': {
                  '.css': {
                    syntax: 'postcss-scss'
                  },
                  '.scss': {
                    syntax: 'postcss-scss'
                  }
                }
              }
            ]
          ]
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
  ]
};

const { DefinePlugin } = require('webpack');
const path = require('path');

module.exports = {
  plugins: [
    new DefinePlugin({
      EXEMPLAR_ROOT: `'${path.join(process.cwd(), 'stories', 'index.js')}'`
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        include: process.cwd()
      }
    ]
  }
};

const { DefinePlugin } = require('webpack');
const path = require('path');
const fs = require('fs');

function listOfExamples() {
  const cwd = process.cwd();
  return fs.readdirSync(path.join(cwd, 'examples'))
    .filter(f => f.match(/.js$/))
    .map(f => path.join(cwd, f));
}

function parse(value) {
  return `'${value}'`;
}

module.exports = {
  plugins: [
    new DefinePlugin({
      EXEMPLAR_ROOT: parse(path.join(process.cwd(), 'stories', 'index.js')),
      LIST_OF_EXAMPLES: parse(listOfExamples())
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

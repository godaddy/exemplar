const { DefinePlugin } = require('webpack');
const path = require('path');
const fs = require('fs');

const cwd = process.cwd();

function listOfExamples() {
  return fs.readdirSync(path.join(cwd, 'examples'))
    .filter(f => f.match(/.js$/))
    .map(f => path.join(cwd, f))
}

module.exports = {
  plugins: [
    new DefinePlugin({
      EXEMPLAR_ROOT: `'${path.join(cwd, 'stories', 'index.js')}'`,
      EXAMPLES_DIRECTORY: `'${path.join(cwd, 'examples')}'`,
      WEB_ONLY_DIRECTORY: `'${path.join(cwd, 'examples', 'web')}'`,
      LIST_OF_EXAMPLES: JSON.stringify(listOfExamples())
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

const { DefinePlugin } = require('webpack');
const path = require('path');


const examplesDir = path.join(process.cwd(), 'examples');
const packageJson = require(path.join(process.cwd(), 'package.json'));

function nonIndexJs(file) {
  return path.extname(file) === '.js'
    && file !== 'index.js';
}

function getExamples(dir) {
  const files = fs.readdirSync(dir)
    .filter(nonIndexJs)
    .map(file => path.join(dir, file))

  return JSON.stringify(files);
}

module.exports = {
  plugins: [
    new DefinePlugin({
      // Filter out directories and index.js
      EXEMPLAR_STORIES: getExamples(examplesDir),
      WEB_STORIES: getExamples(path.join(examplesDir, 'web')),
      //NATIVE_STORIES: fs.readdirSync(path.join(examplesDir, 'native'))
      EXEMPLAR_ROOT: `'${path.join(process.cwd(), 'stories', 'index.js')}'`,
      EXEMPLAR_NAME: JSON.stringify(packageJson.name)
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

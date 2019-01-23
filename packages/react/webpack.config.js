const { DefinePlugin } = require('webpack');
const path = require('path');
const fs = require('fs');

const cwd = process.cwd();
const rootDir = path.join(cwd, 'examples');

const dirs = {
  root: rootDir,
  crossPlatform: rootDir,
  webOnly: path.join(rootDir, 'web'),
  scss: path.join(rootDir, 'scss')
};

module.exports = {
  plugins: [
    new DefinePlugin({
      EX_CROSS_PLATFORM: `'${dirs.crossPlatform}'`,
      EX_WEB: `'${dirs.webOnly}'`,
    })
  ],
  module: {
    rules: [{
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader'],
      include: dirs.root
    }]
  }
};

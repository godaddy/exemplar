const debug = require('diagnostics')('exemplar:webpack');
const { DefinePlugin } = require('webpack');
const path = require('path');
const fs = require('fs');

const {
  resolveModules,
  resolveModule,
  resolveDir
} = require('./resolve');

const {
  cwd,
  rootDir,
  pkg,
  alias,
  dirs,
  setup,
  definitions
} = require('./constants');

module.exports = function (baseConfig, env, webpackConfig) {
  //
  // Load SCSS when applicable
  // TODO (@indexzero): Make this configurable
  //
  if (setup.scss !== `''`) {
    debug('SCSS enabled', dirs.root);
    webpackConfig.module.rules.push({
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader'],
      include: dirs.root
    });
  }

  // Define the paths that exemplar will attempt to load
  webpackConfig.plugins.push(new DefinePlugin(definitions));

  // use any aliases that may be provided
  webpackConfig.resolve = { alias };

  return webpackConfig;
};

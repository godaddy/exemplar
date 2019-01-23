const { DefinePlugin } = require('webpack');
const path = require('path');
const fs = require('fs');

/**
 * Resolves the given request for a module.
 *
 * @param {String} request - The requested module path.
 * @param {Boolean} required - Whether or not the module is required.
 * @returns {String?} - The requested string, or null if the module was not required and not found.
 */
function resolveModule(request, required) {
  try {
    return require.resolve(request);
  } catch (err) {
    if (required || err.code !== 'MODULE_NOT_FOUND') {
      console.error(`Error resolving request ${request}`);
      throw err;
    }
  }

  return null;
}

/**
 * Resolves the given request for a directory.
 *
 * @param {String} request - The requested dir path.
 * @param {Boolean} required - Whether or not the directory is required.
 * @returns {String?} - The requested string, or null if the directory was not required and not found.
 */
function resolveDir(request, required) {
  try {
    const stats = fs.statSync(request);
    return `'${request}'`;
  } catch (err) {
    if (required || err.code !== 'ENOENT') {
      console.error(`Error resolving directory ${request}`);
      throw err;
    }
  }

  return `''`;
}


const cwd = process.cwd();
const rootDir = path.join(cwd, 'examples');
const pkg = require(path.join(cwd, 'package.json'));

const dirs = {
  root: rootDir,
  crossPlatform: rootDir,
  webOnly: path.join(rootDir, 'web'),
  env: path.join(rootDir, 'env')
};

//
// TODO (@indexzero): strongly consider renaming
// this from `examples/env` to `examples/shared`!
//
const env = {
  scss: resolveModule(path.join(dirs.env, 'shared.scss'))
};

module.exports = function (baseConfig, envName, webpackConfig) {
  const definitions = {
    EX_CROSS_PLATFORM: resolveDir(dirs.crossPlatform),
    EX_WEB: resolveDir(dirs.webOnly),
    EX_PKG_JSON: JSON.stringify({
      name: pkg.name,
      version: pkg.version
    })
  };

  //
  // Load SCSS when applicable
  // TODO (@indexzero): Make this configurable
  //
  if (env.scss) {
    definitions.EX_ENV_SCSS = `'${env.scss}'`;

    webpackConfig.module.rules.push({
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader'],
      include: dirs.root
    });
  }

  // Define the paths that exemplar will attempt to load
  webpackConfig.plugins.push(new DefinePlugin(definitions));

  return webpackConfig;
};

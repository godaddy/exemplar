const { DefinePlugin } = require('webpack');
const path = require('path');
const fs = require('fs');

/**
 * Resolves the given request for a module.
 *
 * @param {String} request - The requested module path.
 * @param {Boolean} required - Whether or not the module is required.
 * @returns {String} - The requested string, or `''` if the module was not required and not found.
 */
function resolveModule(request, required) {
  try {
    return `'${require.resolve(request)}'`;
  } catch (err) {
    if (required || err.code !== 'MODULE_NOT_FOUND') {
      console.error(`Error resolving request ${request}`);
      throw err;
    }
  }

  return `''`;
}

/**
 * Resolves the given request for a module.
 *
 * @param {String[]} request - The requested module path.
 * @param {Boolean} required - Whether or not the module is required.
 * @returns {String} - The requested string, or `''` if the module was not required and not found.
 */
function resolveModules(requests, required) {
  const result = requests.find(request => {
    return resolveModule(request, required) !== `''`;
  });

  if (result) return `'${result}'`;
  return `''`;
}

/**
 * Resolves the given request for a directory.
 *
 * @param {String} request - The requested dir path.
 * @param {Boolean} required - Whether or not the directory is required.
 * @returns {String} - The requested string, or `''` if the directory was not required and not found.
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

  // Return a wrapped empty string so it will be falsy
  // when inserted via the DefinePlugin.
  return `''`;
}

/**
 * Get the contents of a JSON file
 *
 * @param  {String} required - Full path to JSON file
 * @return {Object} - The requested object, {} if the file was not found.
 */
function generateAliases(setupDir) {
  let data;
  const required = path.join(setupDir, 'aliases.json');

  try {
    data = require(required);
  } catch(err) {
    if (err.code !== 'ENOENT') {
      console.error(`Error resolving JSON file: ${required}`);
      throw err;
    }
  }

  return Object
    .entries(data || {})
    .reduce((acc, [alias, file]) => {
      //
      // Because we're specifying exact files we must pass a $ to webpack.resolve
      // https://webpack.js.org/configuration/resolve/
      //
      acc[`${alias}$`] = path.isAbsolute(file)
        ? file
        : path.join(setupDir, file);

      return acc;
    }, {});
}

const cwd = process.cwd();
const rootDir = path.join(cwd, 'examples');
const pkg = require(path.join(cwd, 'package.json'));
const alias = generateAliases(path.join(rootDir, '.setup'));

const dirs = {
  root: rootDir,
  crossPlatform: rootDir,
  webOnly: path.join(rootDir, 'web'),
  setup: path.join(rootDir, '.setup')
};

const setup = {
  scss: resolveModules([
    path.join(dirs.setup, 'shared.scss'),
    path.join(dirs.setup, 'index.scss')
  ]),
  addons: resolveModule(path.join(dirs.setup, 'addons.js')),
  config: resolveModule(path.join(dirs.setup, 'config.js'))
};

const definitions = {
  EX_CROSS_PLATFORM: resolveDir(dirs.crossPlatform),
  EX_WEB: resolveDir(dirs.webOnly),
  EX_SETUP_ADDONS: setup.addons,
  EX_SETUP_CONFIG: setup.config,
  EX_SETUP_SCSS: setup.scss,
  EX_PKG_JSON: JSON.stringify({
    name: pkg.name,
    version: pkg.version
  })
};

module.exports = function (baseConfig, env, webpackConfig) {
  //
  // Load SCSS when applicable
  // TODO (@indexzero): Make this configurable
  //
  if (setup.scss !== `''`) {
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

const debug = require('diagnostics')('exemplar:constants');
const path = require('path');
const {
  resolveModules,
  resolveModule,
  resolveDir
} = require('./resolve');

/**
 * Get the contents of a JSON file
 *
 * @param  {String} setupDir - Where to find `aliases.json` and relative alias targets.
 * @returns {Object} - The requested object, {} if the file was not found.
 */
function generateAliases(setupDir) {
  let data;
  const required = path.join(setupDir, 'aliases.json');

  try {
    data = require(required);
  } catch (err) {
    if (err.code !== 'MODULE_NOT_FOUND') {
      // eslint-disable-next-line no-console
      console.error(`Error resolving JSON file: ${required}`);
      throw err;
    }
    // there was not an aliases.json file present
    data = {};
  }

  return Object
    .entries(data)
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

debug('cwd', cwd);
debug('root', rootDir);
debug('alias', alias);
debug('dirs', dirs);
debug('setup', setup);
debug('definitions', definitions);

module.exports = {
  cwd,
  rootDir,
  pkg,
  alias,
  dirs,
  setup,
  definitions
};

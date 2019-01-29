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
      // eslint-disable-next-line no-console
      console.error(`Error resolving request ${request}`);
      throw err;
    }
  }

  return `''`;
}

/**
 * Resolves the given request for a module.
 *
 * @param {String[]} requests - The requested module paths.
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
    // eslint-disable-next-line no-sync
    fs.statSync(request);
    return `'${request}'`;
  } catch (err) {
    if (required || err.code !== 'ENOENT') {
      // eslint-disable-next-line no-console
      console.error(`Error resolving directory ${request}`);
      throw err;
    }
  }

  // Return a wrapped empty string so it will be falsy
  // when inserted via the DefinePlugin.
  return `''`;
}

module.exports = {
  resolveModule,
  resolveModules,
  resolveDir
};

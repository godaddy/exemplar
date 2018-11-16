/**
 * Begins the Exemplar Component preview execution.
 *
 * @param {Object} env - Environment of the exemplar execution.
 * @returns {Object} The started preview instance
 * @public
 */
exports.start = function start(env) {
  if (env.files.length > 1) {
    throw new Error('Exemplar: Only single files may be previewed at this time.');
  }

  const Exemplar = require('./entry.js');

  return new Exemplar(env).start(function started(error) {
    if (error) {
      throw error;
    }

    console.log('@exemplar native started!');
  });
};

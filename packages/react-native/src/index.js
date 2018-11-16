/**
 * Begins the Exemplar Component preview execution.
 *
 * @param {Object} env - Environment of the exemplar execution.
 * @returns {Object} The started preview instance
 * @public
 */
exports.start = function start(env) {
  const Exemplar = require('./entry.js');

  return new Exemplar(env).start(function started(error) {
    if (error) {
      throw error;
    }

    console.log('@exemplar native started!');
  });
};

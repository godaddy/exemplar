const path = require('path');

/**
 * Begins the preview execution by starting the target-specific workflow.
 * In both cases this workflow conforms to the same pattern:
 *
 * 1. Find the webpack.config.js for the component.
 * 2. Include any target-specific requirements.
 * 3. Ensure the webpack.config.js starts from the given `{target}/container.js`.
 * 4. Start webpack-dev-server.
 * 5. Indicate success to the user.
 *
 * @param  {Object} env Environment of the preview execution
 */
exports.start = function (env) {
  const target = require(path.join(__dirname, 'src'));
  target.start(env);
};


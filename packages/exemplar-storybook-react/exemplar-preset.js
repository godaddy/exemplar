const { DefinePlugin } = require('webpack');
const { definitions } = require('./constants');

/**
 * Extend the Storybook manager webpack configuration
 * @param  {Object} baseConfig Webpack configuration to modify
 * @param  {Object} options    Settings provided by Storybook
 * @returns {Object} Modified webpack configuration.
 */
exports.managerWebpack = async function managerWebpack(baseConfig) {
  // Define the paths that exemplar will attempt to load
  baseConfig.plugins.push(new DefinePlugin(definitions));

  return baseConfig;
};

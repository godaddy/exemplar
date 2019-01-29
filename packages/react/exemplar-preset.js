const { DefinePlugin } = require('webpack');
const { definitions } = require('./constants');

/**
 * Extend the Storybook manager webpack configuration
 * @param  {Object} baseConfig Webpack configuration to modify
 * @param  {Object} options    Settings provided by Storybook
 * @return {Object}            Modified webpack configuration.
 */
exports.managerWebpack =  async function managerWebpack(baseConfig, options) {
  // Define the paths that exemplar will attempt to load
  baseConfig.plugins.push(new DefinePlugin(definitions));

  return baseConfig;
};

const debug = require('diagnostics')('exemplar:preset');
const { DefinePlugin } = require('webpack');
const {
  alias,
  dirs,
  setup,
  definitions
} = require('./constants');

/**
 * Extend the Storybook manager webpack configuration
 * @param  {Object} baseConfig Webpack configuration to modify
 * @param  {Object} options    Settings provided by Storybook
 * @returns {Object} Modified webpack configuration.
 */
exports.managerWebpack = async function managerWebpack(baseConfig) {
  const { plugins = [] } = baseConfig;

  return {
    ...baseConfig,
    plugins: [
      ...plugins,
      // Define the paths that exemplar will attempt to load
      new DefinePlugin(definitions)
    ]
  };
};

/**
 * Extend the Storybook preview webpack configuration
 * @param  {Object} baseConfig Webpack configuration to modify
 * @param  {Object} options    Settings provided by Storybook
 * @returns {Object} Merged webpack configuration.
 */
exports.webpack = function webpack(baseConfig) {
  const {
    module = {},
    plugins = [],
    resolve = {}
  } = baseConfig;
  let rules = (module.rules || []).slice();

  //
  // Load SCSS when applicable
  // TODO (@indexzero): Make this configurable through the SCSS preset
  // https://github.com/storybookjs/presets/tree/master/packages/preset-scss
  //
  if (setup.scss !== `''`) {
    debug('SCSS enabled', dirs.root);
    rules = [
      ...(module.rules || []),
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        include: dirs.root
      }
    ];
  }

  return {
    ...baseConfig,
    module: {
      ...module,
      rules
    },
    plugins: [
      ...plugins,
      // Define the paths that exemplar will attempt to load
      new DefinePlugin(definitions)
    ],
    resolve: {
      ...resolve,
      // Use any aliases that may be provided
      alias
    }
  };
};


exports.config = function config(entry = []) {
  // Always include our default config for loading examples
  const allConfigs = [require.resolve('./load-examples')];

  //
  // Attempt to load any user-defined configs
  // (e.g. for setting up Storybook addons).
  //
  // Remark (indexzero): could optionally attempt
  // to load `configDir/config.js` here to be less
  // confusing to newcomers more familiar with Storybook
  // itself.
  //
  let fullpath = definitions.EX_SETUP_CONFIG;
  try {
    // TODO: remove ugly hack. Normalize internal data structures
    let config = require.resolve(fullpath.replace(/'/g, ''));
    allConfigs.unshift(config);
  } catch (ex) {
    debug(`Error loading config ${fullpath}:`, ex);
  }

  return [...entry, ...allConfigs];
}

exports.addons = function addons(entry = []) {
  let addons;

  //
  // Remark (indexzero): could optionally attempt
  // to load `configDir/addons.js` here to be less
  // confusing to newcomers more familiar with Storybook
  // itself.
  //
  let fullpath = definitions.EX_SETUP_ADDONS;
  try {
    // TODO: remove ugly hack. Normalize internal data structures
    addons = require.resolve(fullpath.replace(/'/g, ''));
  } catch (ex) {
    debug(`Error loading addons ${fullpath}:`, ex);
    return entry;
  }

  return [...entry, addons];
}

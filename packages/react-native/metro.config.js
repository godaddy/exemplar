/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');
const escape = require('escape-string-regexp');
const mainPackage = require('./package.json');

module.exports = {
  projectRoot: __dirname,
  watchFolders: [
    path.resolve(__dirname, '..', '..', 'examples')
  ],
  resolver: {
    providesModuleNodeModules: [
      'react-native'
    ]
  }
};

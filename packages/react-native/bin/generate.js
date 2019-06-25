const path = require('path');
const fs = require('fs');

/**
 * Metro bundler configuration
 *
 * @param {String} root Base path of @exemplar/react-storybook
 * @returns {String} Metro JSON configuration
 * @private
 */
function metroConfig(root) {
  return `
const blacklist = require('metro-config/src/defaults/blacklist');
const path = require('path');

const cwd = '${ process.cwd() }';
const root = '${ root }';

module.exports = {
  watchFolders: [cwd],
  resolver: {
    blacklistRE: blacklist([
      new RegExp(\`^\${ path.join(cwd, 'node_modules', 'react-native') }/.*$\`)
    ]),
    extraNodeModules: {
      '@babel/runtime': path.resolve(root, 'node_modules', '@babel', 'runtime'),
      'react-native': path.resolve(root, 'node_modules', 'react-native'),
      'react': path.resolve(root, 'node_modules', 'react')
    }
  }
};`
}

/**
 *  Entry file for storybook stories.
 *
 * @param {String} root Base path of @exemplar/react-storybook
 * @param {String} entry path to entry file
 * @returns {String} file content
 * @private
 */
function entryFile(root, entry) {
  const pjson = require(path.join(process.cwd(), 'package.json'));
  const examples = path.join(pjson.name, entry);
  const files = fs.readdirSync(path.join(process.cwd(), entry)); // eslint-disable-line

  const imports = files
    .map(file => path.join(examples, file))
    .map((file, i) => `import Component${i} from '${file}';`)
    .join('\n');

  const additions = files
    .map((file, i) => `story.add('${file}', () => <Component${i} />)`)
    .join('\n');

  return `
/**
 * Auto-generated by @exemplar/native-storybook. Do not modify this file directly.
 */

import React from 'react';
import { storiesOf } from '@storybook/react-native';
${imports}

const story = storiesOf('Exemplar', module);
${additions}
`;
}

/**
 * Data from generate.
 *
 * @typedef {Object} Exemplar
 * @property {String} entry Entry file content
 * @property {String} metro Metro bundler JSON configuration
 */

/**
 * Generate config and content for storybook.
 *
 * @param {String} entry path to stories or React examples, defaults to `[module.name]/examples/native`
 * @returns {Exemplar} Generated content and configuration
 * @public
 */
module.exports = function generate(entry = path.join('examples', 'native')) {
  const root = path.resolve(__dirname, '..');

  return {
    entry: entryFile(root, entry),
    metro: metroConfig(root)
  };
};

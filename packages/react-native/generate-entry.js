const path = require('path');

// will have to be generated instead of hard-coded at some point:
module.exports = function generate(entry = path.join('examples', 'index.native.js')) {
  const examples = path.resolve(process.cwd(), entry);
  const content = `
/**
 * Auto-generated by @exemplar/native-storybook. Do not modify this file directly.
 */

import React from 'react';
import { storiesOf } from '@storybook/react-native';
import examples from '${examples}';

const story = storiesOf('Exemplar', module);

examples.forEach(example => story.add(example.title, () => <example.Component />));
`;

  return content;
};
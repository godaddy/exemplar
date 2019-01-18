import React from 'react';
import { storiesOf } from '@storybook/react';

// requires and returns all modules that match
function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}
const modules = requireAll(require.context(EXAMPLES_DIRECTORY, true, /^\.\/.*\.js$/));

modules.reduce((story, Component, i) => {
  return story.add(`thing-${i}`, () => <Component.default>wat</Component.default>)
}, storiesOf('Dynamically Loaded Examples', module));

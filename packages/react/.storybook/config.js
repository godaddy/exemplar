import { configure } from '@storybook/react';

// automatically import all files ending in *.stories.js
const add = require.context('../stories', true, /add.js$/);
function loadStories() {
  add.keys().forEach(filename => add(filename));
}

configure(loadStories, module);

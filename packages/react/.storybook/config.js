import { configure } from '@storybook/react';

function loadStories() {
  require('../add-all-examples');
}

configure(loadStories, module);

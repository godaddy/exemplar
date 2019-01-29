import { configure } from '@storybook/react';

function loadStories() {
  require('./load-examples');
}

if (EX_SETUP_CONFIG) {
  require(EX_SETUP_CONFIG);
}

configure(loadStories, module);

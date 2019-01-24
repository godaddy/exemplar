import { configure } from '@storybook/react';

function loadStories() {
  require('./add-all-examples');
}

if (EX_SETUP_DECORATORS) {
  require(EX_SETUP_DECORATORS);
}

configure(loadStories, module);

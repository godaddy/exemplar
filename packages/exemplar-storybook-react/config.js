import { configure } from '@storybook/react';

function loadStories() {
  require('./load-examples');
}

if (EX_SETUP_CONFIG) {  // eslint-disable-line no-undef
  require(EX_SETUP_CONFIG);  // eslint-disable-line no-undef
}

configure(loadStories, module);

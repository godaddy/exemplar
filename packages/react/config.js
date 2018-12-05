import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
const path = require('path');

function loadStories() {
  require(path.join(process.cwd(), 'stories', 'index.js');
}

addDecorator(withKnobs);
configure(loadStories, module);

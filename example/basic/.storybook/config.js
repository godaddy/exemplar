import { configure, addDecorator } from '@storybook/react';
import { Decorators } from '@exemplar/react';
import { checkA11y } from '@storybook/addon-a11y';

addDecorator(checkA11y);
addDecorator(Decorators.CenterDecorator);

function loadStories() {
  require('../stories/index.js');
}

configure(loadStories, module);

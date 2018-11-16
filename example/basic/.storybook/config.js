import { configure, addDecorator } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y';
import { withOptions } from '@storybook/addon-options';
import { withKnobs } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

addDecorator(withOptions({name: 'Exemplar'}));
addDecorator(withKnobs);
addDecorator(centered);
addDecorator(checkA11y);

function loadStories() {
  require('../stories');
}

configure(loadStories, module);

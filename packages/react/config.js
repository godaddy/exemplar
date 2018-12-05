import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

function loadStories() {
  require(EXEMPLAR_ROOT);
}

addDecorator(withKnobs);
configure(loadStories, module);

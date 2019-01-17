import {
  configure,
  storiesOf,
  addDecorator
} from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

const stories = storiesOf(EXEMPLAR_NAME, module);

function loadStories() {
  [EXEMPLAR_STORIES, EXEMPLAR_STORIES_WEB].forEach(list => {
    JSON.parse(list).forEach(file => {
      const Component = require(file);
      stories.add(file, () => <Component />);
    });
  });
}

addDecorator(withKnobs);
configure(loadStories, module);

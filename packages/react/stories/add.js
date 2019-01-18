import React from 'react';
import { storiesOf } from '@storybook/react';
import pMap from 'p-map';

const Button = ({ children }) => (
  <button>{ children }</button>
);

const modules = LIST_OF_EXAMPLES.map(filename => import(filename));
const mapper = async module => module.default;

(async () => {
  const storybook = storiesOf('Dynamically Loaded Examples', module);

  storybook
    .add('with text', () => <h1>Hello Button</h1>)
    .add('with some emoji', () => (
      <h1>
        <span role="img" aria-label="so cool">
        😀 😎 👍 💯
        </span>
      </h1>
    ))
    .add('LIST_OF_EXAMPLES', () => <pre>{ JSON.stringify(LIST_OF_EXAMPLES, null, 2) }</pre>)

  // neither of these work, but are needed to resolve components
  // const modules = await pMap(modules, mapper);
  // const modules = await Promise.all(modules);

  const modules = [React.Fragment, React.Fragment, React.Fragment]

  modules.reduce((story, Component, i) => {
    return story.add(`thing-${i}`, () => <Component.default>wat</Component.default>)
  }, storybook);
})();

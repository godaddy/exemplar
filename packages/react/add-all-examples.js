import React from 'react';
import { storiesOf } from '@storybook/react';

/**
 * Generate module from the given context. Taken directly from the wiki here
 * https://github.com/webpack/docs/wiki/context#context-module-api
 *
 * @param  {¯\_(ツ)_/¯} context some wizardy that require.context returns
 * @return {Example[]} A list of React.Components that can be rendered
 */
function requireAll(context) {
  return context.keys().map(key => {
    const mod = context(key);
    return {
      source: key,
      Component: mod.default
    };
  });
}

const crossPlatform = requireAll(require.context(EX_CROSS_PLATFORM, true, /^\.\/.*\.js$/));
const webOnly = requireAll(require.context(EX_WEB, true, /^\.\/.*\.js$/));

const modules = crossPlatform.concat(webOnly);

modules.reduce((stories, example, i) => {
  const { source, Component } = example;

  // Do not attempt to load invalid or undefined example Components
  if (!Component || !Component.name) return stories;

  return stories.add(Component.name, () => React.createElement(Component));
}, storiesOf('Dynamically Loaded Examples', module));

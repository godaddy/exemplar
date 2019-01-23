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

const pkg = EX_PKG_JSON;
const contexts = [
  EX_CROSS_PLATFORM && require.context(EX_CROSS_PLATFORM, true, /^\.\/.*\.js$/),
  EX_WEB && require.context(EX_WEB, true, /^\.\/.*\.js$/)
].filter(Boolean);

const modules = contexts.reduce((all, context) => {
  all.push.apply(all, requireAll(context));
  return all;
}, []);

try {
  if (EX_ENV_SCSS) require(EX_ENV_SCSS);
} catch (ex) {
  /* Ignore errors */
  console.dir(ex);
}

modules.reduce((stories, example, i) => {
  const { source, Component } = example;

  // Do not attempt to load invalid or undefined example Components
  if (!Component || !Component.name) return stories;

  return stories.add(Component.name, () => React.createElement(Component));
}, storiesOf(pkg.name, module));

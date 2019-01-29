import React from 'react';
import { storiesOf } from '@storybook/react';

/**
 * Generate module from the given context. Taken directly from the wiki here
 * https://github.com/webpack/docs/wiki/context#context-module-api
 *
 * @param  {webpack.require} context some wizardry that require.context returns
 * @returns {Example[]} A list of React.Components that can be rendered
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

// eslint-disable-next-line no-undef
const pkg = EX_PKG_JSON;
const contexts = [
  // eslint-disable-next-line no-undef
  EX_CROSS_PLATFORM && require.context(EX_CROSS_PLATFORM, true, /^([a-zA-Z-_]+)\.js$/),
  // eslint-disable-next-line no-undef
  EX_WEB && require.context(EX_WEB, true, /^([a-zA-Z-_]+)\.js$/)
].filter(Boolean);

const modules = contexts.reduce((all, context) => {
  all.push.apply(all, requireAll(context));
  return all;
}, []);

try {
  // eslint-disable-next-line no-undef
  if (EX_SETUP_SCSS) require(EX_SETUP_SCSS);
} catch (ex) {
  // Ignore errors.
  // eslint-disable-next-line no-console
  console.warn(ex);
}

modules.reduce((stories, example, i) => {
  const { Component } = example;

  // Do not attempt to load invalid or undefined example Components
  if (!Component || !Component.name) return stories;

  return stories.add(`[${i}] ${Component.name}`, () => React.createElement(Component));
}, storiesOf(pkg.name, module));

import React from 'react';
import { storiesOf } from '@storybook/react';

/**
 * Generate module from the given context. Taken directly from the wiki here
 * https://github.com/webpack/docs/wiki/context#context-module-api
 *
 * @param  {¯\_(ツ)_/¯} context some wizardy that require.context returns
 * @return {React.Component[]} A list of React.Components that can be rendered
 */
function requireAll(context) {
  return context.keys().map(context).map(C => C.default);
}
const crossPlatform = requireAll(require.context(EXAMPLES_DIRECTORY, true, /^\.\/.*\.js$/));
const webOnly = requireAll(require.context(WEB_ONLY_DIRECTORY, true, /^\.\/.*\.js$/));

const modules = crossPlatform.concat(webOnly);

modules.reduce((story, Component, i) => {
  return story.add(Component.name, () => <Component>wat</Component>)
}, storiesOf('Dynamically Loaded Examples', module));

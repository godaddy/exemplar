const storybook = require('@storybook/react/standalone');
const path = require('path');

storybook({
  mode: 'dev',
  port: 6006,
  configDir: path.join(__dirname, '..', '.storybook')
});

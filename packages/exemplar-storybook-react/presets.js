const path = require('path');

//
// To be able to extend the webpack for the Storybook "manager"
// (i.e. the chrome outside of the example iframe) we must:
//
// 1. Create presets.js
// 2. Specify a preset file
// 3. Implement managerWebpack there.
//
// See: https://github.com/storybooks/storybook/issues/4995
//
module.exports = [
  path.join(__dirname, 'exemplar-preset.js')
];

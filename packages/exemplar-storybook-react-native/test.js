const assume = require('assume');
const generate = require('./bin/generate');

describe('@exemplar/storybook-react-native', function () {
  it('generates file content for storybook index', function () {
    const { entry } = generate('../exemplar-sample/examples/native');

    assume(entry).contains("import Component0 from '@exemplar/exemplar-sample/examples/native/emojis.js';");
    assume(entry).contains("import Component1 from '@exemplar/exemplar-sample/examples/native/text.js';");
    assume(entry).contains("const story = storiesOf('Exemplar', module);");
    assume(entry).contains("story.add('emojis.js', () => <Component0 />)");
    assume(entry).contains("story.add('text.js', () => <Component1 />)");
  });

  it('generates metro config', function () {
    const { metro } = generate('..//exemplar-sample/examples/native');

    assume(metro).contains('watchFolders');
    assume(metro).contains('exemplar/packages/exemplar-storybook-react-native');
    assume(metro).contains('resolver');
    assume(metro).contains('blacklistRE');
    assume(metro).contains('extraNodeModules');
    assume(metro).contains('@babel/runtime');
    assume(metro).contains('react-native');
    assume(metro).contains('react');
  });
});

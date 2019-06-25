const assume = require('assume');
const generate = require('./bin/generate');

describe('@exemplar/native-storybook', function () {
  it('generates file content for storybook index', function () {
    const { entry } = generate('../../examples/native');

    assume(entry).contains("import Component0 from 'examples/native/emojis.js';");
    assume(entry).contains("import Component1 from 'examples/native/text.js';");
    assume(entry).contains("const story = storiesOf('Exemplar', module);");
    assume(entry).contains("story.add('emojis.js', () => <Component0 />)");
    assume(entry).contains("story.add('text.js', () => <Component1 />)");
  });

  it('generates metro config', function () {
    let { metro } = generate('../../examples/native');
    metro = JSON.parse(metro);

    assume(metro).to.have.property('watchFolders');
    assume(metro.watchFolders[0]).contains('exemplar/packages/react-native');
    assume(metro).to.have.property('resolver');
    assume(metro.resolver).to.have.property('extraNodeModules');
    assume(Object.keys(metro.resolver.extraNodeModules)).to.deep.equal([
      '@babel/runtime',
      'react-native',
      'react'
    ]);
  });
});

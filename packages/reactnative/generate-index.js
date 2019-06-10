const fs = require('fs');
const path = require('path');

// will have to be generated instead of hard-coded at some point:
const examplesDirectory = path.join('./examples/native');
const files = fs
  .readdirSync(examplesDirectory)
  .map(file => path.join(examplesDirectory, file));

const imports = files
  .map((file, i) => `import Component${i} from '${file}';`)
  .join('\n');

const additions = files
  .map((file, i) => `.add('${file}', () => <Component${i} />)`)
  .join('\n');

const content = `
import React from 'react';
import { storiesOf } from '@storybook/react-native';

${imports}

storiesOf('Exemplar', module)
${additions};
`;

console.log(content);

import React from 'react';
import { storiesOf } from '@storybook/react';

storiesOf('Globals', module)
  .add('EXEMPLAR_ROOT', () => <pre>{ EXEMPLAR_ROOT }</pre>)
  .add('LIST_OF_EXAMPLES', () => <pre>{ JSON.stringify(LIST_OF_EXAMPLES, null, 2) }</pre>)

import React from 'react';
import { storiesOf } from '@storybook/react';
import { Decorators } from '@exemplar/react';
import { checkA11y } from '@storybook/addon-a11y';
import './index.css';

export default storiesOf('Buttons', module)
  .addDecorator(Decorators.CenterDecorator)
  .addDecorator(checkA11y)
  .add('Secondary Action', () => {
    return <button className='secondaryBtn'>Secondary</button>;
  });

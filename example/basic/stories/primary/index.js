import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y';
import { Decorators } from '@exemplar/react';
import './index.css';

export default storiesOf('Buttons', module)
  .addDecorator(Decorators.CenterDecorator)
  .addDecorator(checkA11y)
  .add('Primary Action', () => {
    return <button className='primaryBtn'>Primary</button>;
  });

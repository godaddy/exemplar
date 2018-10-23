import React from 'react';
import { storiesOf } from '@storybook/react';
import { Decorators } from '@exemplar/react';
import './index.css';

export default storiesOf('Buttons', module)
  .addDecorator(Decorators.CenterDecorator)
  .add('Secondary Action', () => {
    return <button className='secondaryBtn'>Secondary</button>;
  });

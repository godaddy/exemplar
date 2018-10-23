import React from 'react';
import { storiesOf } from '@storybook/react';
import './index.css';

export default storiesOf('Buttons', module)
  .add('Secondary Action', () => {
    return <button className='secondaryBtn'>Secondary</button>;
  });

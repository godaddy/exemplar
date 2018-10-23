import React from 'react';
import { storiesOf } from '@storybook/react';
import './index.css';

export default storiesOf('Buttons', module)
  .add('Primary Action', () => {
    return <button className='primaryBtn'>Primary</button>;
  });

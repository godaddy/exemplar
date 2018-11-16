import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import './index.css';

export default storiesOf('Buttons', module)
  .add('Primary Action', () => {
    return <button className='primaryBtn'>{ text('Button Text', 'Primary') }</button>;
  });

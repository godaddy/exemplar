import React from 'react';

const containerStyles = {
  display: 'flex',
  padding: '1rem',
  height: '100vh',
  width: '100vw',
  alignItems: 'center',
  justifyContent: 'center'
};
const CenterDecorator = storyFn => <div style={containerStyles}>{ storyFn() }</div>;

export { CenterDecorator };

import React, { Component } from 'react';
import { Button } from 'super-secret-components';

const FancyButton = () => (
  <Button design='red' onClick={ () => { document.title = '<3'; } }>
    Press Me to change this window's title!
  </Button>
);

export default FancyButton;

import React, { Component } from 'react';
import { Button } from 'super-secret-components';

export default () => (
  <Button design='red' onPress={ () => { document.title = '<3'; } }>
    Press Me to change this window's title!
  </Button>
);

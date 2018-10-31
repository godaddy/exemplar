import React from 'react';
import { Text } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import Button from '../../src/Button';

export default storiesOf('Buttons', module)
  .add('Primary Action', () => {
    return <Button onPress={action('clicked-text')}>
      <Text>Hello Button</Text>
    </Button>;
  });

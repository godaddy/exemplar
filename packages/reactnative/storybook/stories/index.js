import React from 'react';
import { Button, View } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

const Center = ({ children }) => (
  <View style={{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  }}>
    { children }
  </View>
)

storiesOf('Button', module)
  .add('with text', () => (
    <Center>
      <Button
        title='hi there'
        onPress={action('clicked-text')}>
      </Button>
     </Center>
  ))
  .add('with some emoji', () => (
    <Center>
      <Button
        title='😀 😎 👍 💯'
        onPress={action('clicked-emoji')}>
      </Button>
    </Center>
  ));

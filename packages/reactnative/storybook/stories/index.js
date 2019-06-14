// import React from 'react';
// import { Button, View } from 'react-native';

// import { storiesOf } from '@storybook/react-native';
// import { action } from '@storybook/addon-actions';

// const Center = ({ children }) => (
//   <View style={{
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'center'
//   }}>
//     { children }
//   </View>
// )

// storiesOf('Button', module)
//   .add('with text', () => (
//     <Center>
//       <Button
//         title='hi there'
//         onPress={action('clicked-text')}>
//       </Button>
//      </Center>
//   ))
//   .add('with some emoji', () => (
//     <Center>
//       <Button
//         title='😀 😎 👍 💯'
//         onPress={action('clicked-emoji')}>
//       </Button>
//     </Center>
//   ));

import React from 'react';
import { storiesOf } from '@storybook/react-native';

import Component0 from '../../examples/native/emojis';
import Component1 from '../../examples/native/text';

storiesOf('Exemplar', module)
.add('examples/native/emojis.js', () => <Component0 />)
.add('examples/native/text.js', () => <Component1 />);

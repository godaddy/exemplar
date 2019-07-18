import React from 'react';
import { Button, View } from 'react-native';

export default function Text() {
  return (
    <View style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <Button title='hi there!' />
    </View>
  );
}

import React from 'react';
import { Text } from 'super-secret-components';

const FancyText = () => (
  <Text design='green'>
    The title of this window is { document.title }
  </Text>
);

export default FancyText;

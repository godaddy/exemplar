This directory serves as an example for your Design System. While in practice
your `React` components may be significantly more advanced, they can be
exposed in the same way. If published, these components would be
consumed as follows:

```js
import React from 'react';
import { Button, Text } from 'design-system';

export default () => (
  <>
    <Button design='blue'>Click Me!</Button>
    <Text>Hello There!</Text>
  </>
);
```

This directory serves as an example for your components. While in practice your
`React` components may be significantly more advanced, they do not need to be
exposed in any different manner. If published these components would be able
to be consumed as follows:

```js
import React from 'react';
import { Button, Text } from 'proprietary-component-library';

export default () => (
  <>
    <Button design='blue'>Click Me!</Button>
    <Text>Hello There!</Text>
  </>
);
```

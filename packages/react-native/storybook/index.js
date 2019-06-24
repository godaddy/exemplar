import { AppRegistry } from 'react-native';
import { name as appName } from '../app.json';
import { getStorybookUI, configure } from '@storybook/react-native';

import './rn-addons';

// import stories
configure(() => {
  require('./stories');
}, module);

// Refer to https://github.com/storybooks/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({});

// If you are using React Native vanilla and after installation you don't see your app name here, write it manually.
AppRegistry.registerComponent(appName, () => StorybookUIRoot);

export default StorybookUIRoot;

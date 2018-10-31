import {AppRegistry} from 'react-native';
import StorybookUI from "./.storybook/native.config";
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => StorybookUI);

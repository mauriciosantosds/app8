/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

const app8 = props => <App />;

AppRegistry.registerComponent(appName, () => app8);

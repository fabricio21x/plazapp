import { AppRegistry, YellowBox } from 'react-native';
import index from './src/index';
import ParkingMain from './src/components/parking/ParkingMain';

console.disableYellowBox = true; // Deshabilita los mensajes amarillos de warning
//YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
AppRegistry.registerComponent('plazapp', () => index);

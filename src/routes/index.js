import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import LoginNavigator from './LoginNavigator';
import ShopNavigator from './ShopNavigator';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';


const RootNavigator = createSwitchNavigator(
  {
    Auth: ShopNavigator,
    App: LoginNavigator,
    AuthLoading : AuthLoadingScreen
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

export default createAppContainer(RootNavigator);
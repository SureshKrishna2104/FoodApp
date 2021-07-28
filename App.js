import React from 'react';
import {useSelector, useDispatch, Provider} from 'react-redux';
//import * as cartActions from '../store/actions/cart';
import ShopNavigator from './src/routes/ShopNavigator';
import LoginNavigator from './src/routes/LoginNavigator';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {createStore, combineReducers} from 'redux';
//import {Provider} from 'react-redux';
import cartReducer from './src/store/reducers/cart';

const rootReducer = combineReducers({
  cart: cartReducer,
});
const store = createStore(rootReducer);
export default function App() {
  const [id, setId] = React.useState('');
  //const check = useSelector(state => state.cart.check);
  React.useEffect(() => {
    AsyncStorage.getItem('userId').then(async res => {
      console.warn('resapp', res);
      setId(res);
    });
  }, []);

  return (
    <NavigationContainer>
      <Provider store={store}>
        <LoginNavigator />
      </Provider>
    </NavigationContainer>
  );
  // return (
  //   <Provider store={store}>
  //     <ShopNavigator />
  //   </Provider>
  // );

  //return <ShopNavigator />;
}

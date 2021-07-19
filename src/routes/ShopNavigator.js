import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ShopsList from '../screens/ShopsList';
import ProductList from '../screens/ProductList';
import ProductDetail from '../screens/ProductDetail';
import CartScreen from '../screens/CartScreen';
import SignUp from '../screens/SignUp';
import Login from '../screens/Login';

const ShopNavigator = createStackNavigator(
  {
    Shops: ShopsList,
    Products: ProductList,
    ProductDetails: ProductDetail,
    Cart: CartScreen,
    SignUp: SignUp,
    Login: Login,
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? 'orange' : '',
        alignContent: 'center',
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : ' ',
    },
  },
);
export default createAppContainer(ShopNavigator);

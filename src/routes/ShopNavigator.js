import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ShopsList from '../screens/ShopsList';
import ProductList from '../screens/ProductList';
import ProductDetail from '../screens/ProductDetail';
import CartScreen from '../screens/CartScreen';

const ShopNavigator = createStackNavigator(
  {
    Shops: ShopsList,
    Products: ProductList,
    ProductDetails: ProductDetail,
    Cart: CartScreen,
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

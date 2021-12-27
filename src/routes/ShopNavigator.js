import React, {useEffect} from 'react';
import {createAppContainer} from 'react-navigation';
//import {createDrawerNavigator} from '@react-navigation/drawer';
//import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {useSelector, useDispatch} from 'react-redux';
//import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ShopsList from '../screens/ShopsList';
import ProductList from '../screens/ProductList';
import ProductDetail from '../screens/ProductDetail';
import CartScreen from '../screens/CartScreen';
import SignUp from '../screens/SignUp';
import Login from '../screens/Login';
import OfferScreen from '../screens/OfferScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfile from '../screens/EditProfile';
import OrderScreen from '../screens/OrderScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import * as cartActions from '../store/actions/cart';

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
        backgroundColor: Platform.OS === 'android' ? '#6FC3F7' : '',
        alignContent: 'center',
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : ' ',
    },
  },
);
const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? '#6FC3F7' : '',
  },
  headerTintColor: 'white',
  headerTitleSyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
};
const CartNavigator = createStackNavigator(
  {
    Carts: CartScreen,
    ProductDetails: ProductDetail,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  },
);
const OfferNavigator = createStackNavigator(
  {
    Offer: OfferScreen,
    ProductDetails: ProductDetail,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  },
);
const ProfileNavigator = createStackNavigator(
  {
    Profile: ProfileScreen,
    // Profile1: ProfileScreen,
    ProductDetails: ProductDetail,
    Orders: OrderScreen,
    EditProfile: EditProfile,
    Login: Login,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  },
);
const ShopBotTabNavigator = createBottomTabNavigator(
  {
    Hotels: {
      screen: ShopNavigator,
      navigationOptions: {
        tabBarIcon: ({tabInfo, focused}) => {
          return (
            <Icon
              name="ios-restaurant"
              size={25}
              color={focused ? '#1813A2' : 'grey'}
            />
          );
        },
      },
    },
    Offer: {
      screen: OfferNavigator,
      navigationOptions: {
        tabBarLabel: 'Offers!',

        tabBarIcon: ({tabInfo, focused}) => {
          return (
            <Icon
              name="fast-food"
              size={25}
              color={focused ? '#1813A2' : 'grey'}
            />
          );
        },
      },
    },
    Cart: {
      screen: CartNavigator,
      navigationOptions: {
        tabBarLabel: 'Cart!',
        tabBarIcon: ({tabInfo, focused}) => {
          return (
            <Icon
              name="ios-cart"
              size={25}
              color={focused ? '#1813A2' : 'grey'}
            />
          );
        },
      },
    },
    Profile: {
      screen: ProfileNavigator,
      navigationOptions: {
        tabBarLabel: 'Profile!',
        tabBarIcon: ({tabInfo, focused}) => {
          return (
            <Icon
              name="person"
              size={25}
              color={focused ? '#1813A2' : 'grey'}
            />
          );
        },
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#1813A2',
    },
  },
);

export default createAppContainer(ShopBotTabNavigator);

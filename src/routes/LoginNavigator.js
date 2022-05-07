import React, {useEffect, useState} from 'react';
//import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, Image, StatusBar} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-community/async-storage';
import ShopsList from '../screens/ShopsList';
import ProductList from '../screens/ProductList';
import ProductDetail from '../screens/ProductDetail';
import CartScreen from '../screens/CartScreen';
import SignUp from '../screens/SignUp';
import Search from '../screens/SearchScreen';
import Login from '../screens/Login';
import OfferScreen from '../screens/OfferScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfile from '../screens/EditProfile';
import OrderScreen from '../screens/OrderScreen';
import BillDetail from '../components/BillDetail';
import FavouriteScreen from '../screens/FavouriteScreen';
import SearchScreen from '../screens/SearchScreen';
import TermsAndConditions from '../components/TermsAndConditions';
//import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import * as cartActions from '../store/actions/cart';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import ReturnPolicy from '../components/RetunPolicy';

const HomeStack = createStackNavigator();
const LoginStack = createStackNavigator();
const OfferStack = createStackNavigator();
const SearchStack = createStackNavigator();
const CartStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const LoginNavigator = () => {
  const [id, setId] = useState('');
  const check = useSelector(state => state.cart.check);

  useEffect(() => {
    AsyncStorage.getItem('userId').then(async res => {
      // console.warn('reslog', res);
      //console.warn('rescheck', check);
      setId(res);
    });
  }, [check]);
  return (
    <>
      <Tab.Navigator initialRouteName="Hotels" activeColor="white">
        <Tab.Screen
          name="Hotels"
          component={HomeStackScreen}
          options={{
            tabBarLabel: 'Hotels',
            tabBarIcon: ({focused}) => {
              return (
                <Icon
                  name="ios-restaurant"
                  size={25}
                  color={focused ? '#6FC3F7' : 'grey'}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Offers"
          component={OfferStackScreen}
          options={{
            tabBarLabel: 'Offers',
            tabBarIcon: ({focused}) => {
              return (
                <Icon
                  name="fast-food"
                  size={25}
                  color={focused ? '#6FC3F7' : 'grey'}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchStackScreen}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({focused}) => {
              return (
                <Icon
                  name="search"
                  size={25}
                  color={focused ? '#6FC3F7' : 'grey'}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Cart"
          component={CartStackScreen}
          options={{
            tabBarLabel: 'Cart',

            tabBarIcon: ({tabInfo, focused}) => {
              return (
                <Icon
                  name="ios-cart"
                  size={28}
                  color={focused ? '#6FC3F7' : 'grey'}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStackScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({tabInfo, focused}) => {
              return (
                <Icon
                  name="person"
                  size={25}
                  color={focused ? '#6FC3F7' : 'grey'}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default LoginNavigator;

const SearchStackScreen = ({navigation}) => (
  <SearchStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#6FC3F7',
        shadowColor: '#fff',
        elevation: 0,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <SearchStack.Screen
      name="Search"
      component={SearchScreen}
      options={SearchScreen.navigationOptions}
      // options={{
      //   headerLeft: () => (
      //     <View style={{marginLeft: 12}}>
      //       <Image
      //         style={{
      //           height: 48,
      //           width: 70,
      //         }}
      //         //source={require('../assets/images/ic_launcher.png')}
      //         source={require('../assets/images/icon-header.jpg')}
      //       />
      //     </View>
      //   ),
      //   title: 'Search Food!',
      //   headerTitleAlign: 'center',
      // }}
    />
    <SearchStack.Screen
      name="ProductDetail"
      component={ProductDetail}
      options={ProductDetail.navigationOptions}
      // options={{
      //   title: 'Food Detail',
      //   headerTitleAlign: 'center',
      // }}
    />
  </SearchStack.Navigator>
);

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#6FC3F7',
        shadowColor: '#fff',
        elevation: 0,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <HomeStack.Screen
      name="Shops"
      component={ShopsList}
      options={ShopsList.navigationOptions}
      // options={{
      //   headerLeft: () => (
      //     <View style={{marginLeft: 12}}>
      //       <Image
      //         style={{
      //           height: 48,
      //           width: 70,
      //         }}
      //         //source={require('../assets/images/ic_launcher.png')}
      //         source={require('../assets/images/icon-header.jpg')}
      //       />
      //     </View>
      //   ),
      //   title: 'Hotels',
      //   headerTitleAlign: 'center',
      // }}
    />
    {/* <HomeStack.Screen
      name="Cart"
      component={CartScreen}
      options={{
        title: 'Cart',
        headerTitleAlign: 'center',
      }}
    /> */}
    <HomeStack.Screen
      name="Products"
      component={ProductList}
      options={ProductList.navigationOptions}
      
    />
     <HomeStack.Screen
      name="Orders"
      component={OrderScreen}
      options={{
        title: 'Your Orders',
        headerTitleAlign: 'center',
      }}
    />
     <HomeStack.Screen
      name="BillDetail"
      component={BillDetail}
      options={{
        title: 'Bill Details',
        headerTitleAlign: 'center',
      }}
    />
    <HomeStack.Screen
      name="AuthLoading"
      component={AuthLoadingScreen}
      options={ProductList.navigationOptions}
      
    />
    <HomeStack.Screen
      name="ProductDetail"
      component={ProductDetail}
      options={ProductDetail.navigationOptions}
      
    />
  </HomeStack.Navigator>
);

const CartStackScreen = ({navigation}) => (
  <CartStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#6FC3F7',
        shadowColor: '#fff',
        elevation: 0,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <CartStack.Screen
      name="Cart"
      component={CartScreen}
      options={CartScreen.navigationOptions}
    />
     {/* <CartStack.Screen
      name="Orders"
      component={OrderScreen}
      options={{
        title: 'Your Orders',
        headerTitleAlign: 'center',
      }}
    /> */}
     <CartStack.Screen
      name="BillDetail"
      component={BillDetail}
      options={{
        title: 'Bill Details',
        headerTitleAlign: 'center',
      }}
    />
    <CartStack.Screen
      name="Login"
      component={Login}
      options={{
        title: 'Login',
        headerTitleAlign: 'center',
      }}
    />
    <CartStack.Screen
      name="SignUp"
      component={SignUp}
      options={{
        title: 'SignUp',
        headerTitleAlign: 'center',
      }}
    />
  </CartStack.Navigator>
);

const OfferStackScreen = ({navigation}) => (
  <OfferStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#6FC3F7',
        shadowColor: '#fff',
        elevation: 0,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <OfferStack.Screen
      name="Offer"
      component={OfferScreen}
      options={OfferScreen.navigationOptions} // options={{
      //   headerLeft: () => (
      //     <View style={{marginLeft: 12}}>
      //       <Image
      //         style={{
      //           height: 48,
      //           width: 70,
      //         }}
      //         //source={require('../assets/images/ic_launcher.png')}
      //         source={require('../assets/images/icon-header.jpg')}
      //       />
      //     </View>
      //   ),
      //   title: 'Todays Offer!',
      //   headerTitleAlign: 'center',
      // }}
    />
    <OfferStack.Screen
      name="ProductDetail"
      component={ProductDetail}
      options={ProductDetail.navigationOptions}
      // options={{
      //   title: 'Food Detail',
      //   headerTitleAlign: 'center',
      // }}
    />
  </OfferStack.Navigator>
);

const ProfileStackScreen = ({navigation}) => (
  <ProfileStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#6FC3F7',
        shadowColor: '#fff',
        elevation: 0,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <ProfileStack.Screen
      name="Profile"
      component={ProfileScreen}
      //options={ProfileScreen.navigationOptions}
      options={{
        headerTitle: (
          <Text
            style={{
              alignContent: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: 17,
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}>
            Profile
          </Text>
        ),
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#6FC3F7',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: () => (
          <View style={{marginLeft: 5}}>
            <Image
              style={{
                height: 48,
                width: 70,
              }}
              source={require('../assets/images/icon-header.jpg')}
              //source={require('../assets/images/ic_launcher.png')}
              // source={{
              //   uri: 'https://icon-library.com/images/360-icon-png/360-icon-png-15.jpg',
              // }}
            />
          </View>
        ),
      }}
    />
    <ProfileStack.Screen
      name="Orders"
      component={OrderScreen}
      options={{
        title: 'Your Orders',
        headerTitleAlign: 'center',
      }}
    />
    <ProfileStack.Screen
      name="ProductDetail"
      component={ProductDetail}
      options={ProductDetail.navigationOptions}
      // options={{
      //   title: 'Food Detail',
      //   headerTitleAlign: 'center',
      // }}
    />
   
    <ProfileStack.Screen
      name="BillDetail"
      component={BillDetail}
      options={{
        title: 'Bill Details',
        headerTitleAlign: 'center',
      }}
    />
    <ProfileStack.Screen
      name="Favourites"
      component={FavouriteScreen}
      options={{
        title: 'Your Favourites',
        headerTitleAlign: 'center',
      }}
    />
    <ProfileStack.Screen
      name="ReturnPolicy"
      component={ReturnPolicy}
      options={{
        title: 'Return and Refund policy',
        headerTitleAlign: 'center',
      }}
    />
     <ProfileStack.Screen
      name="TermsAndConditions"
      component={TermsAndConditions}
     // options={ProductList.navigationOptions}
     options={{
      title: 'Terms And Condtions',
      headerTitleAlign: 'center',
    }}
      
    />
    <ProfileStack.Screen
      name="EditProfile"
      component={EditProfile}
      options={{
        title: 'Edit Profile',
        headerTitleAlign: 'center',
      }}
    />
    <ProfileStack.Screen
      name="Login"
      component={Login}
      options={{
        title: 'Login',
        headerTitleAlign: 'center',
      }}
    />
    <ProfileStack.Screen
      name="SignUp"
      component={SignUp}
      options={{
        title: 'SignUp',
        headerTitleAlign: 'center',
      }}
    />
  </ProfileStack.Navigator>
);
const LoginStackScreen = ({navigation}) => (
  <LoginStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#6FC3F7',
        shadowColor: '#fff',
        elevation: 0,
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <LoginStack.Screen
      name="Login"
      component={Login}
      options={{
        title: 'Login',
      }}
    />
    <LoginStack.Screen
      name="SignUp"
      component={SignUp}
      options={{
        title: 'SignUp',
      }}
    />
  </LoginStack.Navigator>
);
// import React, {useEffect} from 'react';
// import {createAppContainer} from 'react-navigation';
// //import {createDrawerNavigator} from '@react-navigation/drawer';
// //import {createDrawerNavigator} from 'react-navigation-drawer';
// import {createStackNavigator} from 'react-navigation-stack';
// import {createBottomTabNavigator} from 'react-navigation-tabs';
// import {useSelector, useDispatch} from 'react-redux';
// //import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import ShopsList from '../screens/ShopsList';
// import ProductList from '../screens/ProductList';
// import ProductDetail from '../screens/ProductDetail';
// import CartScreen from '../screens/CartScreen';
// import SignUp from '../screens/SignUp';
// import Login from '../screens/Login';
// import OfferScreen from '../screens/OfferScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import EditProfile from '../screens/EditProfile';
// import OrderScreen from '../screens/OrderScreen';
// import AuthLoadingScreen from '../screens/AuthLoadingScreen';
// import Icon from 'react-native-vector-icons/Ionicons';
// import * as cartActions from '../store/actions/cart';

// const ShopNavigator = createStackNavigator(
//   {
//     Shops: ShopsList,
//     Products: ProductList,
//     ProductDetails: ProductDetail,
//     Cart: CartScreen,
//     SignUp: SignUp,
//     Login: Login,
//   },
//   {
//     defaultNavigationOptions: {
//       headerTitleAlign: 'center',
//       headerStyle: {
//         backgroundColor: Platform.OS === 'android' ? '#6FC3F7' : '',
//         alignContent: 'center',
//       },
//       headerTintColor: Platform.OS === 'android' ? 'white' : ' ',
//     },
//   },
// );
// const defaultStackNavOptions = {
//   headerStyle: {
//     backgroundColor: Platform.OS === 'android' ? '#6FC3F7' : '',
//   },
//   headerTintColor: 'white',
//   headerTitleSyle: {
//     fontFamily: 'open-sans-bold',
//   },
//   headerBackTitleStyle: {
//     fontFamily: 'open-sans',
//   },
// };
// const CartNavigator = createStackNavigator(
//   {
//     Carts: CartScreen,
//     ProductDetails: ProductDetail,
//   },
//   {
//     defaultNavigationOptions: defaultStackNavOptions,
//   },
// );
// const OfferNavigator = createStackNavigator(
//   {
//     Offer: OfferScreen,
//     ProductDetails: ProductDetail,
//   },
//   {
//     defaultNavigationOptions: defaultStackNavOptions,
//   },
// );
// const ProfileNavigator = createStackNavigator(
//   {
//     // Profile: ProfileScreen,
//     // // Profile1: ProfileScreen,
//     // ProductDetails: ProductDetail,
//     // Orders: OrderScreen,
//     // EditProfile: EditProfile,
//     Login: Login,
//   },
//   {
//     defaultNavigationOptions: defaultStackNavOptions,
//   },
// );
// const ShopBotTabNavigator = createBottomTabNavigator(
//   {
//     Hotels: {
//       screen: ShopNavigator,
//       navigationOptions: {
//         tabBarIcon: ({tabInfo, focused}) => {
//           return (
//             <Icon
//               name="ios-restaurant"
//               size={25}
//               color={focused ? '#1813A2' : 'grey'}
//             />
//           );
//         },
//       },
//     },
//     Offer: {
//       screen: OfferNavigator,
//       navigationOptions: {
//         tabBarLabel: 'Offers!',

//         tabBarIcon: ({tabInfo, focused}) => {
//           return (
//             <Icon
//               name="fast-food"
//               size={25}
//               color={focused ? '#1813A2' : 'grey'}
//             />
//           );
//         },
//       },
//     },
//     Cart: {
//       screen: CartNavigator,
//       navigationOptions: {
//         tabBarLabel: 'Cart!',
//         tabBarIcon: ({tabInfo, focused}) => {
//           return (
//             <Icon
//               name="ios-cart"
//               size={25}
//               color={focused ? '#1813A2' : 'grey'}
//             />
//           );
//         },
//       },
//     },
//     Profile: {
//       screen: ProfileNavigator,
//       navigationOptions: {
//         tabBarLabel: 'Profile!',
//         tabBarIcon: ({tabInfo, focused}) => {
//           return (
//             <Icon
//               name="person"
//               size={25}
//               color={focused ? '#1813A2' : 'grey'}
//             />
//           );
//         },
//       },
//     },
//   },
//   {
//     tabBarOptions: {
//       activeTintColor: '#1813A2',
//     },
//   },
// );

// export default createAppContainer(ShopBotTabNavigator);

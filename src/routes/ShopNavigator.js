import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  DevSettings,
  Alert,
} from 'react-native';
import RNRestart from 'react-native-restart';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerItemList,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import DHomeScreen from '../screens/DeliveryMan/DHomeScreen';
import DFoodDetail from '../screens/DeliveryMan/DFoodDetail';
import DOrderDetail from '../screens/DeliveryMan/DOrderDetail';

import AsyncStorage from '@react-native-community/async-storage';

const NavigationDrawerStructure = props => {
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={() => toggleDrawer()}>
        {/*Donute Button Image */}
        <Image
          source={{
            uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
          }}
          style={{width: 25, height: 25, marginLeft: 5}}
        />
      </TouchableOpacity>
    </View>
  );
};

const ShopNavigator = createStackNavigator();
const Drawer = createDrawerNavigator();

function firstScreenStack({navigation}) {
  return (
    <ShopNavigator.Navigator initialRouteName="FirstPage">
      <ShopNavigator.Screen
        name="FirstPage"
        component={DOrderDetail}
        options={{
          title: 'MyOrders', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#6FC3F7',
            shadowColor: '#fff',
            elevation: 0,
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
       <ShopNavigator.Screen
      name="FoodDetail"
      component={DFoodDetail}
      options={{
        title: 'FoodDetail', //Set Header Title
        headerStyle: {
          backgroundColor: '#6FC3F7',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    />
    </ShopNavigator.Navigator>
  );
}

const ShopStack = ({navigation}) => (
  <ShopNavigator.Navigator
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
    <ShopNavigator.Screen
      name="FoodOrders"
      component={DHomeScreen}
      options={{
        title: 'HomePage', //Set Header Title
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#6FC3F7',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    />

    <ShopNavigator.Screen
      name="FoodDetail"
      component={DFoodDetail}
      options={{
        title: 'FoodDetail', //Set Header Title
        headerStyle: {
          backgroundColor: '#6FC3F7',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    />
  </ShopNavigator.Navigator>
);
function root() {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: '#e91e63',
        itemStyle: {marginVertical: 5},
      }}
      drawerContent={props => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              label="Logout"
              onPress={() =>
                Alert.alert(
                  'Logout',
                  'Are you sure want to logout',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => {
                        return null;
                      },
                    },
                    {
                      text: 'Confirm',
                      onPress: () => {
                        AsyncStorage.removeItem('userToken');
                        AsyncStorage.removeItem('userId');
                        AsyncStorage.removeItem('role');
                        //DevSettings.reload();
                        RNRestart.Restart()
                      },
                      // onPress: () => {
                      //   onPressButton()
                      //   //  AsyncStorage.removeItem('userToken'),
                      //   //   AsyncStorage.removeItem('userId'),
                      //   //   getProfile();
                      // },
                    },
                  ],
                  {cancelable: false},
                )
              }
            />
          </DrawerContentScrollView>
        );
      }}>
      <Drawer.Screen
        name="SecondPage"
        options={{drawerLabel: 'HomePage'}}
        component={ShopStack}
      />
      <Drawer.Screen
        name="FirstPage"
        options={{drawerLabel: 'MyOrders',title:'My Orders'}}
        component={firstScreenStack}
      />
    </Drawer.Navigator>
  );
}
export default root;
// const ShopNavigator = createStackNavigator(
//   {
//     FoodOrders:DHomeScreen,
//     FoodDetail:DFoodDetail
//   }
//   // {
//   //   defaultNavigationOptions: {
//   //     headerTitleAlign: 'center',
//   //     headerStyle: {
//   //       backgroundColor: Platform.OS === 'android' ? '#6FC3F7' : '',
//   //       alignContent: 'center',
//   //     },
//   //     headerTintColor: Platform.OS === 'android' ? 'white' : ' ',
//   //   },
//   // },
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
//     Profile: ProfileScreen,
//     // Profile1: ProfileScreen,
//     ProductDetails: ProductDetail,
//     Orders: OrderScreen,
//     EditProfile: EditProfile,
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
//     // Offer: {
//     //   screen: OfferNavigator,
//     //   navigationOptions: {
//     //     tabBarLabel: 'Offers!',

//     //     tabBarIcon: ({tabInfo, focused}) => {
//     //       return (
//     //         <Icon
//     //           name="fast-food"
//     //           size={25}
//     //           color={focused ? '#1813A2' : 'grey'}
//     //         />
//     //       );
//     //     },
//     //   },
//     // },
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

//export default createAppContainer(ShopNavigator);

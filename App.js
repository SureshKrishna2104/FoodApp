import React from 'react';
import {useSelector, useDispatch, Provider} from 'react-redux';
//import * as cartActions from '../store/actions/cart';
import ShopNavigator from './src/routes/ShopNavigator';
import LoginNavigator from './src/routes/LoginNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {View, Text, ScrollView, Image, StyleSheet, StatusBar,NetInfo} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {createStore, combineReducers} from 'redux';
import RootNavigator from './src/routes/index'
//import {Provider} from 'react-redux';
import cartReducer from './src/store/reducers/cart';
import OfflineNotice from './src/components/OfflineNotice';

const rootReducer = combineReducers({
  cart: cartReducer,
});
const store = createStore(rootReducer);
export default function App() {
  
  const [isVisible, setIsVisible] = React.useState(true);
  const [id, setId] = React.useState('');
  Hide_Splash_Screen = () => {
    setIsVisible(false);
  };
  //const check = useSelector(state => state.cart.check);
  React.useEffect(() => {
    AsyncStorage.getItem('userId').then(async res => {
     // console.warn('resapp', res);
      setId(res);
    });
    setTimeout(function () {
      Hide_Splash_Screen();
    }, 5000);
  }, []);

  return (
    // <View >
    <View style={styles.MainContainer}>
     
      {isVisible === true ? (
        <View style={{backgroundColor: '#fff', alignContent: 'center'}}>
          <Image
             source={require('./src/assets/images/flash.jpg')}
             resizeMode="contain"
             style={{
               width: '100%',
               height: '100%',
               justifyContent: 'center',
             }}
          />
        </View>
      ) : (
        <NavigationContainer>
          <Provider store={store}>
            <RootNavigator />
            <OfflineNotice/>
          </Provider>
        </NavigationContainer>
      )}
    </View>
  );
  // return (
  //   <Provider store={store}>
  //     <ShopNavigator />
  //   </Provider>
  // );

  //return <ShopNavigator />;
}
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },

  SplashScreen_RootView: {
    justifyContent: 'center',
    flex: 1,
    margin: 10,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  SplashScreen_ChildView: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#00BCD4',
    flex: 1,
  },
});

// import React, {Component} from 'react';
// import {
//   Platform,
//   StyleSheet,
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// export default class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       isVisible: true,
//     };
//   }
//   Hide_Splash_Screen = () => {
//     this.setState({
//       isVisible: false,
//     });
//   };

//   componentDidMount() {
//     var that = this;
//     setTimeout(function () {
//       that.Hide_Splash_Screen();
//     }, 5000);
//   }

//   render() {
//     let Splash_Screen = (
//       <View style={styles.SplashScreen_RootView}>
//         <View style={styles.SplashScreen_ChildView}>
//           <Image
//             source={{
//               uri: 'https://static.javatpoint.com/tutorial/react-native/images/react-native-tutorial.png',
//             }}
//             style={{width: '100%', height: '100%', resizeMode: 'contain'}}
//           />
//         </View>
//       </View>
//     );
//     return (
//       <View style={styles.MainContainer}>

//         <NavigationContainer>

//           <Provider store={store}>
//             <LoginNavigator />

//           </Provider>

//         </NavigationContainer>
//         {this.state.isVisible === true ? Splash_Screen : null}
//       </View>
//     );
//   }
// }

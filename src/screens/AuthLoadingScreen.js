import React, {useEffect} from 'react';
import {ActivityIndicator, StatusBar, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
function AuthLoadingScreen({navigation}) {
  useEffect(() => {
    console.log('hihihi');
    AsyncStorage.getItem('role').then(async res => {
      if (res == 'deliveryboy') {
        //navigation.navigate('App');
        navigation.navigate('Auth');
      } else {
        navigation.navigate('App');
        // navigation.navigate('Auth');
      }
    });
  }, []);
  // _bootstrapAsync = async () => {
  //   let userToken;
  //   try {
  //     // userToken = await AsyncStorage.getItem('userId');
  //     // this.props.navigation.navigate(userToken ? 'Profile1' : 'Login');
  //     AsyncStorage.getItem('role').then(async res => {
  //       if (res) {
  //         this.props.navigation.navigate('Auth');
  //       } else {
  //         this.props.navigation.navigate('App');
  //       }
  //     });
  //   } catch (e) {}
  // };
  // componentWillUnmount(){
  //   _bootstrapAsync=null;
  // }

  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
}
export default AuthLoadingScreen;

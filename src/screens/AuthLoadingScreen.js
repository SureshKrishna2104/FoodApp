import React from 'react';
import {ActivityIndicator, StatusBar, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    let userToken;
    try {
      userToken = await AsyncStorage.getItem('userId');
      //console.warn('uT', userToken);
      //setToken(userToken);
      this.props.navigation.navigate(userToken ? 'Profile1' : 'Login');
    } catch (e) {
      // Restoring token failed
      // console.warn('userToken', userToken);
    }
    // After restoring token, we may need to validate it in production apps
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    //dispatch({type: 'RESTORE_TOKEN', token: userToken});
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
export default AuthLoadingScreen;

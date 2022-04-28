import React, {PureComponent, useEffect, useState} from 'react';
import {View, Text, Dimensions, StyleSheet, Alert} from 'react-native';

import NetInfo, {useNetInfo} from '@react-native-community/netinfo';

const {width} = Dimensions.get('window');

function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
  );
}

// const unsubscribe = NetInfo.addEventListener(state => {
//   console.log("Connection type", state.type);
//   alert("Is connected?EVENT "+ state.isConnected);
// });

// // Unsubscribe
// unsubscribe();

class OfflineNotice extends PureComponent {
  state = {
    isConnected: true,
    unsubscribe: null,
  };

  componentDidMount() {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      // alert("Is connected?EVENT "+ state.isConnected);
      this.handleConnectivityChange(state.isConnected);
      // if (state.isConnected) {
      this.setState(prevState => ({
        ...prevState,
        isConnected: state.isConnected,
      }));
      // } else {
      //   this.setState({ isConnected : state.isConnected});
      // }
    });
    this.setState(prevState => ({
      ...prevState,
      unsubscribe: unsubscribe,
    }));
    NetInfo.fetch().done(isConnected => {
      if (isConnected.isConnected == true) {
        this.setState(prevState => ({
          ...prevState,
          isConnected: true,
        }));
      } else {
        this.setState(prevState => ({
          ...prevState,
          isConnected: false,
        }));
      }
    });
  }

  componentWillUnmount() {
    // NetInfo.removeEventListener(
    //   'connectionChange',
    //   this.handleConnectivityChange,
    // );
    if (this.state.unsubscribe) this.state.unsubscribe();
  }

  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState(prevState => ({
        ...prevState,
        isConnected: isConnected,
      }));
    } else {
      this.setState(prevState => ({
        ...prevState,
        isConnected: isConnected,
      }));
    }
    console.log(isConnected);
  };

  render() {
    console.log(this.state.unsubscribe, 'subs');
    if (!this.state.isConnected) {
      return <MiniOfflineSign />;
    }
    return null;
  }
}

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: 'red',
    minHeight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    bottom: 0,
  },
  offlineText: {color: '#fff'},
});

export default OfflineNotice;

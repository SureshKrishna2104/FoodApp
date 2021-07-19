import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
//import CommonStyles from '../constants/styles';

const ActivityLoading = ({size}) => {
  const {ActivityIndicator_Style} = styles;

  return (
    <View style={ActivityIndicator_Style}>
      <ActivityIndicator size={size} color="blue" />
    </View>
  );
};

const styles = StyleSheet.create({
  ActivityIndicator_Style: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

export default ActivityLoading;

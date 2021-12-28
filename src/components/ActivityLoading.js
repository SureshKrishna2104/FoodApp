import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
//import CommonStyles from '../constants/styles';

const ActivityLoading = ({size}) => {
  const {ActivityIndicator_Style} = styles;

  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size={size} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default ActivityLoading;

import {StyleSheet, Text, View,TouchableOpacity,Alert} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const DHomeScreen = ({navigation}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          Alert.alert(
            'Log out',
            'Do you want to logout?',
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
                  AsyncStorage.removeItem('role');
                  AsyncStorage.removeItem('userId');
                  navigation.navigate('AuthLoading')

                },
              },
            ],
            {cancelable: false},
          )
        }>
        <Text>LogOut</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DHomeScreen;

const styles = StyleSheet.create({});

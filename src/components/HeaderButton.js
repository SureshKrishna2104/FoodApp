import React from 'react';
import {Platform} from 'react-native';
import {HeaderButton} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/Ionicons';
import {Ionicons} from '@expo/vector-icons';
//import Colors from '../../constatnts/Colors';
const CustomHeaderButton = props => {
  return (
    <HeaderButton {...props} IconComponent={Icon} iconSize={23} color="white" />
  );
};
export default CustomHeaderButton;

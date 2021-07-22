import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

const CartItem = props => {
  // let q = props.quantity;
  // useEffect(() => {
  //   console.warn('qua', q);
  //   AsyncStorage.setItem('count', q.toString());
  // });
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>
          {props.quantity}
          {'    '}
        </Text>
        <Text style={styles.mainText}>{props.title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>${props.amount.toFixed(2)}</Text>
        <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
          <Icon name="ios-remove-sharp" size={23} color="red" />
        </TouchableOpacity>
        <TouchableOpacity onPress={props.onAdd} style={styles.deleteButton}>
          <Icon name="ios-add" size={23} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontFamily: 'open-sans',
    color: '#888',
    fontSize: 16,
  },
  mainText: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20,
  },
});

export default CartItem;

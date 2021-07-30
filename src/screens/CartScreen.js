import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  FlatList,
  NativeModules,
  NativeEventEmitter,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
//import Colors from '../../constatnts/Colors';
import CartItem from '../components/CartItem';
import * as cartActions from '../store/actions/cart';
import {postMethod} from '../services/Apiservices';
//import RazorpayCheckout from 'react-native-razorpay';

const CartScreen = props => {
  const [id, setId] = useState();

  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        itemId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) => (a.itemId > b.itemId ? 1 : -1));
  });
  useEffect(() => {
    // AsyncStorage.getItem('userId')

    AsyncStorage.getItem('userId').then(async res => {
      console.warn('res', res);
      setId(res);
    });
  }, []);
  const onPressButton = () => {
    console.warn('button clicked', cartItems, id);
    if (!id) {
      props.navigation.navigate('Login');
    } else {
      console.warn('foods', cartItems);
      if (cartItems.length === 0) {
        alert('Please add items to cart');
      } else {
        console.warn('foods', cartItems.itemId);
        const req = {
          itemId: cartItems.itemId,
          quantity: cartItems.quantity,
        };
        console.warn('rrq', req);
        console.warn('id', id);
        postMethod('/orders/' + id, cartItems)
          .then(response => {
            if (response) {
              console.warn('order response', response);

              if (response.status == 200) {
                // const user_data = {
                //         token: response.data.token,
                //         userId: response.data.userId,
                //         roles: response.data.roles,
                //         userName: response.data.userName,
                //     };

                // setInfo(response)
                // signIn(user_data);
                // setIsLoading(false)

                Alert.alert('Your foods ordered sucessfully');
                props.navigation.navigate('Shops');
                dispatch(cartActions.emptyCart());
                // <CartItem
                //   quantity=""
                //   title=""
                //   amount=""
                //   onRemove={() => {
                //     dispatch(cartActions.removeFromCart(itemData.item.itemId));
                //   }}
                // />;
                //cartItems = [];
                //transformedCartItems = [];
              } else if (response.data.status == 500) {
                //setIsLoading(false)

                Alert.alert('Not able to signup, Please try later');
              }
              if (response.data.status == 404) {
                //setIsLoading(false)

                Alert.alert('User account already deactivated');
              }
            }
          })
          .catch(error => {
            //setIsLoading(false)

            Alert.alert(
              'No Internet connection.\n Please check your internet connection \nor try again',
              error,
            );
            console.warn(
              'No Internet connection.\n Please check your internet connection \nor try again',
              error,
            );
          });
      }
    }
  };
  const renderGrid = itemData => {
    AsyncStorage.setItem('count', itemData.item.quantity);
    return (
      <CartItem
        quantity={itemData.item.quantity}
        title={itemData.item.productTitle}
        amount={itemData.item.sum}
        onRemove={() => {
          dispatch(cartActions.removeFromCart(itemData.item.itemId));
        }}
        onAdd={() => {
          dispatch(
            cartActions.addToCart(
              itemData.item.itemId,
              itemData.item.productPrice,
              itemData.item.productTitle,
            ),
          );
        }}
      />
    );
  };
  const dispatch = useDispatch();
  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:<Text>{cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button color="red" title="Proceed to Pay" onPress={onPressButton} />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.itemId}
        renderItem={renderGrid}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
  amount: {
    color: 'grey',
  },
});
export default CartScreen;

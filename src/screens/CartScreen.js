import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  FlatList,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
//import Colors from '../../constatnts/Colors';
import CartItem from '../components/CartItem';
import * as cartActions from '../store/actions/cart';
//import RazorpayCheckout from 'react-native-razorpay';

const CartScreen = props => {
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1,
    );
  });
  //   const onPressButton = () => {
  //     var options = {
  //       description: 'Credits towards consultation',
  //       image: 'https://i.imgur.com/3g7nmJC.png',
  //       currency: 'USD',
  //       key: 'rzp_test_9Uxn5bk4geZo24',
  //       amount: cartTotalAmount.toFixed(2) * 1000,
  //       name: 'foo',
  //       prefill: {
  //         email: 'sureshkrish2104@gmail.com',
  //         contact: '6380055351',
  //         name: 'Suresh krishna',
  //       },
  //       theme: {color: '#F37254'},
  //     };
  //     RazorpayCheckout.open(options)
  //       .then(data => {
  //         alert(`Paid Successfully: ${data.razorpay_payment_id}`);
  //       })
  //       .catch(error => {
  //         // handle failure
  //         alert(`Paid Failure: ${error.code} | ${error.description}`);
  //       });
  //   };
  const onPressButton = () => {
    console.warn('button clicked', cartItems);
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
        keyExtractor={item => item.productId}
        renderItem={itemData => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId));
            }}
          />
        )}
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

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
import {postMethod2} from '../services/Apiservices';
//import RazorpayCheckout from 'react-native-razorpay';

const CartScreen = props => {
  const [id, setId] = useState();

  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const[jwt,setJwt]=useState('')
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
  const fetchData = () => {
    AsyncStorage.getItem('userId').then(async res => {
      //console.warn('res', res);
      setId(res);
    });
  };
  useEffect(() => {
    // AsyncStorage.getItem('userId')
    AsyncStorage.getItem('userToken').then(async res => {
       //console.warn('Token', res);
       setJwt(res);
 
     });

    fetchData();
    const willFocusSubscription = props.navigation.addListener('focus', () => {
      //console.warn('refreshed');
      fetchData();
    });
    return willFocusSubscription;
  }, []);
  const onPressButton = () => {
    //console.warn('button clicked', cartItems, id);
    if (!id) {
      props.navigation.navigate('Login');
    } else {
      //console.warn('foods', cartItems);
      if (cartItems.length === 0) {
        alert('Please add items to cart');
      } else {
        //console.warn('foods', cartItems.itemId);
        // const req = {
        //   itemId: cartItems.itemId,
        //   totalAmount: cartItems.sum,
        //   quantity: cartItems.quantity,

        //   itemAmount: cartItems.productPrice,
        // };

        const req= [];
    
      cartItems.map((cartI)=>{
       // console.log(cartI.itemId)
        req.push({
          itemId: cartI.itemId,
         
          quantity: cartI.quantity,
         
        });
      })
      
   
        console.warn('rrq', id,req);
        //console.warn('id', id);
        postMethod2('/orders/' + id+'/'+cartTotalAmount, req,jwt)
          .then(response => {
            if (response) {
              console.warn('order response', response);

              if (response.status == 200) {
                Alert.alert('Your foods ordered sucessfully');
                props.navigation.navigate('Shops');
                dispatch(cartActions.emptyCart());
              } else if (response.data.status == 500) {
                Alert.alert('Not able to signup, Please try later');
              }
              if (response.data.status == 404) {
                Alert.alert('User account already deactivated');
              }
            }
          })
          .catch(error => {
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

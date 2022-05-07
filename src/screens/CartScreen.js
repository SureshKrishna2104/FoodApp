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
  ScrollView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import ActivityLoading from '../components/ActivityLoading';
import CartItem from '../components/CartItem';
import * as cartActions from '../store/actions/cart';
import {postMethod2} from '../services/Apiservices';
import {isJwtExpired} from 'jwt-check-expiration';
import {useToast} from 'react-native-toast-notifications';

const CartScreen = props => {
  const [id, setId] = useState();
  const toast = useToast();
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const [jwt, setJwt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
      setId(res);
    });
  };
  useEffect(() => {
    // AsyncStorage.getItem('userId')
    AsyncStorage.getItem('userToken').then(async res => {
      if (!isJwtExpired(res)) {
        setJwt(res);
      }
    });

    fetchData();
    const willFocusSubscription = props.navigation.addListener('focus', () => {
      console.log('refreshed');
      AsyncStorage.getItem('userToken').then(async res => {
        if (!res) {
          console.log('ll');
          setJwt('');
        }
        if (!isJwtExpired(res)) {
          setJwt(res);
          console.log('call', res, jwt);
        }
      });
      fetchData();
    });
    return willFocusSubscription;
  }, []);
  const showtoast = (msg, type) => {
    toast.show(msg, {
      type: type,
      placement: 'top',
      duration: 2000,
      offset: 10,
      animationType: 'zoom-in ',
      normalColor: '#5F9B8C',
      warningColor: '#FAC846',
      //successColor: 'green',
      textStyle: {fontSize: 20},
    });
  };
  const onPressButton = () => {
    console.log("button PResee")
    if (jwt.length <= 0) {
      props.navigation.navigate('Login');
    } else {
      if (cartItems.length === 0) {
        // alert('Please add items to cart');
        showtoast('Please add items to cart', 'warning');
      } else {
        const z = [];
        cartItems.map(cartI => {
          z.push({
            itemId: cartI.itemId,
            quantity: cartI.quantity,
          });
        });
        const req = [{totAmt: cartTotalAmount, orderDtos: z}];
        setIsLoading(true);

        postMethod2('/orders/' + id, req, jwt)
          .then(response => {
            if (response) {
              if (response.status == 200) {
                setIsLoading(false);
                //Alert.alert('Your foods ordered sucessfully');
                showtoast('Your foods ordered sucessfully', 'success');

                props.navigation.navigate('Orders');
                dispatch(cartActions.emptyCart());
              } else if (response.status == 500) {
                setIsLoading(false);
                Alert.alert('Something went wrong, Please try again later');
              }
              if (response.status == 404) {
                setIsLoading(false);
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
        onRemoveAll={() => {
          dispatch(cartActions.removeFromTotalCart(itemData.item.itemId));
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
    <FlatList
      data={cartItems}
      keyExtractor={item => item.itemId}
      renderItem={renderGrid}
      ListHeaderComponent={
        cartItems.length === 0 ? (
          <>
            <Text
              style={{
                fontSize: 20,
                textAlign: 'center',
                // color: 'white',
                fontWeight: 'bold',
                marginTop: 0,
                marginTop: '50%',
              }}>
              No Foods in Cart
            </Text>
          </>
        ) : (
          <View style={styles.screen}>
            <View style={styles.summary}>
              <Text style={styles.summaryText}>
                Total:<Text>{cartTotalAmount.toFixed(2)}</Text>
              </Text>
              {isLoading ? <ActivityLoading size="large" /> : null}
              <View style={{flexDirection: 'column', marginTop: 10}}>
                <Button
                  color="red"
                  title="Proceed to Pay"
                  // onPress={onPressButton}

                  onPress={() =>
                    Alert.alert(
                      'Confirm Your Order',
                      'Orders once placed cannot be cancelled and are non-refundable',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => {
                            return null;
                          },
                        },
                        {
                          text: 'Confirm',
                          onPress:()=>{onPressButton()}
                          // onPress: () => {
                          //   onPressButton()
                          //   //  AsyncStorage.removeItem('userToken'),
                          //   //   AsyncStorage.removeItem('userId'),
                          //   //   getProfile();
                          // },
                        },
                      ],
                      {cancelable: false},
                    )
                  }
                />
                <View style={{flexDirection: 'row', padding: 2}}>
                  <View
                    style={{
                      height: 22,
                      width: 22,
                      borderRadius: 12,
                      borderWidth: 2,
                      borderColor: '#000',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 7,
                      marginRight: 3,
                    }}>
                    <View
                      style={{
                        height: 10,
                        width: 10,
                        borderRadius: 5,
                        backgroundColor: '#000',
                      }}
                    />
                  </View>
                  <Text style={{marginTop: 7}}>Cash On Delivery</Text>
                </View>
              </View>
            </View>
          </View>
        )
      }
      showsVerticalScrollIndicator={false}
    />
  );
};

CartScreen.navigationOptions = navData => {
  const myObj1 = useSelector(state => state.cart.items);
  var size = Object.keys(myObj1).length;

  return {
    headerTitle: (
      <Text
        style={{
          alignContent: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontSize: 17,
          letterSpacing: 1,
          textTransform: 'uppercase',
        }}>
        Cart
      </Text>
    ),
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: '#6FC3F7',
      shadowColor: '#fff',
      elevation: 0,
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerLeft: () => (
      <View style={{marginLeft: 5}}>
        <Image
          style={{
            height: 48,
            width: 70,
          }}
          source={require('../assets/images/icon-header.jpg')}
          //source={require('../assets/images/ic_launcher.png')}
          // source={{
          //   uri: 'https://icon-library.com/images/360-icon-png/360-icon-png-15.jpg',
          // }}
        />
      </View>
    ),
    headerRight: () => (
      <View>
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Cart"
            iconName="cart-outline"
            onPress={() => {
              navData.navigation.navigate('Cart');
            }}
          />
        </HeaderButtons>
        {size > 0 ? (
          <View
            style={{
              position: 'absolute',
              backgroundColor: 'red',
              width: 16,
              height: 16,
              borderRadius: 20 / 2,
              marginLeft: 20,
              top: -10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: 10,
                fontWeight: 'bold',
              }}>
              {size}
            </Text>
          </View>
        ) : null}
      </View>
    ),
  };
};
const styles = StyleSheet.create({
  screen: {
    margin: 10,
    backgroundColor: '#fff',
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 6,
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

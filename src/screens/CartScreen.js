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
        const z=[]
        cartItems.map((cartI)=>{
         z.push({
             "itemId":cartI.itemId,
             "quantity":cartI.quantity
         });
         })
        const req= [{"totAmt":cartTotalAmount ,
         "orderDtos":z
      }];
      //   const orderDots=[]
      // cartItems.map((cartI)=>{
      //  // console.log(cartI.itemId)
      // // req.push({
      // //     "oderDots":[
      // //     {"itemId":cartI.itemId,
      // //     "quantity":cartI.quantity}
      // //     ]
      // // });
      // })
      //req.push({"orderDots":orderDots})
      //console.log(req[0].totAmt,req[0].orderDots[0],req)
   
        //console.warn('rrq', id,req);
        //console.warn('id', id);
        postMethod2('/orders/' + id, req,jwt)
          .then(response => {
            if (response) {
              console.warn('order response', response);

              if (response.status == 200) {
                Alert.alert('Your foods ordered sucessfully');
                props.navigation.navigate('Shops');
                dispatch(cartActions.emptyCart());
              } else if (response.status == 500) {
                Alert.alert('Something went wrong, Please try again later');
              }
              if (response.status == 404) {
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
    <ScrollView style={{backgroundColor:'#fff'}}>
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
        showsVerticalScrollIndicator={false}
      />
    </View>
    </ScrollView>
  );
};


CartScreen.navigationOptions = navData => {
  const myObj1 = useSelector(state => state.cart.items);
  var size = Object.keys(myObj1).length;
 
   return {
     headerTitle:<Text style={{ alignContent:'center',justifyContent:"center", color: '#ffffff', fontSize : 17, letterSpacing : 1,   textTransform: 'uppercase'}}>Cart</Text>,
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
         {size> 0 ? (
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
    margin: 20,
    backgroundColor:'#fff'
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

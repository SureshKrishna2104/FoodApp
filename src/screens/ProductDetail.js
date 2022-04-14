import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import CartItem from '../components/CartItem';
import * as cartActions from '../store/actions/cart';
import {postMethod2} from '../services/Apiservices';
import Icon from 'react-native-vector-icons/Ionicons';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import ImageCarousel from '../components/ImageCarousel';
import Button from '../components/Button';
import ActivityLoading from '../components/ActivityLoading';
import {isJwtExpired} from 'jwt-check-expiration';

const ProductDetail = ({route, navigation}, props) => {
  const [id, setId] = useState();
  const [buttonStatus, setButtonStatus] = useState(false);
  const myObj1 = useSelector(state => state.cart.items);
  const [favStatus, setFavStatus] = useState('');
  const [isFav, setIsFav] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  var size = Object.keys(myObj1).length;
  const productId = route.params.itemId;
  const productImage = route.params.itemImage;
  const productPrice = route.params.itemAmount;
  const productName = route.params.itemName;
  const prodHotel = route.params.itemHotel;
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setParams({count: size});
  }, [myObj1]);

  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const [jwt, setJwt] = useState('');
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
  const result = cartItems.filter(id => id.itemId === productId);
 
  useEffect(() => {
    FvtData();
  }, []);

  useEffect(() => {
    FvtData();
  }, [favStatus]);

  const FvtData = () => {
    AsyncStorage.getItem('userToken').then(async resJwt => {
      if (!isJwtExpired(resJwt)) {
        setJwt(resJwt);
        AsyncStorage.getItem('userId').then(async res => {
          setId(res);
          fetch('https://food-order-ver-1.herokuapp.com/getFvtItem/' + res, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${resJwt}`,
            },
          })
            .then(response => response.json())
            .then(responseJson => {
              setIsFav(responseJson.data.some(e => e.itemId === productId));
            })
            .catch(error => {
              console.error(error);
            });
        });
      } else {
        setButtonStatus(true);
        AsyncStorage.removeItem('userToken');
      }
    });
  };

  const onAddToFvt = () => {
    const req = {
      itemId: productId,
      hotelId: prodHotel,
    };
    setIsLoading(true);
    AsyncStorage.getItem('userId').then(async res => {
      postMethod2('/updateFvtItem/' + res, req, jwt)
        .then(response => {
          if (response) {
            if (response.status == 200) {
              setIsLoading(false);
              setFavStatus(response.data);
              Alert.alert(response.data);
            } else if (response.status == 500) {
              setIsLoading(false);
              Alert.alert('Something went wrong');
            }
            if (response.statuscode == 404) {
              setIsLoading(false);
              Alert.alert('Please Login to add Items');
            }
          }
        })
        .catch(error => {
          setIsLoading(false);

          Alert.alert(
            'No Internet connection.\n Please check your internet connection \nor try again',
            error,
          );
          console.warn(
            'No Internet connection.\n Please check your internet connection \nor try again',
            error,
          );
        });
    });
  };

  const images = [productImage];
  const renderGrid = itemData => {
    return (
      <View style={styles.cartItem}>
        <View style={styles.itemData}>
          <TouchableOpacity
            onPress={() =>
              dispatch(cartActions.removeFromCart(itemData.item.itemId))
            }
            style={styles.deleteButton}>
            <Icon name="ios-remove-sharp" size={23} color="red" />
          </TouchableOpacity>
          <Text style={styles.quantity}>{itemData.item.quantity}</Text>
          <TouchableOpacity
            onPress={() =>
              dispatch(
                cartActions.addToCart(
                  itemData.item.itemId,
                  itemData.item.productPrice,
                  itemData.item.productTitle,
                ),
              )
            }
            style={styles.deleteButton}>
            <Icon name="ios-add" size={23} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <FlatList
      data={result}
      keyExtractor={item => item.itemId}
      renderItem={renderGrid}
      ListHeaderComponent={
        <View style={styles.root}>
          <Text style={styles.title}>{productName}</Text>
          <ImageCarousel images={images} />
          <Text style={styles.price}> From Rs.{productPrice}</Text>
          <Text style={styles.description}>
            <Text style={styles.title}>
              {productName}
              {'   '}
            </Text>
            substance consisting essentially of protein, carbohydrate, fat, and
            other nutrients used in the body of an organism to sustain growth
            and vital processes and to furnish energy. The absorption and
            utilization of food by the body is fundamental to nutrition and is
            facilitated by digestion.
          </Text>
        </View>
      }
      ListFooterComponent={
        <View style={styles.root}>
          <Button
            text="Add to Cart"
            onPress={() => {
              alert('Item added to cart successfully');
              dispatch(
                cartActions.addToCart(productId, productPrice, productName),
              );
            }}
          />

          {isLoading ? <ActivityLoading size="large" /> : null}
          {isFav ? (
            <Button
              text="Remove From Favourites"
              onPress={() => onAddToFvt()}
            />
          ) : (
            <Button text="Add to Favourites" onPress={() => onAddToFvt()} />
          )}
        </View>
      }
      showsVerticalScrollIndicator={false}
    />
  );
};

ProductDetail.navigationOptions = ({route, navigation}, navData) => {
  var size = route.params.count;
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
        Food Detail
      </Text>
    ),
    headerTitleAlign: 'center',
    headerRight: () => (
      <View>
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Cart"
            iconName="cart-outline"
            onPress={() => {
              navigation.navigate('Cart');
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
  root: {
    padding: 10,
    backgroundColor: 'white',
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 18,
    color: '#e47911',
  },
  description: {
    marginVertical: 10,
    lineHeight: 20,
  },
  image: {
    width: '100%',
    height: 300,
    marginTop: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  oldprice: {
    fontSize: 14,
    fontWeight: 'normal',
    textDecorationLine: 'line-through',
  },
  actions: {
    marginVertical: 10,
    // alignItems: 'center',
    marginRight: '2%',
    flexDirection: 'row',
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'open-sans-bold',
  },
  // description: {
  //   fontFamily: 'open-sans',
  //   fontSize: 14,
  //   textAlign: 'center',
  //   marginHorizontal: 20,
  // },
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
  cartItem: {
    // padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    //marginHorizontal: '30%',
    //marginLeft: '10%',
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  quantity: {
    fontFamily: 'open-sans',
    color: '#888',
    fontSize: 16,
    justifyContent: 'center',
    alignContent: 'center',
  },
  mainText: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  deleteButton: {
    //marginLeft: 20,
    padding: 8,
  },
  deleteButton1: {
    marginRight: '15%',
    //padding: 8,
  },
});

export default ProductDetail;

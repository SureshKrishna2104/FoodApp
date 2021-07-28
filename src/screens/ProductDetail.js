import React from 'react';
import {ScrollView, View, Text, Image, Button, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

// import Colors from '../../constatnts/Colors';
import * as cartActions from '../store/actions/cart';

const ProductDetail = ({route}, props) => {
  const productId = route.params.itemId;
  //props.navigation.getParam('itemId');
  const productImage = route.params.itemImage;
  //props.navigation.getParam('itemImage');
  const productPrice = route.params.itemAmount;
  //props.navigation.getParam('itemAmount');
  const productName = route.params.itemName;
  //props.navigation.getParam('itemName');
  // const selectedProduct = useSelector(state =>
  //   state.products.availableProducts.find(prod => prod.id === productId),
  // );
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image style={styles.image} source={{uri: productImage}} />
      <View style={styles.actions}>
        <Button
          color="red"
          title="Add to Cart"
          onPress={() => {
            alert('item added to cart successfully');
            dispatch(
              cartActions.addToCart(productId, productPrice, productName),
            );
          }}
        />
      </View>
      <Text style={styles.price}>${productPrice}</Text>
      <Text style={styles.description}>{productName}</Text>
    </ScrollView>
  );
};

// ProductDetail.navigationOptions = navData => {
//   return {
//     headerTitle: navData.navigation.getParam('itemName'),
//   };
// };

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'open-sans-bold',
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

export default ProductDetail;

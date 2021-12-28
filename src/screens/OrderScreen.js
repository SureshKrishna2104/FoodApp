import React, {useEffect} from 'react';
import {Text, View, FlatList} from 'react-native';
import OrderGrid from '../components/OrderGrid';
import MealItem from '../components/MealItem';
import AsyncStorage from '@react-native-community/async-storage';
const OrderScreen = props => {
  const order = props.route.params.order;
  const [data, setData] = React.useState();
  const fetchData = () => {
    AsyncStorage.getItem('userId').then(async res => {
      const id = await res;
      //console.warn('res', res);
      //setId(res);
      //console.warn('orders', order);
      //setData(order);
      // setId(res);

      fetch('http://3.133.49.92:9090/getOrders/' + id, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(responseData => {
          setData(responseData.data);
         // console.warn('out of Orders', responseData.data);
        })
        .catch(err => {
          console.error(err);
        });
    });
  };
  useEffect(() => {
    fetchData();
    const willFocusSubscription = props.navigation.addListener('focus', () => {
      //console.warn('refreshed');
      fetchData();
    });

    return willFocusSubscription;
  }, []);
  const renderGrid = itemdata => {
    return (
      <OrderGrid
        image={itemdata.item.image_url}
        title={itemdata.item.hotelName}
        //title="Suresh"
        quantity={itemdata.item.quantity}
        totalAmount={itemdata.item.totalAmount}
        name={itemdata.item.itemName}
        amount={itemdata.item.itemAmount}
        // onSelectMeal={() => {
        //   props.navigation.navigate('ProductDetail', {
        //     itemId: itemdata.item.itemId,
        //     itemAmount: itemdata.item.amount,
        //     itemName: itemdata.item.itemName,
        //     itemImage: itemdata.item.image_url,
        //   });
        // }}
      />
    );
  };
  return (
    <View>
      <FlatList data={data} inverted={true} renderItem={renderGrid} />
    </View>
  );
};
OrderScreen.navigationOptions = navigationData => {
  //const hotelName = navigationData.navigation.getParam('hotelName');
  return {
    headerTitle: "Today's totalAmount!",
  };
};

export default OrderScreen;

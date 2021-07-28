import React, {useEffect} from 'react';
import {Text, View, FlatList} from 'react-native';
import ShopGrid from '../components/ShopGrid';
import MealItem from '../components/MealItem';

const ProductList = props => {
  const hotelId = props.route.params.hotelId;
  //props.navigation.getParam('hotelId');
  const hotelName = props.route.params.hotelName;
  //props.navigation.getParam('hotelName');
  // const hotelImage = props.navigation.getParam('hotelImage');
  // const hotelItems = props.navigation.getParam('hotelItems');
  // const newsCat = props.navigation.getParam('newsCat');
  // const newsUrl = props.navigation.getParam('newsUrl');
  const [data, setData] = React.useState();
  useEffect(() => {
    fetch('http://35.224.0.195:9090/getHotel/' + hotelId, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseData => {
        setData(responseData.data.items);
        console.warn('out of id', responseData.data.items);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);
  const renderGrid = itemdata => {
    return (
      <MealItem
        image={itemdata.item.image_url}
        title={itemdata.item.itemName}
        description={itemdata.item.description}
        hotelName={hotelName}
        amount={itemdata.item.amount}
        onSelectMeal={() => {
          props.navigation.navigate('ProductDetail', {
            itemId: itemdata.item.itemId,
            itemAmount: itemdata.item.amount,
            itemName: itemdata.item.itemName,
            itemImage: itemdata.item.image_url,
          });
        }}
      />
    );
  };
  return (
    <View>
      <FlatList data={data} renderItem={renderGrid} />
    </View>
  );
};
ProductList.navigationOptions = navigationData => {
  const hotelName = navigationData.navigation.getParam('hotelName');
  return {
    headerTitle: hotelName.toUpperCase() + " food's",
  };
};

export default ProductList;

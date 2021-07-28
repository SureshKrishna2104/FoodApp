import React, {useEffect} from 'react';
import {Text, View, FlatList} from 'react-native';
import OfferGrid from '../components/OfferGrid';
import MealItem from '../components/MealItem';

const OfferScreen = props => {
  //   const hotelId = props.navigation.getParam('hotelId');
  //   const hotelName = props.navigation.getParam('hotelName');
  //   const hotelImage = props.navigation.getParam('hotelImage');
  //   const hotelItems = props.navigation.getParam('hotelItems');
  // const newsCat = props.navigation.getParam('newsCat');
  // const newsUrl = props.navigation.getParam('newsUrl');
  const [data, setData] = React.useState();
  useEffect(() => {
    fetch('http://35.224.0.195:9090/getOffers', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseData => {
        setData(responseData.data);
        console.warn('out of id', responseData);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);
  const renderGrid = itemdata => {
    return (
      <OfferGrid
        image={itemdata.item.image_url}
        title={itemdata.item.itemName}
        description={itemdata.item.description}
        offer={itemdata.item.offer}
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
OfferScreen.navigationOptions = navigationData => {
  //const hotelName = navigationData.navigation.getParam('hotelName');
  return {
    headerTitle: "Today's Offer!",
  };
};

export default OfferScreen;

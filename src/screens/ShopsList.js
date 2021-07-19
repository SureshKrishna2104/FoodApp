import React, {useEffect} from 'react';
import {Text, View, FlatList} from 'react-native';
import ShopGrid from '../components/ShopGrid';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
const ShopsList = props => {
  const [data, setData] = React.useState();

  useEffect(() => {
    fetch('http://35.224.0.195:9090/getAllHotel', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseData => {
        setData(responseData.data);
        console.warn('out of ', responseData.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);
  const renderGrid = itemdata => {
    return (
      <ShopGrid
        image={itemdata.item.image_url}
        title={itemdata.item.hotelName}
        description={itemdata.item.description}
        onSelectNews={() => {
          props.navigation.navigate({
            routeName: 'Products',
            params: {
              hotelId: itemdata.item.hotelId,
              hotelName: itemdata.item.hotelName,
              hotelImage: itemdata.item.image_url,
              hotelItems: itemdata.item.items,
            },
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
ShopsList.navigationOptions = navData => {
  return {
    headerTitle: 'Hotels',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName="cart"
          onPress={() => {
            navData.navigation.navigate('Cart');
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default ShopsList;

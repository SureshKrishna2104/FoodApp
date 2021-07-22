import React, {useEffect} from 'react';
import {Text, View, FlatList} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ShopGrid from '../components/ShopGrid';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
const ShopsList = props => {
  const [data, setData] = React.useState();
  const [count, setCount] = React.useState('');
  const fetchData = () => {
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
  };
  useEffect(() => {
    fetchData();
    const willFocusSubscription = props.navigation.addListener('focus', () => {
      fetchData();
    });
    AsyncStorage.getItem('count').then(async res => {
      console.warn('res', res);
      setCount(res);

      // setId(res);
    });
    props.navigation.setParams({c: count});

    return willFocusSubscription;
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
  const item = navData.navigation.getParam('c');
  console.warn('i', item);
  return {
    headerTitle: 'Hotels',
    headerRight: (
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
        {item > 0 ? (
          <View
            style={{
              position: 'absolute',
              backgroundColor: 'red',
              width: 16,
              height: 16,
              borderRadius: 20 / 2,
              right: 6,
              top: -13,
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
              {item}
            </Text>
          </View>
        ) : null}
      </View>
    ),
  };
};

export default ShopsList;

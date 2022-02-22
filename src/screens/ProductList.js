import React, {useEffect} from 'react';
import {Text, View, FlatList, Image, ScrollView} from 'react-native';
import ShopGrid from '../components/ShopGrid';
import MealItem from '../components/MealItem';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector, useDispatch} from 'react-redux';
import HeaderButton from '../components/HeaderButton';
import ActivityLoading from '../components/ActivityLoading';
const ProductList = ({route, navigation}, props) => {
  const hotelId = route.params.hotelId;
  const myObj1 = useSelector(state => state.cart.items);
  var size = Object.keys(myObj1).length;

  useEffect(() => {
    navigation.setParams({count: size});
  }, [myObj1]);
  //props.navigation.getParam('hotelId');
  const hotelName = route.params.hotelName;
  const [isLoading, setIsLoading] = React.useState(true);
  //props.navigation.getParam('hotelName');
  // const hotelImage = props.navigation.getParam('hotelImage');
  // const hotelItems = props.navigation.getParam('hotelItems');
  // const newsCat = props.navigation.getParam('newsCat');
  // const newsUrl = props.navigation.getParam('newsUrl');
  const [data, setData] = React.useState([]);
  useEffect(() => {
    fetch('http://3.133.49.92:9090/getHotel/' + hotelId, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseData => {
        
        setData(responseData.data.items);
        setIsLoading(false); // console.warn('out of id', responseData.data.items);
      })
      .catch(err => {
        console.error(err,"error");
        setIsLoading(false);
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
          navigation.navigate('ProductDetail', {
            itemId: itemdata.item.itemId,
            itemAmount: itemdata.item.amount,
            itemName: itemdata.item.itemName,
            itemImage: itemdata.item.image_url,
            length: size,
          });
        }}
      />
    );
  };
  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View>
        <FlatList data={data} renderItem={renderGrid}  showsVerticalScrollIndicator={false}/>
        {isLoading ? (
          <View style={{marginTop: '50%'}}>
            <ActivityLoading size="large" />
          </View>
        ) : null}
        {data?.length === 0 ? (
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
              No Food Found
            </Text>
          </>
        ) : null}
      </View>
    </ScrollView>
  );
};
ProductList.navigationOptions = ({route, navigation}, navData) => {
  var size = route.params.count;
  //console.log(route,size,navData)
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
        Foods
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

export default ProductList;

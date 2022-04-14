import React, {useEffect} from 'react';
import {Text, View, FlatList, Image, ScrollView,Alert} from 'react-native';
import OfferGrid from '../components/OfferGrid';
import MealItem from '../components/MealItem';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector, useDispatch} from 'react-redux';
import HeaderButton from '../components/HeaderButton';
import ActivityLoading from '../components/ActivityLoading';
const OfferScreen = props => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const fetchData = () => {
    fetch('https://food-order-ver-1.herokuapp.com/getOffers', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseData => {
        setData(responseData.data);
        setIsLoading(false);
        console.warn('out of offer', responseData);
        // if(responseData.status=500){
        //   Alert.alert('Something went wrong, Please try again later');
        // }
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    const willFocusSubscription = props.navigation.addListener('focus', () => {
      //console.warn('refreshed');
      setIsLoading(true);
      fetchData();
    });
    return willFocusSubscription;
  }, []);
  const renderGrid = itemdata => {
    return (
      <OfferGrid
        image={itemdata.item.image_url}
        title={itemdata.item.itemName}
        description={itemdata.item.description}
        offer={itemdata.item.offer}
        amount={itemdata.item.amount}
        name={itemdata.item.hotelName}
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
    <FlatList
      data={data}
      renderItem={renderGrid}
      ListFooterComponent={
        <>
          {isLoading ? (
            <View style={{marginTop: '50%'}}>
              <ActivityLoading size="large" />
            </View>
          ) : null}

          {data?.length === 0 && !isLoading  ? (
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
                No Offer Found
              </Text>
            </>
          ) : null}
        </>
      }
      showsVerticalScrollIndicator={false}
    />
  );
};

OfferScreen.navigationOptions = navData => {
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
        Offers
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

export default OfferScreen;

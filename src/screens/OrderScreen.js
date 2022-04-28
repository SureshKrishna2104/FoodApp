import React, {useEffect} from 'react';
import {Text, View, FlatList} from 'react-native';
import OrderGrid from '../components/OrderGrid';
import OrderItems from '../components/OrderItems';
import MealItem from '../components/MealItem';
import AsyncStorage from '@react-native-community/async-storage';
import {isJwtExpired} from 'jwt-check-expiration';
const OrderScreen = props => {
//const order = props.route.params.order;
  const [data, setData] = React.useState([]);
  const [orgdata, setOrgData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  useEffect(() => {
    fetchData();
    const willFocusSubscription = props.navigation.addListener('focus', () => {
      //console.warn('refreshed');
      fetchData();
    });

     return willFocusSubscription;
  }, []);
  const fetchData = () => {
    AsyncStorage.getItem('userToken').then(async resJwt => {
     
      if (!isJwtExpired(resJwt)) {
        AsyncStorage.getItem('userId').then(async res => {
          console.log(res)
          setIsLoading(true);
          fetch('https://food-order-ver-1.herokuapp.com/getOrders/' + res, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${resJwt}`,
            },
          })
            .then(response => response.json())
            .then(responseJson => {
              makeData(responseJson.data);
              console.log(responseJson)
              setIsLoading(false);
            
            })
            .catch(error => {
              setIsLoading(false);
              console.error(error);
            });
        });
      } else {
        AsyncStorage.removeItem('userToken');
        props.navigation.navigate('Profile');
      }
    });
  };

  const makeData = data => {
    if (data) {
      let obj = data.map(e => {
        return {
          id: e[0],
          status: e[4],
          totalAmount: e[5],
          orderDate: e[6],
          hotelName: e[7],
          hotelImage: e[8],
          itemAmount: e[9],
          itemName: e[10],
          itemQuantity: e[11],
        };
      });
     setOrgData(obj);
      let newArray = [];
      let uniqueObject = {};
      for (let i in obj) {
        let objTitle = obj[i]['id'];
        uniqueObject[objTitle] = obj[i];
      }
      Object.keys(uniqueObject).forEach(e => newArray.push(uniqueObject[e]));
      setData(newArray);
    }
  };
 
  const renderGrid = itemdata => {
    
    return (
      <OrderItems
        title={itemdata.item.hotelName}
        totalAmount={itemdata.item.totalAmount}
        orderDate={itemdata.item.orderDate}
       
        status={itemdata.item.status}
        onSelectMeal={() => {
          props.navigation.navigate('BillDetail', {
            itemId: itemdata.item.id,
            data: orgdata,
            status: itemdata.item.status,
            totalAmount:itemdata.item.totalAmount
          });
        }}
      />
    );
  };

  return (
    <View>
      {data?.length === 0 && !isLoading ? (
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
            No Order Found
          </Text>
        </>
      ) : (
        <FlatList
          data={data}
          inverted={true}
          renderItem={renderGrid}
          showsVerticalScrollIndicator={false}
        />
      )}
    
    </View>
  );
};
OrderScreen.navigationOptions = navigationData => {

  return {
    headerTitle: "Today's totalAmount!",
  };
};

export default OrderScreen;

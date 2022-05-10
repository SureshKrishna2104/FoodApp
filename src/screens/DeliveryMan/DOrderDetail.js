import React, {useEffect} from 'react';
import {Text, View, FlatList} from 'react-native';
import OrderItems from '../../components/OrderItems';

import AsyncStorage from '@react-native-community/async-storage';
import {isJwtExpired} from 'jwt-check-expiration';
import RNRestart from 'react-native-restart';
import ActivityLoading from '../../components/ActivityLoading';
const DOrderDetail = props => {
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
  const sortByDate = arr => {
    const sorter = (a, b) => {
      return new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime();
    };
    setData(arr.sort(sorter));
  };
  const fetchData = () => {
    AsyncStorage.getItem('userToken').then(async resJwt => {
      if (!isJwtExpired(resJwt)) {
        AsyncStorage.getItem('userId').then(async res => {
          setIsLoading(true);
          fetch(
            'https://food-order-ver-1.herokuapp.com/deliveryUpdate/'+res,
            {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${resJwt}`,
              },
            },
          )
            .then(response => response.json())
            .then(responseJson => {
              makeData(responseJson.data);

              setIsLoading(false);
            })
            .catch(error => {
              setIsLoading(false);
              console.error(error);
            });
        });
      } else {
        AsyncStorage.removeItem('userToken');
        AsyncStorage.removeItem('userId');
        AsyncStorage.removeItem('role');
        RNRestart.Restart();
       // DevSettings.reload();
       // props.navigation.navigate('Profile');
      }
    });
  };

  const makeData = data => {
    if (data) {
      let obj = data.map(e => {
        return {
          id: e[0],
          status: e[1],
          totalAmount: e[5],
          orderDate: e[7],
          hotelName: e[2],
          // hotelImage: e[8],
          itemName: e[3],
          itemQuantity: e[4],
          itemAmount: e[6],
          address:e[9],
          phoneNumber:e[10],
          city:e[11],
          pincode:e[12]
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
      // setData(newArray);
      sortByDate(newArray);
    }
  };
  //console.log(data,"data");

  const renderGrid = itemdata => {
    return (
      <OrderItems
        title={itemdata.item.hotelName}
        totalAmount={itemdata.item.totalAmount}
        orderDate={itemdata.item.orderDate}
        status={itemdata.item.status}
        phoneNumber={itemdata.item.phoneNumber}
        onSelectMeal={() => {
          props.navigation.navigate('FoodDetail', {
            itemId: itemdata.item.id,
            data: orgdata,
            status: itemdata.item.status,
            totalAmount: itemdata.item.totalAmount,
            address:itemdata.item.address,
            city:itemdata.item.city,
            pincode:itemdata.item.pincode,
            phoneNumber:itemdata.item.phoneNumber,
            hotelName:itemdata.item.hotelName
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
      ) : isLoading ? (
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            marginVertical:'50%'
          }}>
          <ActivityLoading size="large" />
        </View>
      ) : (
        <FlatList
          data={data}
          // inverted={true}
          renderItem={renderGrid}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default DOrderDetail;

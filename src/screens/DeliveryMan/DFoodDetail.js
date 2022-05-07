import {
  View,
  Text,
  FlatList,
  Alert,
  TouchableOpacity,
  DevSettings,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ProgressBar, Colors} from 'react-native-paper';
import Icons from 'react-native-vector-icons/FontAwesome5';
import ActivityLoading from '../../components/ActivityLoading';
import {postMethod2} from '../../services/Apiservices';
import AsyncStorage from '@react-native-community/async-storage';
import {isJwtExpired} from 'jwt-check-expiration';
const DFoodDetail = props => {
  const data = props.route.params.data;
  const id = props.route.params.itemId;
  const status = props.route.params.status;
  const totalAmount = props.route.params.totalAmount;
  const address = props.route.params.address;
  const city = props.route.params.city;
  const pincode = props.route.params.pincode;
  const [billdata, setBillData] = useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  console.log(status, 'df');
  useEffect(() => {
    const fdata = data.filter(e => e.id == id);
    setBillData(fdata);
  }, [props]);

  const takeOrder = () => {
    const req = {
      status: status === '1' ? '2' : '3',
    };
    setIsLoading(true);
    AsyncStorage.getItem('userToken').then(async resJwt => {
      if (!isJwtExpired(resJwt)) {
        AsyncStorage.getItem('userId')
          .then(async res => {
            if (res) {
              postMethod2('/deliveryUpdate/' + res + '/' + id, req, resJwt)
                .then(response => {
                  if (response) {
                    console.log('response', response);
                    setIsLoading(false);
                    props.navigation.navigate('FirstPage')
                    // if (response.status == 200) {
                    //   setIsLoading(false);
                    //   setFavStatus(response.data);
                    //   showtoast(response.data)
                    //   //Alert.alert(response.data);
                    // } else if (response.status == 500) {
                    //   setIsLoading(false);
                    //   Alert.alert('Something went wrong');
                    // }
                    // if (response.statuscode == 404) {
                    //   setIsLoading(false);
                    //   Alert.alert('Please Login to add Items');
                    // }
                  }
                })
                .catch(error => {
                  setIsLoading(false);

                  Alert.alert(
                    'No Internet connection.\n Please check your internet connection \nor try again',
                    error,
                  );
                  console.warn(
                    'No Internet connection.\n Please check your internet connection \nor try again',
                    error,
                  );
                });
            } else {
              setIsLoading(false);
              navigation.navigate('Login');
              Alert.alert('Please Login to add Favourites');
            }
          })
          .catch(err => {
            console.log(err, 'err');
          });
      } else {
        AsyncStorage.removeItem('userToken');
        AsyncStorage.removeItem('userId');
        AsyncStorage.removeItem('role');
        DevSettings.reload();
      }
    });
  };
  const renderGrid = itemdata => {
    return (
      <View style={{justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: 16,
              color: 'black',
              //fontWeight: 'bold',

              marginTop: 5,
              marginLeft: '5%',
            }}>
            {itemdata.item?.itemName?.toUpperCase()} x{' '}
            {itemdata.item.itemQuantity}
          </Text>

          <Text
            style={{
              fontSize: 17,
              color: 'black',
              //fontWeight: 'bold',
              marginTop: 5,
              marginRight: '15%',
            }}>
            Rs.{itemdata.item.itemAmount * itemdata.item.itemQuantity}
          </Text>
        </View>
        <View
          style={{
            borderStyle: 'dashed',
            borderWidth: 0.5,
            borderRadius: 1,
            width: '80%',
            marginLeft: '5%',
            marginTop: '1%',
          }}></View>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={billdata}
        keyExtractor={item => item.itemName}
        renderItem={renderGrid}
        ListHeaderComponent={
          <View style={{margin: 2, flexDirection: 'column'}}>
            <Text
              style={{
                fontSize: 17,
                color: 'black',
                fontWeight: 'bold',
                //marginBottom: 10,
                marginTop: 5,
                marginLeft: '5%',
              }}>
              <Icons name="shipping-fast" size={20} color="#88898a" />{' '}
              {status === '1'
                ? 'Order Taken'
                : status === '2'
                ? 'On its Way'
                : status === '3'
                ? 'Deleivered'
                : status === '4'
                ? 'Cancelled'
                : 'Ordered'}
            </Text>
            <ProgressBar
              progress={
                status === '1'
                  ? 0.3
                  : status === '2'
                  ? 0.5
                  : status === '3'
                  ? 1
                  : status === '4'
                  ? 1
                  : 0.2
              }
              style={{
                height: 10,
                width: '90%',
                marginLeft: 20,
                borderRadius: 5,
                backgroundColor: 'grey',
              }}
              color={
                status === '1'
                  ? 'red'
                  : status === '2'
                  ? 'yellow'
                  : status === '3'
                  ? 'green'
                  : status === '4'
                  ? 'red'
                  : 'red'
              }
            />
            <Text
              style={{
                fontSize: 17,
                color: 'black',
                fontWeight: 'bold',
                marginTop: 10,
                marginLeft: '5%',
              }}>
              Bill Detail
            </Text>
          </View>
        }
        ListFooterComponent={
          <>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  fontSize: 17,
                  color: 'black',
                  fontWeight: 'bold',

                  marginTop: 5,
                  marginLeft: '5%',
                }}>
                TotalAmount
              </Text>

              <Text
                style={{
                  fontSize: 17,
                  color: 'black',
                  fontWeight: 'bold',
                  marginTop: 5,
                  marginRight: '15%',
                }}>
                Rs.{totalAmount}
              </Text>
            </View>
            <View style={{marginLeft: 4, marginVertical: '10%'}}>
              <Text
                style={{
                  fontSize: 17,
                  color: 'black',
                  fontWeight: 'bold',

                  marginTop: 5,
                  marginLeft: '5%',
                }}>
                DELIVERY ADDRESS
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  color: 'black',

                  marginTop: 5,
                  //marginRight: '15%',
                  marginLeft: '5%',
                }}>
                Address- {address}
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  color: 'black',

                  marginTop: 5,
                  //marginRight: '15%',
                  marginLeft: '5%',
                }}>
                {city}-{pincode}
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              {isLoading ? <ActivityLoading size="large" /> : null}
              {status === '0' ? (
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      'Confirm Your Order',
                      'Are you confirm to take this order',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => {
                            return null;
                          },
                        },
                        {
                          text: 'Confirm',
                          onPress: () => {
                            takeOrder();
                          },
                          // onPress: () => {
                          //   onPressButton()
                          //   //  AsyncStorage.removeItem('userToken'),
                          //   //   AsyncStorage.removeItem('userId'),
                          //   //   getProfile();
                          // },
                        },
                      ],
                      {cancelable: false},
                    )
                  }
                  style={{
                    height: 50,
                    width: '50%',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'red',

                    borderWidth: 1,
                    borderRadius: 5,
                  }}>
                  <Text style={{color: '#fff', fontSize: 20}}>Take Order</Text>
                </TouchableOpacity>
              ) : status === '1' || status === '2'  ?(
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      'Confirm Your Order Delivered',
                      'Are you sure  Order is Delivered',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => {
                            return null;
                          },
                        },
                        {
                          text: 'Confirm',
                          onPress: () => {
                            takeOrder();
                          },
                          // onPress: () => {
                          //   onPressButton()
                          //   //  AsyncStorage.removeItem('userToken'),
                          //   //   AsyncStorage.removeItem('userId'),
                          //   //   getProfile();
                          // },
                        },
                      ],
                      {cancelable: false},
                    )
                  }
                  style={{
                    height: 50,
                    width: '50%',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'red',

                    borderWidth: 1,
                    borderRadius: 5,
                  }}>
                  <Text style={{color: '#fff', fontSize: 20}}>
                    Order Delivered
                  </Text>
                </TouchableOpacity>
              ):null}
            </View>
          </>
        }
      />
    </View>
  );
};

export default DFoodDetail;

// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const DFoodDetail = (props,route) => {
//   console.log(props.route.params.data,"ddd");
//   return (
//     <View>
//       <Text>DFoodDetail</Text>
//     </View>
//   )
// }

// export default DFoodDetail

// const styles = StyleSheet.create({})

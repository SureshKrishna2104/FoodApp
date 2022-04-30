import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ProgressBar, Colors} from 'react-native-paper';
import Icons from 'react-native-vector-icons/FontAwesome5';
const BillDetail = props => {
  const data = props.route.params.data;
  const id = props.route.params.itemId;
  const status = props.route.params.status;
  const totalAmount = props.route.params.totalAmount;
  const [billdata, setBillData] = useState([]);

  useEffect(() => {
    const fdata = data.filter(e => e.id == id);
    setBillData(fdata);
  }, [props]);
  const renderGrid = itemdata => {
    return (
      <View style={{justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: 15,
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
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
        }
      />
    </View>
  );
};

export default BillDetail;

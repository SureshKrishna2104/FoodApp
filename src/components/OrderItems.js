import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/FontAwesome5';
const OrderItems = props => {
  return (
    <View style={styles.mealItem}>
      <TouchableOpacity onPress={props.onSelectMeal}>
        <View style={{...styles.mealRow, ...styles.mealDetail}}>
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{
                fontSize: 15,
                color: 'white',
                fontWeight: 'bold',
                //marginBottom: 10,
                marginTop: 5,
              }}>
              <Icon name="calendar-outline" size={23} color="#88898a" />{' '}
              {props.orderDate.slice(0, 10)}
            </Text>
            <Text
              style={{
                fontSize: 17,
                color: 'white',
                fontWeight: 'bold',
                //marginBottom: 10,
                marginTop: 5,
                marginRight: 5,
              }}>
              <Icons name="rupee-sign" size={20} color="#88898a" />{' '}
              {props.totalAmount}
            </Text>
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{
                fontSize: 17,
                color: 'white',
                fontWeight: 'bold',
                //marginBottom: 10,
                marginTop: 5,
                marginRight: '5%',
              }}>
              <Icons name="shipping-fast" size={20} color="#88898a" />{' '}
              {props.status === '1'
                ? 'Order Taken'
                : props.status === '2'
                ? 'On its Way'
                : props.status === '3'
                ? 'Deleivered'
                : props.status === '4'
                ? 'Cancelled'
                : 'Ordered'}
            </Text>
            {props.phoneNumber ? (
              <Text
                style={{
                  fontSize: 17,
                  color: 'white',
                  fontWeight: 'bold',
                  //marginBottom: 10,
                  marginTop: 5,
                  marginRight: 5,
                }}>
                <Icons name="phone" size={20} color="#88898a" />{' '}
                {props.phoneNumber}
              </Text>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mealItem: {
    marginTop: 5,
    height: 100,
    width: '95%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  bgImage: {
    width: '100%',
    height: '100%',
  },
  mealRow: {
    flexDirection: 'row',
  },
  mealHeader: {
    height: '85%',
  },
  mealDetail: {
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    // backgroundColor: 'rgba(0,82,75,21)',
    backgroundColor: '#6FC3F7',
  },
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
    paddingHorizontal: 12,
    fontWeight: 'bold',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
});

export default OrderItems;

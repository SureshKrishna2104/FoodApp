import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

const OrderGrid = props => {
  return (
    <View style={styles.mealItem}>
      <TouchableOpacity>
        <View>
          <View style={{...styles.mealRow, ...styles.mealHeader}}>
            <ImageBackground source={{uri: props.image}} style={styles.bgImage}>
              <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  Hotel {props.title}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={{...styles.mealRow, ...styles.mealDetail}}>
            {/* <Text
              style={{
                fontSize: 15,
                color: 'white',
                fontWeight: 'bold',
                //marginBottom: 10,
                marginTop: 5,
              }}>
              Hotel {props.hotelName.toUpperCase()}
            </Text> */}
            <Text
              style={{
                fontSize: 15,
                color: 'white',
                fontWeight: 'bold',
                //marginBottom: 10,
                marginTop: 5,
              }}>
              Dish {props.name}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: 'white',
                fontWeight: 'bold',
                //marginBottom: 10,
                marginTop: 5,
              }}>
              Rs.{props.amount}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: 'white',
                fontWeight: 'bold',
                //marginBottom: 10,
                marginTop: 5,
              }}>
              Quantity-{props.quantity}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mealItem: {
    marginTop: 5,
    height: 250,
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
    justifyContent: 'flex-end',
  },
  mealRow: {
    flexDirection: 'row',
  },
  mealHeader: {
    height: '85%',
  },
  mealDetail: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '15%',
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

export default OrderGrid;

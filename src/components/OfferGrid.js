import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Fontisto';
const OfferGrid = props => {
  if (props.title === '') {
    return (
      <View>
        <Text>No foods found</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.mealItem}>
        <TouchableOpacity onPress={props.onSelectMeal}>
          <View>
            <View style={{...styles.mealRow, ...styles.mealHeader}}>
              <ImageBackground
                source={{uri: props.image}}
                style={styles.bgImage}>
                <View style={{}} />
                <View style={styles.titleContainer}>
                  <Text style={styles.title} numberOfLines={1}>
                    <Icons name="rupee-sign" size={20} color="#fff" />{' '}
                    {props.offer} Offer
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
                <Icon name="restaurant-outline" size={23} color="#88898a" />{' '}
                {props.name.toUpperCase()}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: 'white',
                  fontWeight: 'bold',
                  //marginBottom: 10,
                  marginTop: 5,
                }}>
                <Icon name="md-fast-food" size={23} color="#88898a" />{' '}
                {props.title.toUpperCase()}
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                <Text
                  style={{
                    fontSize: 20,
                    color: 'white',
                    fontWeight: 'bold',
                    //marginBottom: 10,
                    marginTop: 5,

                    padding: 2,
                  }}>
                  <Icons name="rupee-sign" size={20} color="#88898a" />{' '}
                  {props.amount}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: 'black',
                    fontWeight: 'bold',
                    //marginBottom: 10,
                    paddingLeft: 3,
                    paddingBottom: 4,
                    //marginTop: 5,
                    textDecorationLine: 'line-through',
                    // textDecorationStyle: '',
                    // textDecorationColor: 'red',
                  }}>
                  {props.originalamount}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
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

export default OfferGrid;

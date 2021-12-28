import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';

const ShopGrid = props => {
  return (
      <View style={styles.mealItem}>
        <TouchableOpacity onPress={props.onSelectNews}>
          <View>
            <View style={{...styles.newsRow, ...styles.newsHeader}}>
              <ImageBackground
                source={{uri: props.image}}
                style={styles.bgImage}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title} numberOfLines={2}>
                    Hotel {props.title.toUpperCase()}
                  </Text>
                </View>
              </ImageBackground>
            </View>
            {/* <View style={styles.newsDetail}>
              <Text
                style={{
                  fontSize: 20,
                  color: 'white',
                  fontWeight: 'bold',
                  //marginBottom: 10,
                  marginTop: 5,
                }}
                numberOfLines={2}>
                Hotel {props.title.toUpperCase()}
              </Text>
            </View> */}
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
    marginHorizontal: 8,
  },
  newsItem: {
    height: 250,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  screen: {
    flex: 1,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 3,
    padding: 10,
    height: 300,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 10,
    //marginBottom: -30,
    // backgroundColor: 'grey',
  },
  bgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  newsRow: {
    flexDirection: 'row',
  },
  newsHeader: {
    height: '100%',
  },
  newsDetail: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '15%',
    backgroundColor: '#6FC3F7',
    fontSize: 42,
  },
  mealDetail: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '15%',
    // backgroundColor: 'rgba(255,127,80,0)',
    backgroundColor: 'orange',
  },
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
});

export default ShopGrid;

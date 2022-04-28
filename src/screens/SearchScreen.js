// import React from 'react';
// import {Text, View} from 'react-native';
// export default function SearchScreen() {
//   return (
//     <View>
//       <Text>SearchScreen</Text>
//     </View>
//   );
// }
// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

// import React in our code
import React, {useState, useEffect} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {postMethod} from '../services/Apiservices';
import OfferGrid from '../components/OfferGrid';
import ActivityLoading from '../components/ActivityLoading';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import {useSelector, useDispatch} from 'react-redux';
const SearchScreen = props => {
  const [search, setSearch] = useState('');
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  useEffect(() => {
    fetch('https://food-order-ver-1.herokuapp.com/getAllItems')
      .then(response => response.json())
      .then(responseJson => {
        // console.log(responseJson.data);
        //setFilteredDataSource(responseJson.data);
        setData(responseJson.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const searchFilterFunction = text => {
    if (text) {
      const newData = data.filter(function (item) {
        const itemData = item.itemName
          ? item.itemName.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      if (newData) {
        setError(true);
      }
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource('');
      setError(false);
      setSearch(text);
    }
  };
  const renderGrid = itemdata => {
    return (
      <OfferGrid
        image={itemdata.item.image_url[0]}
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
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <FlatList
        data={filteredDataSource}
        renderItem={renderGrid}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <View
            style={{
              margin: 5,
              padding: 5,
              borderWidth: 1,
              borderColor: '#e3e3e3',
              borderRadius: 5,
              flexDirection: 'row',
              alignItems: 'center',
              //height:"65%",
              width: '95%',
              //marginRight:'40%'
            }}>
            <TextInput
              style={{height: '140%', width: '90%', marginLeft: 10}}
              onChangeText={text => searchFilterFunction(text)}
              value={search}
              placeholderTextColor="black"
              underlineColorAndroid="transparent"
              placeholder="Search Food"
              color="black"
            />
            <TouchableOpacity>
              <View style={styles.appButtonText}>
                <Icon name="ios-search" size={26} color="grey" />
              </View>
            </TouchableOpacity>
          </View>
        }
        ListFooterComponent={
          error && filteredDataSource.length <= 0 ? (
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
          ) : null
        }
        showsVerticalScrollIndicator={false}
      />
      {isLoading ? (
        <View style={{marginTop: '50%'}}>
          <ActivityLoading size="large" />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

SearchScreen.navigationOptions = navData => {
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
        Search
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
          //source={require('../assets/images/ic_launcher.png')}
          // source={{
          //   uri: 'https://icon-library.com/images/360-icon-png/360-icon-png-15.jpg',
          // }}
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgrey',
  },
  itemStyle: {
    padding: 10,
  },
  itemHeader: {
    height: '100%',
  },
  itemRow: {
    flexDirection: 'row',
  },
  appButtonContainer: {
    //elevation: 1,
    backgroundColor: '#bdbdbd',
    borderRadius: 5,
    height: '100%',
    // paddingVertical: 8,
    // paddingHorizontal: 15,
    // width: 20,
    // height: 50,
    // paddingBottom: 20,
  },
  // appButtonText: {
  //   fontSize: 15,
  //   color: 'blue',
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  //   paddingBottom: 6,
  //   paddingVertical: 10,
  //   paddingHorizontal: 8,
  //   // width: 20,
  //   // height: 50,
  //   // paddingBottom: 20,
  // },
  textInputStyle: {
    //flex: 1,
    borderWidth: 1,
    //paddingLeft: 20,
    // margin: 5,
    // marginLeft: 5,
    marginBottom: 6,
    paddingVertical: 5,
    // paddingBottom: 8,
    // paddingTop: 8,
    paddingHorizontal: 12,
    width: '88%',
    height: '100%',
    color: 'black',
    borderRadius: 5,
    justifyContent: 'flex-end',
    borderColor: '#fff',
    backgroundColor: '#bdbdbd',
  },
});

export default SearchScreen;

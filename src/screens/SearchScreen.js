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
  const [data, setData] = React.useState('');
  const [food, setFood] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const doLogin = () => {
    const req = {
      itemName: food,
    };

    if (food != '') {
      setIsLoading(true);
      postMethod('/filterItems', req)
        .then(response => {
          if (response) {
            //console.warn('login response', response);

            if (response.status == 200) {
              // const user_data = {
              //         token: response.data.token,
              //         userId: response.data.userId,
              //         roles: response.data.roles,
              //         number: response.data.number,
              //     };
              //AsyncStorage.setItem('userInfo', response.data);
              //setInfo(response);
              // signIn(user_data);
              // setIsLoading(false)
              setData(response.data);
              //   Alert.alert('User Updated Successfully');
              //   //navigation.navigate('Login');
              //   props.navigation.goBack();
              setIsLoading(false);
            }
            if (response.data.length === 0) {
              setIsLoading(false);

              Alert.alert(
                'No ' + food + ' found now,please search some other foods!',
              );
            }
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

      Alert.alert('Please type food in search bar');
    }
  };
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
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{backgroundColor: '#fff'}}>
        {/* <View style={styles.itemRow}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={text => setFood(text)}
          //value={food}
          underlineColorAndroid="transparent"
          placeholder="Search for food"
          color="black"
        />
        <TouchableOpacity
          style={styles.appButtonContainer}
          onPress={() => doLogin()}>
          <View style={styles.appButtonText}>
            <Icon name="ios-search" size={28} color="grey" />
          </View>
        </TouchableOpacity>
      </View> */}
        <View
          style={{
            margin: 5,
            padding: 5,
            borderWidth:1,
            borderColor: '#e3e3e3',
            borderRadius: 5,
            flexDirection: 'row',
            alignItems: 'center',
            //height:"65%",
            width:'95%',
            //marginRight:'40%'
          }}>
         
          {/* <TextInput
          style={{height: 40, marginLeft: 10}}
          placeholder="Search Amazon.in"
          value={searchValue}
          onChangeText={setSearchValue}
        /> */}

          <TextInput
            style={{height:'140%',width:'90%', marginLeft: 10,}}
            onChangeText={text => setFood(text)}
            //value={food}
            placeholderTextColor='black'
            underlineColorAndroid="transparent"
            placeholder="Search Food"
            color="black"
          />
           <TouchableOpacity onPress={() => doLogin()}>
            <View style={styles.appButtonText}>
              <Icon name="ios-search" size={26} color="grey" />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList data={data} renderItem={renderGrid}  showsVerticalScrollIndicator={false}/>
          {isLoading ? (
            <View style={{marginTop: '50%'}}>
              <ActivityLoading size="large" />
            </View>
          ) : null}
        </View>
      </ScrollView>
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

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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {postMethod} from '../services/Apiservices';
import OfferGrid from '../components/OfferGrid';
import ActivityLoading from '../components/ActivityLoading';
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
            console.warn('login response', response);

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
      <View style={{...styles.itemRow}}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={text => setFood(text)}
          //value={food}
          underlineColorAndroid="transparent"
          placeholder="Search for food"
        />
        <TouchableOpacity
          style={styles.appButtonContainer}
          onPress={() => doLogin()}>
          <View style={styles.appButtonText}>
            <Icon name="ios-search" size={28} color="grey" />
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList data={data} renderItem={renderGrid} />
        {isLoading ? <ActivityLoading size="large" /> : null}
      </View>
    </SafeAreaView>
  );
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
    backgroundColor: '#fff',
    // borderRadius: 6,
    // paddingVertical: 8,
    // paddingHorizontal: 15,
    // width: 20,
    // height: 50,
    // paddingBottom: 20,
  },
  appButtonText: {
    fontSize: 15,
    color: 'blue',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 6,
    paddingVertical: 10,
    paddingHorizontal: 8,
    // width: 20,
    // height: 50,
    // paddingBottom: 20,
  },
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
    color:'black',
    borderRadius: 0,
    justifyContent: 'flex-end',
    borderColor: '#fff',
    backgroundColor: '#FFFFFF',
    
  },
});

export default SearchScreen;

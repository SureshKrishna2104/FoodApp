import React, {useEffect, useState} from 'react';
import {Text, View, FlatList} from 'react-native';
import FavouriteGrid from '../components/FavouriteGrid';
import AsyncStorage from '@react-native-community/async-storage';
import {isJwtExpired} from 'jwt-check-expiration';
import ActivityLoading from '../components/ActivityLoading';
const FavouriteScreen = props => {
  const [alldata, setAllData] = useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    FvtData();
  }, []);
  const FvtData = () => {
    AsyncStorage.getItem('userToken').then(async resJwt => {
      if (!isJwtExpired(resJwt)) {
        AsyncStorage.getItem('userId').then(async res => {
          setIsLoading(true);
          fetch('https://food-order-ver-1.herokuapp.com/getFvtItem/' + res, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${resJwt}`,
            },
          })
            .then(response => response.json())
            .then(responseJson => {
              setAllData(responseJson.data);
              setIsLoading(false);
              //setIsFav(responseJson.data.some(e => e.itemId === productId));
            })
            .catch(error => {
              setIsLoading(false);
              console.error(error);

            });
        });
      } else {
       
        AsyncStorage.removeItem('userToken');
      }
    });
  };

  const renderGrid = itemdata => {
    console.log(itemdata)
    return (
      <FavouriteGrid
        image={itemdata.item.image_url}
        title={itemdata.item.hotelName}
        quantity={itemdata.item.quantity}
        totalAmount={itemdata.item.totalAmount}
        name={itemdata.item.itemName}
        amount={itemdata.item.amount}
       
      />
    );
  };
  return (
    <View>
      <FlatList
        data={alldata}
        keyExtractor={item => item.itemId}
        inverted={true}
        renderItem={renderGrid}
        ListFooterComponent={
          <>
            {isLoading ? (
              <View style={{marginTop: '50%'}}>
                <ActivityLoading size="large" />
              </View>
            ) : null}
  
            {alldata?.length === 0 && !isLoading  ? (
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
                  No Offer Found
                </Text>
              </>
            ) : null}
          </>
        }
        showsVerticalScrollIndicator={false}
      />
      
    </View>
  );
};

export default FavouriteScreen;

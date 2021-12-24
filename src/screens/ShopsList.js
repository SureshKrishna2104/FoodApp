import React, {useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ShopGrid from '../components/ShopGrid';
import SliderContent from '../components/SliderContent';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
const ShopsList = props => {
  const [data, setData] = React.useState();
  const [count, setCount] = React.useState('');

  const fetchData = () => {
    fetch('http://35.224.0.195:9090/getAllHotel', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseData => {
        setData(responseData.data);
        //console.warn('out of ', responseData.data);
      })
      .catch(err => {
        console.error(err);
      });
  };
  useEffect(() => {
    fetchData();
    const willFocusSubscription = props.navigation.addListener('focus', () => {
     // console.warn('refreshed');
      fetchData();
    });
    AsyncStorage.getItem('userId').then(async res => {
      //console.warn('res', res);
      setCount(res);

      // setId(res);
    });
    props.navigation.setParams({c: count});

    return willFocusSubscription;
  }, []);
  // useEffect(() => {
  //   fetchData();
  // }, []);
  const renderGrid = itemdata => {
    return (
      <ShopGrid
        image={itemdata.item.image_url}
        title={itemdata.item.hotelName}
        description={itemdata.item.description}
        onSelectNews={() => {
          props.navigation.navigate('Products', {
            hotelId: itemdata.item.hotelId,
            hotelName: itemdata.item.hotelName,
            hotelImage: itemdata.item.image_url,
            hotelItems: itemdata.item.items,
          });
        }}
      />
    );
  };
  // return (
  //   <View>
  //     <SliderContent />
  //     <FlatList data={data} renderItem={renderGrid} />
  //   </View>
  // );
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <ScrollView>
        <SliderContent />
        <View style={styles.ListPannel}>
          <FlatList data={data} renderItem={renderGrid} keyExtractor={(item)=>item.id}/>
        </View>
      </ScrollView>
    </View>
  );
};
ShopsList.navigationOptions = navData => {
  // const item = navData.navigation.getParam('c');
  //  navData.navigation.setParams({c: '1'});
  //    console.log(navData.navigation.getParam)
 // console.warn('ddd');
  return {
    headerTitle:<Text style={{ alignContent:'center',justifyContent:"center", color: '#ffffff', fontSize : 17, letterSpacing : 1,   textTransform: 'uppercase'}}>hotels</Text>,
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
        {1 > 0 ? (
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
              1
            </Text>
          </View>
        ) : null}
      </View>
    ),
  };
};

// ShopsList.navigationOptions = navData => {
//   const item = navData.navigation.getParam('c');
//   console.warn('i', item);
//   return {
//     headerTitle: 'Hotels',
//     headerRight: (
//       <View>
//         <HeaderButtons HeaderButtonComponent={HeaderButton}>
//           <Item
//             title="Cart"
//             iconName="cart-outline"
//             onPress={() => {
//               navData.navigation.navigate('Cart');
//             }}
//           />
//         </HeaderButtons>
//         {item > 0 ? (
//           <View
//             style={{
//               position: 'absolute',
//               backgroundColor: 'red',
//               width: 16,
//               height: 16,
//               borderRadius: 20 / 2,
//               right: 6,
//               top: -13,
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}>
//             <Text
//               style={{
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 color: 'white',
//                 fontSize: 10,
//                 fontWeight: 'bold',
//               }}>
//               {item}
//             </Text>
//           </View>
//         ) : null}
//       </View>
//     ),
//   };
// };

export default ShopsList;
const styles = StyleSheet.create({
  containerload: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  ListPannel: {
    padding: 10,
  },
  textheader: {
    fontSize: 18,
    paddingVertical: 8,
  },
  loader: {
    marginTop: 10,
    alignItems: 'center',
  },
});

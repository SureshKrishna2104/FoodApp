import React, {useEffect} from 'react';
import {Text, View, FlatList,Image} from 'react-native';
import OfferGrid from '../components/OfferGrid';
import MealItem from '../components/MealItem';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector, useDispatch} from 'react-redux';
import HeaderButton from '../components/HeaderButton';
import ActivityLoading from '../components/ActivityLoading';
const OfferScreen = props => {
  //   const hotelId = props.navigation.getParam('hotelId');
  //   const hotelName = props.navigation.getParam('hotelName');
  //   const hotelImage = props.navigation.getParam('hotelImage');
  //   const hotelItems = props.navigation.getParam('hotelItems');
  // const newsCat = props.navigation.getParam('newsCat');
  // const newsUrl = props.navigation.getParam('newsUrl');
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const fetchData = () => {
    fetch('http://3.133.49.92:9090/getOffers', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseData => {
        setData(responseData.data);
        setIsLoading(false)
        //console.warn('out of offer', responseData);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false)
      });
  };
  useEffect(() => {
    const willFocusSubscription = props.navigation.addListener('focus', () => {
      //console.warn('refreshed');
      fetchData();
    });
    return willFocusSubscription;
  }, []);
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
    <View>
      <FlatList data={data} renderItem={renderGrid} />
      {isLoading ? <ActivityLoading size="large" /> : null}
      {data?.length === 0 ? <>
        <Text
                style={{
                  fontSize: 20,
                  alignContent:'center',
                  justifyContent:'center',
                 // color: 'white',
                  fontWeight: 'bold',
                  marginTop: 200,
                  marginLeft: 100,
                }}>No Offer Found</Text>
        </>:
        null}
    </View>
  );
};
// OfferScreen.navigationOptions = navigationData => {
//   //const hotelName = navigationData.navigation.getParam('hotelName');
//   return {
//     headerTitle: "Today's Offer!",
//   };
// };
OfferScreen.navigationOptions = navData => {
  //const item = navData.navigation.getParam('badge');
 //  navData.navigation.setParams({c: '1'});
 //    console.log(navData.navigation.getParam)
// console.warn('ddd',item);
const myObj1 = useSelector(state => state.cart.items);
var size = Object.keys(myObj1).length;

 return {
   headerTitle:<Text style={{ alignContent:'center',justifyContent:"center", color: '#ffffff', fontSize : 17, letterSpacing : 1,   textTransform: 'uppercase'}}>Offers</Text>,
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
       {size> 0 ? (
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

export default OfferScreen;

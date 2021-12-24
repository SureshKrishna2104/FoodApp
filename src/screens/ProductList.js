import React, {useEffect} from 'react';
import {Text, View, FlatList,Image} from 'react-native';
import ShopGrid from '../components/ShopGrid';
import MealItem from '../components/MealItem';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector, useDispatch} from 'react-redux';
import ActivityLoading from '../components/ActivityLoading';
const ProductList = props => {
  const hotelId = props.route.params.hotelId;
  //props.navigation.getParam('hotelId');
  const hotelName = props.route.params.hotelName;
  const [isLoading, setIsLoading] = React.useState(true);
  //props.navigation.getParam('hotelName');
  // const hotelImage = props.navigation.getParam('hotelImage');
  // const hotelItems = props.navigation.getParam('hotelItems');
  // const newsCat = props.navigation.getParam('newsCat');
  // const newsUrl = props.navigation.getParam('newsUrl');
  const [data, setData] = React.useState([]);
  useEffect(() => {
    fetch('http://3.133.49.92:9090/getHotel/' + hotelId, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseData => {
        setData(responseData.data.items);setIsLoading(false)        // console.warn('out of id', responseData.data.items);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false)
      });
  }, []);
  const renderGrid = itemdata => {
    return (
      <MealItem
        image={itemdata.item.image_url}
        title={itemdata.item.itemName}
        description={itemdata.item.description}
        hotelName={hotelName}
        amount={itemdata.item.amount}
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
                }}>No Food Found</Text>
        </>:
        null}
    </View>
  );
};
ProductList.navigationOptions = ({props}) => {
  // const hotelName = navigationData.navigation.getParam('hotelName');
  //onsole.log(navigation.state,props)
  //console.log(props);
  const hotelName = 'Suresh';
  return {
    // headerLeft: () => (
    //   <View style={{marginLeft: 5}}>
    //     <Image
    //       style={{
    //         height: 48,
    //         width: 70,
    //       }}
    //       source={require('../assets/images/icon-header.jpg')}
    //     />
    //   </View>
    // ),

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
        foods
      </Text>
    ),
    headerTitleAlign: 'center',
  };
};

// ProductList.navigationOptions = navData => {
//   //const item = navData.navigation.getParam('badge');
//  //  navData.navigation.setParams({c: '1'});
//  //    console.log(navData.navigation.getParam)
// // console.warn('ddd',item);
// const myObj1 = useSelector(state => state.cart.items);
// var size = Object.keys(myObj1).length;

//  return {
//    headerTitle:<Text style={{ alignContent:'center',justifyContent:"center", color: '#ffffff', fontSize : 17, letterSpacing : 1,   textTransform: 'uppercase'}}>foods</Text>,
//    headerTitleAlign: 'center',
//    headerStyle: {
//      backgroundColor: '#6FC3F7',
//      shadowColor: '#fff',
//      elevation: 0,
//    },
//    headerTintColor: 'white',
//    headerTitleStyle: {
//      fontWeight: 'bold',
//    },
//    headerLeft: () => (
//      <View style={{marginLeft: 5}}>
//        <Image
//          style={{
//            height: 48,
//            width: 70,
//          }}
//          source={require('../assets/images/icon-header.jpg')}

//        />
//      </View>
//    ),
//    headerRight: () => (
//      <View>
//        <HeaderButtons HeaderButtonComponent={HeaderButton}>
//          <Item
//            title="Cart"
//            iconName="cart-outline"
//            onPress={() => {
//              navData.navigation.navigate('Cart');
//            }}
//          />
//        </HeaderButtons>
//        {size> 0 ? (
//          <View
//            style={{
//              position: 'absolute',
//              backgroundColor: 'red',
//              width: 16,
//              height: 16,
//              borderRadius: 20 / 2,
//              marginLeft: 20,
//              top: -10,
//              alignItems: 'center',
//              justifyContent: 'center',
//            }}>
//            <Text
//              style={{
//                alignItems: 'center',
//                justifyContent: 'center',
//                color: 'white',
//                fontSize: 10,
//                fontWeight: 'bold',
//              }}>
//              {size}
//            </Text>
//          </View>
//        ) : null}
//      </View>
//    ),
//  };
// };

export default ProductList;

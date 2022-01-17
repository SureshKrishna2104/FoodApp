// import React, {Component} from 'react';
// import {
//   Image,
//   StyleSheet,
//   Dimensions,
//   View,
//   ScrollView,
//   Text,
// } from 'react-native';
// //import AsyncStorage from '@react-native-community/async-storage';
// var {height, width} = Dimensions.get('window');
// import Swiper from 'react-native-swiper';

// //import {getAllData} from '../apiservices/Apiservices';

// export default class SliderContent extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loading: false,
//       jwtoken: '',
//       dataBanner: [
//         {
//           image_id: 1,
//           image_url:
//             'https://vismaifood.com/storage/app/uploads/public/9a3/26d/362/thumb__700_0_0_0_auto.jpg',
//         },
//         {
//           image_id: 2,
//           image_url:
//             'https://ds393qgzrxwzn.cloudfront.net/resize/m600x500/cat1/img/images/0/g9c9pse7gf.jpg',
//         },
//         {
//           image_id: 3,
//           image_url:
//             'https://loveincorporated.blob.core.windows.net/contentimages/gallery/70bc81c8-b277-407d-8c3a-5c1a3e501732-4-hamburger.jpg',
//         },
//         {
//           image_id: 4,
//           image_url:
//             'https://i.pinimg.com/564x/ef/09/06/ef090628bb7664c114df7dc6328d1fcb.jpg',
//         },

//         {
//           image_id: 5,
//           image_url:
//             'https://media.istockphoto.com/photos/smoked-and-spicy-tandoori-chicken-grilling-with-smoke-picture-id995903748?k=6&m=995903748&s=612x612&w=0&h=FGdRz4WNmgMiwBEP4RpF9L1ML8TeGot-AZdGvDVg0l0=',
//         },
//       ],
//     };
//   }

//   // componentDidMount() {
//   //   AsyncStorage.getItem("userToken").then(async (res) => {
//   //     const t = await res;
//   //     // console.warn("get async", t);
//   //     this.setState({ jwtoken: t });
//   //     //this.getData();
//   //   });
//   //   // this.getData();
//   // }

//   // getData = async () => {
//   //   this.setState({ loading: true });
//   //   getAllData("banner_images", this.state.jwtoken)
//   //     .then((response) => {
//   //       if (response.statuscode == 200) {
//   //         console.warn("sliderr");
//   //         this.setState({ dataBanner: response.complaint_categories });
//   //         console.warn("bannerima", response.complaint_categories);
//   //         this.setState({ loading: false });
//   //       } else {
//   //         this.setState({ loading: false, dataBanner: null, error: "" });
//   //       }
//   //     })
//   //     .catch((error) => {
//   //       this.setState({ loading: false, dataBanner: null, error: error });
//   //     });
//   // };

//   render() {
//     return (
//       <ScrollView>
//         <View style={{flex: 1}}>
//           <View
//             style={{
//               width: 400,
//               alignItems: 'center',
//               marginHorizontal: 3,
//             }}>
//             <Swiper
//               style={{height: width / 1.5}}
//               showsButtons={false}
//               autoplay={true}
//               showsPagination={true}
//               autoplayTimeout={4}>
//               {this.state.dataBanner.map(itembann => {
//                 return (
//                   <View>
//                     <Image
//                       style={styles.imageBanner}
//                       resizeMode="cover"
//                       source={{uri: itembann.image_url}}
//                     />
//                   </View>
//                 );
//               })}
//             </Swiper>
//             <View />
//           </View>
//         </View>
//       </ScrollView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   imageBanner: {
//     height: '100%',
//     width: '100%',
//     //borderRadius: 0,
//     marginHorizontal: 3,
//     marginTop: 10,
//     borderRadius: 10,
//   },
// });
import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
  Text,
} from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';
var {height, width} = Dimensions.get('window');
import Swiper from 'react-native-swiper';

//import {getAllData} from '../apiservices/Apiservices';

export default class SliderContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      jwtoken: '',
      dataBanner: [
        {
          image_id: 1,
          image_url:
            'https://vegveganmeat.com/wp-content/uploads/2020/11/chicken-biryani-pressure-cooker-south-india-square-735x735.jpg',
        },
        {
          image_id: 2,
          image_url:
            'http://pizzamexico.pk/wp-content/uploads/2021/04/pizza-002.jpg',
        },
        {
          image_id: 3,
          image_url:
            'https://loveincorporated.blob.core.windows.net/contentimages/gallery/70bc81c8-b277-407d-8c3a-5c1a3e501732-4-hamburger.jpg',
        },
        {
          image_id: 4,
          image_url:
            'https://i.pinimg.com/564x/df/2e/0c/df2e0ccc2d5f810bcafca7e42bac6390.jpg',
        },

        {
          image_id: 5,
          image_url:
            'https://i.pinimg.com/564x/ab/37/07/ab37079669ca3212c9fb5fa9aad765e2.jpg',
        },
      ],
    };
  }

  // componentDidMount() {
  //   AsyncStorage.getItem("userToken").then(async (res) => {
  //     const t = await res;
  //     // console.warn("get async", t);
  //     this.setState({ jwtoken: t });
  //     //this.getData();
  //   });
  //   // this.getData();
  // }

  // getData = async () => {
  //   this.setState({ loading: true });
  //   getAllData("banner_images", this.state.jwtoken)
  //     .then((response) => {
  //       if (response.statuscode == 200) {
  //         console.warn("sliderr");
  //         this.setState({ dataBanner: response.complaint_categories });
  //         console.warn("bannerima", response.complaint_categories);
  //         this.setState({ loading: false });
  //       } else {
  //         this.setState({ loading: false, dataBanner: null, error: "" });
  //       }
  //     })
  //     .catch((error) => {
  //       this.setState({ loading: false, dataBanner: null, error: error });
  //     });
  // };

  render() {
    return (
      <ScrollView>
        <View style={{flex: 1}}>
          <View
            style={{
              width: "100%",
              alignItems: 'center',
              marginHorizontal:-1,
              marginTop:-30,
            }}>
            <Swiper
              style={{height: width / 1.5}}
              showsButtons={false}
              autoplay={true}
              showsPagination={true}
              autoplayTimeout={2}>
              {this.state.dataBanner.map(itembann => {
                return (
                  <View>
                    <Image
                      style={styles.imageBanner}
                      resizeMode="cover"
                      source={{uri: itembann.image_url}}
                    />
                  </View>
                );
              })}
            </Swiper>
            <View />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  imageBanner: {
    height: '100%',
    width: '100%',
    //borderRadius: 0,
    marginHorizontal: 3,
    marginTop: 10,
    borderRadius: 10,
  },
});

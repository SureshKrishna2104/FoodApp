import React, {useEffect} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  Share,
  TouchableRipple,
} from 'react-native-paper';
// import {AuthContext} from '../components/context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getAllData} from '../services/Apiservices';
import {ScrollView} from 'react-native-gesture-handler';
// import Modal from 'react-native-modal';
// import {RadioButton} from 'react-native-paper';
// import {CheckBox} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
//import {strings, setLocale} from '../locales/i18n';

const ProfileScreen = ({navigation}) => {
  // const [userToken, setToken] = React.useState('');
  // const [userId, setUserid] = React.useState('');

  // const [isModalVisible, setModalVisible] = React.useState(false);
  // const [checked, setChecked] = React.useState('en');
  // const [jwt, setJwt] = React.useState('');

  // const [data, setData] = React.useState({
  //   profileImage: '',
  //   isLoading: false,
  //   Loading_Activity_Indicator: false,
  //   userid: '',
  //   jwt_token: '',
  //   firstName: '',
  //   lastName: '',
  //   fathersName: '',
  //   age: '',
  //   wardNo: '',
  //   address: '',
  //   pinCode: '',
  //   email: '',
  //   phone: '',
  //   msg: '',
  //   district: '',
  //   aadharid: '',
  // });
  const [data, setData] = React.useState([]);
  const getProfile = async => {
    AsyncStorage.getItem('userId').then(async res => {
      const id = await res;
      console.warn('idp', id);
      getAllData('/getUser/' + id)
        .then(responseJson => {
          console.warn(responseJson.data);
          setData(responseJson.data);
        })
        .catch(error => {
          Alert.alert(
            'No Internet connection.\n Please check your internet connection \nor try again',
          );
        });
    });
  };
  // const signOut=()=>{
  //   return()
  // }
  // const {signOut} = React.useContext(AuthContext);
  // const getProfile = async () => {
  //   AsyncStorage.getItem('userToken').then(async res => {
  //     const id = await res;
  //     setUserid(id);
  //     setJwt(res);
  //     console.warn('iddd', jwt);

  //     AsyncStorage.getItem('userName').then(async res => {
  //       const val = await res;
  //       console.warn('valdd', val);
  //       setToken(res);
  //       getAllData('get_user?user_id=' + val, id)
  //         .then(responseJson => {
  //           if (responseJson.statuscode == 404) {
  //             setData({
  //               profileImage: '',
  //               isLoading: false,
  //               Loading_Activity_Indicator: false,
  //               userid: '',
  //               jwt_token: '',
  //               firstName: '',
  //               lastName: '',
  //               fathersName: '',
  //               age: '',
  //               wardNo: '',
  //               address: '',
  //               pinCode: '',
  //               email: '',
  //               phone: '',
  //               msg: '',
  //               district: '',
  //               aadharid: '',

  //               msg: 'Failed to load the data, Please retry!!',
  //             });
  //           }
  //           if (responseJson.statuscode == 200) {
  //             console.warn('rjm', responseJson.data.address1);
  //             if (!responseJson.data.address1) {
  //               navigation.navigate('Edit Profile');
  //               Alert.alert(
  //                 'Please add all mandatory field to create appointment',
  //               );
  //             }
  //             setData({
  //               isLoading: false,
  //               Loading_Activity_Indicator: false,
  //               profileImage: responseJson.data.profile_image || '',
  //               firstName: responseJson.data.first_name || '',
  //               lastName: responseJson.data.last_name || '',
  //               address: responseJson.data.address || '',
  //               email: responseJson.data.email || '',
  //               phone: responseJson.data.mobile_number || '',
  //               district: responseJson.data.district || '',
  //               aadharid: responseJson.data.adhaar_number || '',
  //             });
  //           }
  //         })
  //         .catch(error => {
  //           Alert.alert(
  //             'No Internet connection.\n Please check your internet connection \nor try again',
  //           );
  //         });
  //     });
  //   });
  // };
  // const toggleModal = () => {
  //   setModalVisible(!isModalVisible);
  // };
  // const items = [
  //   {
  //     key: 0,
  //     label: 'Fruits',
  //     value: 'some value',
  //   },
  //   {
  //     key: 1,
  //     label: 'Fruits',
  //     value: {
  //       this: 'could',
  //       be: 'anything',
  //     },
  //   },
  // ];
  // const onShare = async () => {
  //   try {
  //     const result = await Share.share(
  //       {
  //         message: data.firstName + 'share this message',
  //         title: 'regarding to mla app',
  //         url: data.profileImage,
  //       },
  //       {
  //         excludedActivityTypes: [
  //           'com.apple.UIKit.activity.PostToWeibo',
  //           'com.apple.UIKit.activity.Print',
  //           'com.apple.UIKit.activity.CopyToPasteboard',
  //           'com.apple.UIKit.activity.AssignToContact',
  //           'com.apple.UIKit.activity.SaveToCameraRoll',
  //           'com.apple.UIKit.activity.AddToReadingList',
  //           'com.apple.UIKit.activity.PostToFlickr',
  //           'com.apple.UIKit.activity.PostToVimeo',
  //           'com.apple.UIKit.activity.PostToTencentWeibo',
  //           'com.apple.UIKit.activity.AirDrop',
  //           'com.apple.UIKit.activity.OpenInIBooks',
  //           'com.apple.UIKit.activity.MarkupAsPDF',
  //           'com.apple.reminders.RemindersEditorExtension',
  //           'com.apple.mobilenotes.SharingExtension',
  //           'com.apple.mobileslideshow.StreamShareService',
  //           'com.linkedin.LinkedIn.ShareExtension',
  //           'pinterest.ShareExtension',
  //           'com.google.GooglePlus.ShareExtension',
  //           'com.tumblr.tumblr.Share-With-Tumblr',
  //           'net.whatsapp.WhatsApp.ShareExtension',
  //         ],
  //       },
  //     );
  //     if (result.action === Share.sharedAction) {
  //       if (result.activityType) {
  //         // shared with activity type of result.activityType
  //       } else {
  //         // shared
  //       }
  //     } else if (result.action === Share.dismissedAction) {
  //       // dismissed
  //     }
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };
  // const onChange = item => {
  //   // the full item as defined in the list of items is passed to the onChange handler to give full
  //   // flexibility on what to do...
  // };
  // const languageClicked = data => {
  //   const lanData = {
  //     lan: data,
  //   };
  //   setChecked(data);
  //   setLocale(data);
  //   AsyncStorage.setItem('appLanguage', data);
  // };
  // const fetchData = () => {
  //   fetch('http://35.224.0.195:9090/getUser/BFMcPe', {
  //     method: 'GET',
  //   })
  //     .then(response => response.json())
  //     .then(responseData => {
  //       setData(responseData.data);
  //       console.warn('out of ppp', responseData);
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  // };
  useEffect(() => {
    getProfile();
    //fetchData();
    // setTimeout(async () => {
    //   getProfile();
    // }, 1000);
    navigation.addListener('didfocus', () => getProfile());
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.userInfoSection}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
            }}>
            <Avatar.Image
              source={{
                uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpajo6PFxcW3t7ecnJyqqqq+vr6xsbGXmO98AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABPUlEQVRoge3Tv0/CQBjG8YcWaMcebymOENLI2MZoHMHEvVUKjq1K4lhM2Kvxx7/tUUiamDhc6GSez8INzbf3HleAiIiIiIiIiIiIiNozAGzvuJYTW2reXmso7bX8YN96HUR1a7RZ6+VVOgU+p4LuZGrSkqK0PWfwfl+3ht/hcpdvPkJ0g0fBYpYZtS7HttfPMatbAbZzJ1kjjnqVK1ihNzdpdX3b65S4qVsjXbG9EtuoEzliC/RbDFoIL7wY2NZrQayPzw1VpH/FUUqNjVrx0+9W8Rzrlt7yMMvMWq7fzHhoCTp6Rr0vw0uiH8+as69bov/AyNqf/Rms3Ky1aO7EYV93X2nlBIXg7WVSmrWs5q4eWrvVdYLbpR4/PTeZ8S9O82mdzMr7SVstV6mqrRaKh9ZSRERERERERET0n/wAZwMqI9kyPcoAAAAASUVORK5CYII=',
              }}
              size={80}
            />
            <View
              style={{
                marginLeft: 20,
              }}>
              <Title
                style={[
                  styles.title,
                  {
                    marginTop: 15,
                    marginBottom: 5,
                  },
                ]}>
                Suresh
              </Title>
              <Caption style={styles.caption}>krishna</Caption>
            </View>
          </View>
        </View>

        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon name="phone" color="#777777" size={20} />
            <Text
              style={{
                color: '#777777',
                marginLeft: 20,
              }}>
              {data.number}
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="map-marker-radius" color="#777777" size={20} />
            <Text
              style={{
                color: '#777777',
                marginLeft: 20,
              }}>
              {data.address}
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="pincode" color="#777777" size={20} />
            <Text
              style={{
                color: '#777777',
                marginLeft: 20,
              }}>
              {data.pinCode}
            </Text>
          </View>
        </View>

        <View style={styles.infoBoxWrapper} />
        <View style={styles.menuWrapper}>
          <TouchableRipple onPress={() => navigation.navigate('Orders')}>
            <View style={styles.menuItem}>
              <Icon name="edit" color="#F05E23" size={25} />
              <Text style={styles.menuItemText}>Your Orders</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => navigation.navigate('EditProfile')}>
            <View style={styles.menuItem}>
              <Icon name="edit" color="#F05E23" size={25} />
              <Text style={styles.menuItemText}>Edit Profile</Text>
            </View>
          </TouchableRipple>
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                'Log out',
                'Do you want to logout?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => {
                      return null;
                    },
                  },
                  {
                    text: 'Confirm',
                    onPress: () => {
                      //AsyncStorage.clear();
                      AsyncStorage.removeItem('userId');
                      navigation.navigate('Shops');
                    },
                  },
                ],
                {cancelable: false},
              )
            }>
            <View style={styles.menuItem}>
              <AntDesign name="logout" color="#F05E23" size={25} />
              <Text style={styles.menuItemText}>LogOut</Text>
            </View>
          </TouchableOpacity>
          <TouchableRipple
            onPress={() => {
              navigation.navigate('LoginScreen');
            }}>
            <View style={styles.menuItem}>
              <AntDesign name="login" color="#F05E23" size={25} />
              <Text style={styles.menuItemText}>SignIn</Text>
            </View>
          </TouchableRipple>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {fontSize: 24, fontWeight: 'bold'},
  cancelButton: {backgroundColor: '#F05E23'},
  textCancel: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 14,
    padding: 10,
  },
  radioView: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});

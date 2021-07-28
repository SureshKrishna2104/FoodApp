import React, {useEffect} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
  InteractionManager,
} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  Share,
  TouchableRipple,
} from 'react-native-paper';
//import {useIsFocused} from '@react-navigation/core';
import * as cartActions from '../store/actions/cart';
// import {AuthContext} from '../components/context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getAllData} from '../services/Apiservices';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
// import Modal from 'react-native-modal';
// import {RadioButton} from 'react-native-paper';
// import {CheckBox} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

//import {strings, setLocale} from '../locales/i18n';

const ProfileScreen = ({navigation}) => {
  const [data, setData] = React.useState([]);
  const [id, setId] = React.useState('');

  const getProfile = async => {
    AsyncStorage.getItem('userId').then(async res => {
      const id = await res;
      console.warn('idp', id);
      //id = 'jBpy4f';
      if (id) {
        getAllData('/getUser/' + id)
          .then(responseJson => {
            console.warn('ress', responseJson.data);
            setData(responseJson.data);
          })
          .catch(error => {
            Alert.alert(
              'No Internet connection.\n Please check your internet connection \nor try again',
            );
          });
      } else {
        setData('');
      }
    });
  };
  //const isfocus = useIsFocused();
  // useEffect(() => {
  //   getProfile();
  //   //console.warn('userche', userCheck);
  // }, []);
  const getFocus = () => {
    // if (data.length === 0) {
    //   console.warn('this is called', data.length);
    //   navigation.navigate('Login');
    // }
    if (!data) {
      console.warn('ifif is called', data.length);
      navigation.navigate('Login');
    } else {
      console.warn('else is called', data.length);
    }
  };
  useEffect(() => {
    getProfile();
    const willFocusSubscription = navigation.addListener('focus', () => {
      console.warn('profile refreshed');
      getProfile();
      // getFocus();
    });
    AsyncStorage.getItem('userId').then(async res => {
      console.warn('res', res);
      setId(res);

      // setId(res);
    });
    // props.navigation.setParams({c: count});

    return willFocusSubscription;
  }, []);
  const dispatch = useDispatch;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.userInfoSection}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              backgroundColor: '#6FC3F7',
            }}>
            <Avatar.Image
              source={{
                uri: 'https://img.icons8.com/bubbles/2x/360-view.png',
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
                {data.length > 0 ? data.name : 'Your Name'}
              </Title>
              <Caption style={styles.caption}>Food 360*</Caption>
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
              {data.length != 0 ? data.number : '+91 9xxxxxxxxx'}
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="map-marker-radius" color="#777777" size={20} />
            <Text
              style={{
                color: '#777777',
                marginLeft: 20,
              }}>
              {data.length != 0 ? data.address : 'Address'}
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="pin" color="#777777" size={20} />
            <Text
              style={{
                color: '#777777',
                marginLeft: 20,
              }}>
              {data.length != 0 ? data.pinCode : 'pincode'}
            </Text>
          </View>
        </View>

        <View style={styles.infoBoxWrapper} />
        <View style={styles.menuWrapper}>
          {data.length != 0 ? (
            <View>
              <TouchableRipple onPress={() => navigation.navigate('Orders')}>
                <View style={styles.menuItem}>
                  <Icon name="cart-arrow-right" color="#F05E23" size={25} />
                  <Text style={styles.menuItemText}>Your Orders</Text>
                </View>
              </TouchableRipple>
              <TouchableRipple
                onPress={() => navigation.navigate('EditProfile')}>
                <View style={styles.menuItem}>
                  <Icon name="account-edit" color="#F05E23" size={25} />
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
                          // getProfile();
                          AsyncStorage.removeItem('userId');
                          // dispatch(cartActions.login(false));
                          // navigation.navigate('Shops');
                          getProfile();
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
            </View>
          ) : (
            <TouchableRipple
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <View style={styles.menuItem}>
                <AntDesign name="login" color="#F05E23" size={25} />
                <Text style={styles.menuItemText}>SignIn</Text>
              </View>
            </TouchableRipple>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
  // } else {
  //   navigation.navigate('Login');
  // }
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

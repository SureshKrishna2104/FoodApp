import React, {useEffect} from 'react';
//import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
  InteractionManager,
  ImageBackground,
  Image,
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
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getAllData} from '../services/Apiservices';
import {ScrollView} from 'react-native-gesture-handler';
import {isJwtExpired} from 'jwt-check-expiration';
// import Modal from 'react-native-modal';
// import {RadioButton} from 'react-native-paper';
// import {CheckBox} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import ActivityLoading from '../components/ActivityLoading';
//import {strings, setLocale} from '../locales/i18n';

const ProfileScreen = ({navigation}) => {
  const [data, setData] = React.useState([]);
  const [fvtData, setFvtData] = React.useState([]);
  const [id, setId] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [jwt, setJwt] = React.useState('');

  const getProfile = async => {
    AsyncStorage.getItem('userId').then(async res => {
      const id = await res;

      if (id) {
        AsyncStorage.getItem('userToken')
          .then(async res => {
            if (!isJwtExpired(res)) {
              fetch('https://food-order-ver-1.herokuapp.com/getUser/' + id, {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${res}`,
                },
              })
                .then(response => response.json())
                .then(responseData => {
                  setData(responseData.data);
                })
                .catch(err => {
                  setIsLoading(false);
                  console.error(err, 'kk');
                });

              fetch('https://food-order-ver-1.herokuapp.com/getFvtItem/' + id, {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${res}`,
                },
              })
                .then(response => response.json())
                .then(responseData => {
                  setFvtData(responseData.data);
                  setIsLoading(false);
                })
                .catch(err => {
                  setIsLoading(false);
                  console.error(err, 'kk');
                });
            } else {
              setIsLoading(false);
              AsyncStorage.removeItem('userToken');
              AsyncStorage.removeItem('userId');
            }
          })
          .catch(err => {
            setIsLoading(false);
            console.error(err, 'kk');
          });
      } else {
        setData('');
        setIsLoading(false);
      }
    });
  };

  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      getProfile();
    });
    AsyncStorage.getItem('userId').then(async res => {
      setId(res);
    });

    return willFocusSubscription;
  }, []);


   
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <ImageBackground
            style={styles.headerBackgroundImage}
            blurRadius={10}
            source={{
              uri: 'https://vismaifood.com/storage/app/uploads/public/9a3/26d/362/thumb__700_0_0_0_auto.jpg',
            }}>
            <View style={styles.headerColumn}>
              <Image
                style={styles.userImage}
                source={require('../assets/images/flash.jpg')}
              />
              <Text style={styles.userNameText}>{data ? data.name : ''}</Text>
              <View style={styles.userAddressRow}>
                <View style={styles.userCityRow}>
                  <Text style={styles.userCityText}>
                    {data ? data.number : ''}
                  </Text>
                  <Text style={styles.userCityText}>
                    {data ? data.address : ''}
                  </Text>
                  <Text style={styles.userCityText}>
                  {data ? data.city : ''}-{data ? data.pinCode : ''}
                  </Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.infoBoxWrapper} />
        <View style={styles.menuWrapper}>
          {isLoading ? <ActivityLoading size="large" /> : null}
          {data.length != 0 ? (
            <View>
              <TouchableRipple
                onPress={() =>
                  navigation.navigate('Orders', {order: data.orders})
                }>
                <View style={styles.menuItem}>
                  <Icon name="cart-arrow-right" color="#6FC3F7" size={25} />
                  <Text style={styles.menuItemText}>Your Orders</Text>
                </View>
              </TouchableRipple>
              <TouchableRipple
                onPress={() =>
                  navigation.navigate('Favourites', {
                    id: id,
                  })
                }>
                <View style={styles.menuItem}>
                  <Icon name="heart" color="#6FC3F7" size={25} />
                  <Text style={styles.menuItemText}>Your Favourites</Text>
                </View>
              </TouchableRipple>
              <TouchableRipple
                onPress={() =>
                  navigation.navigate('EditProfile', {
                    name: data?.name,
                    phone: data?.number,
                    city:data?.city,
                    address: data?.address,
                    pincode: data?.pinCode,
                    pwd: data?.password,
                  })
                }>
                <View style={styles.menuItem}>
                  <Icon name="account-edit" color="#6FC3F7" size={25} />
                  <Text style={styles.menuItemText}>Edit Profile</Text>
                </View>
              </TouchableRipple>
              <TouchableRipple
                onPress={() => {
                  navigation.navigate('TermsAndConditions');
                }}>
                <View style={styles.menuItem}>
                  <FontAwesome name="file-contract" color="#6FC3F7" size={25} />
                  <Text style={styles.menuItemText}>Terms And Condtions</Text>
                </View>
              </TouchableRipple>

              <TouchableRipple
                onPress={() => {
                  navigation.navigate('ReturnPolicy');
                }}>
                <View style={styles.menuItem}>
                  <Icon name="cash-refund" color="#6FC3F7" size={25} />
                  <Text style={styles.menuItemText}>
                    Refund and Return Policy
                  </Text>
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
                           AsyncStorage.removeItem('userToken'),
                            AsyncStorage.removeItem('userId'),
                            getProfile();
                        },
                      },
                    ],
                    {cancelable: false},
                  )
                }>
                <View style={styles.menuItem}>
                  <AntDesign name="logout" color="#6FC3F7" size={25} />
                  <Text style={styles.menuItemText}>LogOut</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <TouchableRipple
                onPress={() => {
                  navigation.navigate('TermsAndConditions');
                }}>
                <View style={styles.menuItem}>
                  <FontAwesome name="file-contract" color="#6FC3F7" size={25} />
                  <Text style={styles.menuItemText}>Terms And Condtions</Text>
                </View>
              </TouchableRipple>
              <TouchableRipple
                onPress={() => {
                  navigation.navigate('ReturnPolicy');
                }}>
                <View style={styles.menuItem}>
                  <Icon name="cash-refund" color="#6FC3F7" size={25} />
                  <Text style={styles.menuItemText}>
                    Refund and Return Policy
                  </Text>
                </View>
              </TouchableRipple>
              <TouchableRipple
                onPress={() => {
                  navigation.navigate('Login');
                }}>
                <View style={styles.menuItem}>
                  <AntDesign name="login" color="#6FC3F7" size={25} />
                  <Text style={styles.menuItemText}>SignIn</Text>
                </View>
              </TouchableRipple>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },

  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 45,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },
  placeIcon: {
    color: 'white',
    fontSize: 26,
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  telContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userCityRow: {
    backgroundColor: 'transparent',
  },
  userCityText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
  },
  userImage: {
    borderColor: '#FFF',
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },
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
    fontSize: 18,
    lineHeight: 26,
    letterSpacing: 1,
  },
});

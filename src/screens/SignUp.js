import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
//import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
//import {postMethod} from '../services/Apiservices';
import {postMethod} from '../services/Apiservices';
import {useTheme} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import {useToast} from 'react-native-toast-notifications';

//import { AuthContext } from '../routes'
import ActivityLoading from '../components/ActivityLoading';
const SignUp = ({navigation}) => {
  const [data, setData] = React.useState({
    name: '',
    number: '',
    password: '',
    address: '',
    pincode: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });
  const [selectedState, setselectedState] = useState();
  const [selectedPincode, setSelectedPincode] = useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [cityData, setCityData] = useState([]);
  const [pinData, setPinData] = useState([]);
  const toast = useToast();
  //const { signIn } = React.useContext(AuthContext);

  const setInfo = async data => {
    const jsonValue = JSON.stringify(data.data);
    const id = JSON.stringify(data.data.userId);
    await AsyncStorage.setItem('userInfo', jsonValue);
    await AsyncStorage.setItem('userId', id);
  };
  useEffect(() => {
    fetch('https://food-order-ver-1.herokuapp.com/getCity', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseData => {
        setCityData(responseData.data);
      })
      .catch(err => {
        setIsLoading(false);
        //console.error(err);
      });
  }, []);
  const doLogin = () => {
    const req = {
      name: data.name,
      number: data.number,
      password: data.password,
      address: data.address,
      city: selectedState,
      pinCode: selectedPincode,
    };

    if (
      data.number != '' &&
      data.name != '' &&
      data.password != '' &&
      data.address != '' &&
      setCityData != '' &&
      selectedPincode != ''
    ) {
      setIsLoading(true);
      postMethod('/signup', req)
        .then(response => {
          if (response) {
            //console.warn('login response', response);

            if (response.status == 200) {
              showtoast();
              navigation.navigate('Login');
            } else if (response.status == 500) {
              setIsLoading(false);

              Alert.alert('Not able to login in, Please try later');
            }
            if (response.statuscode == 404) {
              setIsLoading(false);

              Alert.alert('User account already deactivated');
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

      Alert.alert('Please add all manadatory fields');
    }
  };

  const {colors} = useTheme();

  const handlePasswordChange = val => {
    if (val.trim().length >= 3) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidNumber = val => {
    if (val.trim().length >= 1) {
      setData({
        ...data,
        number: val,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };
  const handleValidAddress = val => {
    if (val.trim().length >= 1) {
      setData({
        ...data,
        address: val,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };
  const handleValidPinCode = val => {
    if (val.trim().length >= 1) {
      setData({
        ...data,
        pincode: val,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };
  const handleValidName = val => {
    if (val.trim().length >= 1) {
      setData({
        ...data,
        name: val,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };
  let stateArray = cityData?.map((s, i) => {
    return <Picker.Item key={i} value={s.cityName} label={s.cityName} />;
  });

  useEffect(() => {
    cityData.map((e, i) => {
      if (e.cityName === selectedState) {
        setPinData(e.pinCodes);
      }
    });
  }, [selectedState]);
  let pinArray = pinData?.map((s, i) => {
    return <Picker.Item key={i} value={s.pinCode} label={s.pinCode} />;
  });
  const showtoast = () => {
    // ToastAndroid.show('hiihhi', ToastAndroid.SHORT);
    //toast.show("hoii")
    
    
    toast.show('Account created Sucessfully', {
    type: ' success',
    placement: 'top',
    duration: 2000,
    offset: 10,
    animationType: 'zoom-in ',
    normalColor: '#5F9B8C',
    successColor: 'green',
    textStyle: {fontSize: 18},
    
    //textStyle:''
    });
    };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../assets/images/login.jpg')}
            resizeMode="contain"
            style={{
              width: 200,
              height: 150,
            }}
          />
        </View>
        <Animatable.View
          animation="fadeInUpBig"
          style={[
            styles.footer,
            {
              backgroundColor: colors.background,
            },
          ]}>
          <Text
            style={[
              styles.text_footer,
              {
                color: colors.text,
              },
            ]}>
            Name
            <Text
              style={[
                styles.text_footer,
                {
                  color: 'red',
                },
              ]}>
              {' '}
              *
            </Text>
          </Text>

          <View style={styles.action}>
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <TextInput
              placeholder="Enter Your Name"
              placeholderTextColor="#666666"
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={val => handleValidName(val)}
            />
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                color: colors.text,
              },
            ]}>
            Phone Number
            <Text
              style={[
                styles.text_footer,
                {
                  color: 'red',
                },
              ]}>
              {' '}
              *
            </Text>
          </Text>

          <View style={styles.action}>
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <TextInput
              placeholder="Enter Your Number"
              placeholderTextColor="#666666"
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={val => handleValidNumber(val)}
            />
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                color: colors.text,
              },
            ]}>
            Password
            <Text
              style={[
                styles.text_footer,
                {
                  color: 'red',
                },
              ]}>
              {' '}
              *
            </Text>
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color={colors.text} size={20} />
            <TextInput
              placeholder="Enter Your Password"
              placeholderTextColor="#666666"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={val => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          {data.isValidPassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Password must be 8 characters long.
              </Text>
            </Animatable.View>
          )}
          <Text
            style={[
              styles.text_footer,
              {
                color: colors.text,
              },
            ]}>
            Address
            <Text
              style={[
                styles.text_footer,
                {
                  color: 'red',
                },
              ]}>
              {' '}
              *
            </Text>
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <TextInput
              placeholder="Enter Your Address"
              placeholderTextColor="#666666"
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={val => handleValidAddress(val)}
            />
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                color: colors.text,
              },
            ]}>
            City
            <Text
              style={[
                styles.text_footer,
                {
                  color: 'red',
                },
              ]}>
              {' '}
              *
            </Text>
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color={colors.text} size={20} />
            <Picker
              selectedValue={selectedState}
              style={{width: 300, marginTop: -15}}
              onValueChange={(itemValue, itemIndex) =>
                setselectedState(itemValue)
              }>
              {stateArray != '' ? (
                <Picker.Item label="Select City" value="" />
              ) : (
                <Picker.Item label="xyz" value="xyz" />
              )}
              {stateArray}
            </Picker>
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                color: colors.text,
              },
            ]}>
            Pincode
            <Text
              style={[
                styles.text_footer,
                {
                  color: 'red',
                },
              ]}>
              {' '}
              *
            </Text>
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color={colors.text} size={20} />
            <Picker
              selectedValue={selectedPincode}
              style={{width: 300, marginTop: -15}}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedPincode(itemValue)
              }>
              {pinArray != '' ? (
                <Picker.Item label="Select PinCode" value="" />
              ) : (
                <Picker.Item label="xyz" value="xyz" />
              )}
              {pinArray}
            </Picker>
          </View>

          <TouchableOpacity
            style={styles.appButtonContainer}
            onPress={() => doLogin()}>
            <Text
              style={styles.appButtonText}
              secureTextEntry={true}
              color="grey"
              align="center">
              SIGN UP
            </Text>
          </TouchableOpacity>
          {isLoading ? <ActivityLoading size="large" /> : null}

          <Text style={{fontSize: 15, marginTop: 10}}>
            Already have an account! Please SignIn
          </Text>
          <TouchableOpacity
            style={styles.appButtonContainer}
            onPress={() => navigation.navigate('Login')}>
            <Text
              style={styles.appButtonText}
              secureTextEntry={true}
              color="grey"
              align="center">
              SIGN IN
            </Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </ScrollView>
  );
};
// Login.navigationOptions = {
//   headerTitle: 'Login',
// };
SignUp.navigationOptions = navigationData => {
  return {
    headerTitle: 'SignUp',
  };
};
export default SignUp;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 18,
    backgroundColor: '#fff',
  },
  footer: {
    flex: 1,
    elevation: 2,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginBottom: 30,
  },
  text_header: {
    color: '#0f73ee',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  appButtonContainer: {
    elevation: 1,
    backgroundColor: '#0f73ee',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 15,
    width: 300,
    height: 50,
    paddingBottom: 20,
  },
  appButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

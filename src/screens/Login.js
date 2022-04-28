import React, {useEffect} from 'react';
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
  DevSettings
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
//import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
//import {postMethod} from '../services/Apiservices';
import {postMethod} from '../services/Apiservices';
import {useTheme} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import * as cartActions from '../store/actions/cart';
import App from '../../App';
//import { AuthContext } from '../routes'
import ActivityLoading from '../components/ActivityLoading';
const Login = ({navigation}) => {
  const [data, setData] = React.useState({
    number: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();
  //const { signIn } = React.useContext(AuthContext);

  const setInfo = async data => {
    console.warn('dataaaa-', data.data);
    const jsonValue = JSON.stringify(data.data);
    // const id = JSON.stringify(data.data.userId);
    await AsyncStorage.setItem('userInfo', jsonValue);
    await AsyncStorage.setItem('userId', data.data.userId);
    await AsyncStorage.setItem('userToken', data.data.token);
    if (data.data.role) {
      await AsyncStorage.setItem('role', data.data.role);
    }else{
      await AsyncStorage.setItem('role', "user");
    } 
  };

  const doLogin = () => {
    const req = {
      number: data.number,
      password: data.password,
    };

    if (data.number != '') {
      setIsLoading(true);
      postMethod('/login', req)
        .then(response => {
          if (response) {
            if (response.status == 200) {
              setInfo(response);

              console.log(response.data, 'login data');

              Alert.alert('Login successful');

            //  dispatch(cartActions.login(true));s
              if(response.data.role){
              DevSettings.reload()
              }
             navigation.navigate('Shops');
              navigation.goBack();
            } else if (response.status == 500) {
              setIsLoading(false);
              Alert.alert('User Not Found!, Please SignUp');
            }
            if (response.status == 404) {
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

      Alert.alert('number and Password cannot be empty');
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

  const handleValidUser = val => {
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

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../assets/images/login.jpg')}
            resizeMode="contain"
            style={{
              width: 200,
              height: 150,
              marginTop: 10,
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
            Phone Number
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
              onChangeText={val => handleValidUser(val)}
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
          <Text> </Text>
          <TouchableOpacity
            style={styles.appButtonContainer}
            onPress={() => doLogin()}>
            <Text
              style={styles.appButtonText}
              secureTextEntry={true}
              color="grey"
              align="center">
              SIGN IN
            </Text>
          </TouchableOpacity>
          {isLoading ? <ActivityLoading size="large" /> : null}
          <Text style={{fontSize: 15, marginTop: 10}}>
            New User! Please SignUP
          </Text>
          <TouchableOpacity
            style={styles.appButtonContainer}
            onPress={() => navigation.navigate('SignUp')}>
            <Text
              style={styles.appButtonText}
              secureTextEntry={true}
              color="grey"
              align="center">
              SIGN UP
            </Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </ScrollView>
  );
};

Login.navigationOptions = navigationData => {
  return {
    headerTitle: 'Login',
  };
};
export default Login;
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
    paddingTop: '5%',
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

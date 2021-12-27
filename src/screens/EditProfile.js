// import React from 'react';
// import {View, Text} from 'react-native';
// const EditProfile = props => {

//   return (
//     <View>
//       <Text>{name}</Text>
//       <Text>{number}</Text>
//       <Text>{address}</Text>
//       <Text>{pincode}</Text>
//     </View>
//   );
// };
// export default EditProfile;
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
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
//import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {postMethod1} from '../services/Apiservices';
//import {putMethod} from '../services/Apiservices';
import {useTheme} from 'react-native-paper';
//import { AuthContext } from '../routes'
import ActivityLoading from '../components/ActivityLoading';
import {Value} from 'react-native-reanimated';
const EditProfile = props => {
  const name1 = props.route.params.name;
  const number1 = props.route.params.phone;
  const address1 = props.route.params.address;
  const pincode1 = props.route.params.pincode;
  const password1 = props.route.params.pwd;

  const [isLoading, setIsLoading] = React.useState(false);
  const [jwt, setJwt] = React.useState('');

  //const { signIn } = React.useContext(AuthContext);

  const doLogin = () => {
    const req = {
      number: number,
      password: password1,
      address: address,
      pinCode: pincode,
      name: name,
    };

    if (number != '') {
      setIsLoading(true);
      postMethod1('/updateUser/' + id, req, jwt)
        .then(response => {
          if (response) {
            //console.warn('login response', response);

            if (response.status == 200) {
              // const user_data = {
              //         token: response.data.token,
              //         userId: response.data.userId,
              //         roles: response.data.roles,
              //         number: response.data.number,
              //     };
              //AsyncStorage.setItem('userInfo', response.data);
              //setInfo(response);
              // signIn(user_data);
              // setIsLoading(false)

              Alert.alert('User Updated Successfully');
              //navigation.navigate('Login');
              props.navigation.goBack();
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

  const [id, setId] = React.useState('');
  const [name, setName] = React.useState(name1);
  const [address, setAddress] = React.useState(address1);
  const [number, setNumber] = React.useState(number1);
  const [pincode, setPincode] = React.useState(pincode1);
  useEffect(() => {
    AsyncStorage.getItem('userId').then(async res => {
     // console.warn('res', res);
      setId(res);

      // setId(res);
    });
    AsyncStorage.getItem('userToken').then(async res => {
     // console.warn('Token', res);
      setJwt(res);

      // setId(res);
    });
  }, []);

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={styles.container}>
        {/* <StatusBar backgroundColor="#fff" barStyle="light-content" /> */}
        <View style={styles.header}>
          <Image
            source={require('../assets/images/login.jpg')}
            resizeMode="contain"
            style={{
              width: 165,
              height: 135,
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
              value={name}
              onChangeText={text => setName(text)}
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
              value={number}
              onChangeText={val => setNumber(val)}
            />
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                color: colors.text,
              },
            ]}>
            Address
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
              // autoCapitalize="none"
              // autoCorrect={false}
              value={address}
              //editable={true}
              onChangeText={text => setAddress(text)}
            />
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                color: colors.text,
              },
            ]}>
            PinCode
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <TextInput
              placeholder="Enter Your PinCode"
              placeholderTextColor="#666666"
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              value={pincode}
              autoCapitalize="none"
              onChangeText={val => setPincode(val)}
              keyboardType={'numeric'}
            />
          </View>

          <TouchableOpacity
            style={styles.appButtonContainer}
            onPress={() => doLogin()}>
            <Text
              style={styles.appButtonText}
              secureTextEntry={true}
              color="grey"
              align="center">
              Edit Profile
            </Text>
          </TouchableOpacity>
          {isLoading ? <ActivityLoading size="large" /> : null}
        </Animatable.View>
      </View>
    </ScrollView>
  );
};
// Login.navigationOptions = {
//   headerTitle: 'Login',
// };

export default EditProfile;
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
    paddingTop: 15,
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

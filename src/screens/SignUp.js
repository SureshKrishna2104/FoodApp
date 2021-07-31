// import * as React from 'react';
// //import { Text, View, StyleSheet, Image ,TextInput,TouchableOpacity} from 'react-native';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   Platform,
//   StyleSheet,
//   StatusBar,
//   Alert,
//   ScrollView,
// } from 'react-native';
// //import axios from 'axios'
// //import * as Animatable from 'react-native-animatable';
// //import LinearGradient from 'react-native-linear-gradient'
// import FontAwesome from 'react-native-vector-icons/FontAwesome5';
// import Feather from 'react-native-vector-icons/Feather';
// import {postMethod} from '../services/Apiservices';
// import {useTheme} from 'react-native-paper';
// import Icon from 'react-native-vector-icons/Feather';
// class SignUp extends React.Component {
//   state = {
//     number: '',
//     pwd: '',
//     address: '',
//     firstname: '',
//     lastname: '',
//     username: '',

//     emailid: '',
//     phonenumber: '',
//   };
//   onChangeHandle(state, value) {
//     this.setState({
//       [state]: value,
//     });
//   }
//   doLogin() {
//     const {number, pwd, address} = this.state;
//     const req = {
//       number: number,
//       password: pwd,
//       address: address,
//     };
//     // axios.post("https://book-online-management.herokuapp.com//create_user/V1.0", req).then(
//     //   res=>{
//     //     this.props.navigation.navigate('SignIn');
//     //     alert("Registered Sucessfully")
//     //     console.log(res)m
//     //   },
//     //   err=>{
//     //     alert("wrong")
//     //   }
//     // )
//     if (number != '') {
//       //setIsLoading(true)
//       postMethod('/signup', req)
//         .then(response => {
//           if (response) {
//             console.warn('signup response', response);

//             if (response.status == 200) {
//               // const user_data = {
//               //         token: response.data.token,
//               //         userId: response.data.userId,
//               //         roles: response.data.roles,
//               //         userName: response.data.userName,
//               //     };

//               // setInfo(response)
//               // signIn(user_data);
//               // setIsLoading(false)

//               Alert.alert('user added successfully');
//               this.props.navigation.navigate('Login');
//             } else if (response.status == 500) {
//               //setIsLoading(false)

//               Alert.alert('Not able to signup, Please try later');
//             }
//             if (response.statuscode == 404) {
//               //setIsLoading(false)

//               Alert.alert('User account already deactivated');
//             }
//           }
//         })
//         .catch(error => {
//           //setIsLoading(false)

//           Alert.alert(
//             'No Internet connection.\n Please check your internet connection \nor try again',
//             error,
//           );
//           console.warn(
//             'No Internet connection.\n Please check your internet connection \nor try again',
//             error,
//           );
//         });
//     } else {
//       //setIsLoading(false)

//       Alert.alert('Username and Password cannot be empty');
//     }
//   }
//   render() {
//     const {number, pwd, address} = this.state;
//     return (
//       <ScrollView>
//         <View style={styles.container}>
//           <View style={styles.header}>
//             <Text style={styles.text_header}>Register Now!</Text>
//           </View>

//           <View style={styles.footer}>
//             <Text style={styles.text_footer}>Phone Number</Text>
//             <View style={styles.action}>
//               <Icon name="user" color="#05375a" />
//               <TextInput
//                 style={styles.textInput}
//                 placeholder="Enter Phone Number"
//                 placeholderTextColor="#333"
//                 value={number}
//                 onChangeText={value => this.onChangeHandle('number', value)}
//               />
//             </View>
//             <Text style={styles.text_footer}>Password</Text>
//             <View style={styles.action}>
//               <Feather name="lock" color="#05375a" />
//               <TextInput
//                 style={styles.textInput}
//                 placeholder="Enter Your Password"
//                 // secureTextEntry={true}
//                 placeholderTextColor="#333"
//                 value={pwd}
//                 onChangeText={value => this.onChangeHandle('pwd', value)}
//               />
//             </View>
//             <Text style={styles.text_footer}>Address</Text>
//             <View style={styles.action}>
//               <FontAwesome name="user" color="#05375a" />
//               <TextInput
//                 style={styles.textInput}
//                 placeholder="Enter Your Address"
//                 placeholderTextColor="#333"
//                 value={address}
//                 onChangeText={value => this.onChangeHandle('address', value)}
//               />
//             </View>

//             <TouchableOpacity style={styles.appButtonContainer}>
//               <Text
//                 style={styles.appButtonText}
//                 secureTextEntry={true}
//                 color="grey"
//                 align="center"
//                 onPress={() => this.doLogin()}>
//                 SignUp
//               </Text>
//             </TouchableOpacity>
//             <Text>{}</Text>
//             <Text>Already have an account please signin</Text>
//             <TouchableOpacity
//               style={styles.appButtonContainer}
//               onPress={() => this.props.navigation.navigate('Login')}>
//               <Text
//                 style={styles.appButtonText}
//                 secureTextEntry={true}
//                 color="grey"
//                 align="center">
//                 SignIn
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     );
//   }
// }
// SignUp.navigationOptions = navigationData => {
//   return {
//     headerTitle: 'SignUp',
//   };
// };
// export default SignUp;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     paddingHorizontal: 20,
//     // paddingBottom: 10,
//   },
//   footer: {
//     flex: 3,
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     paddingHorizontal: 20,
//     paddingVertical: 30,
//   },
//   text_header: {
//     color: '#0f73ee',
//     fontWeight: 'bold',
//     fontSize: 30,
//   },
//   text_footer: {
//     color: '#05375a',
//     fontSize: 18,
//   },
//   action: {
//     flexDirection: 'row',
//     marginTop: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f2f2f2',
//     paddingBottom: 5,
//   },
//   appButtonContainer: {
//     elevation: 8,
//     backgroundColor: '#0f73ee',
//     borderRadius: 10,
//     paddingVertical: 10,
//     paddingHorizontal: 12,
//   },
//   appButtonText: {
//     fontSize: 18,
//     color: '#fff',
//     fontWeight: 'bold',
//     alignSelf: 'center',
//     textTransform: 'uppercase',
//   },
//   // actionError: {
//   //     flexDirection: 'row',
//   //     marginTop: 10,
//   //     borderBottomWidth: 1,
//   //     borderBottomColor: '#FF0000',
//   //     paddingBottom: 5
//   // },
//   textInput: {
//     flex: 1,
//     marginTop: Platform.OS === 'ios' ? 0 : -12,
//     paddingLeft: 10,
//     color: '#05375a',
//   },
//   //   signinBtn:{
//   //     textAlign:"center",
//   //     backgroundColor:"#6fbbd3",
//   //     paddingVertical:10

//   // },
//   //   errorMsg: {
//   //       color: '#FF0000',
//   //       fontSize: 14,
//   //   },
//   //   button: {
//   //       alignItems: 'center',
//   //       marginTop: 50
//   //   },
//   //   signIn: {
//   //       width: '100%',
//   //       height: 50,
//   //       justifyContent: 'center',
//   //       alignItems: 'center',
//   //       borderRadius: 10
//   //   },
//   //   textSign: {
//   //       fontSize: 18,
//   //       fontWeight: 'bold'
//   //   }
// });
// // const styles = StyleSheet.create({
// //   container:{
// //     height:"100%",
// //     alignItems:"center",
// //     justifyContent:"center"
// //   },
// //   formWrapper:{
// //     width:"90%"
// //   },
// //   action:{
// //    marginBottom: 10
// //   },
// //   textInput:{
// //    backgroundColor:"#ddd",
// //    height:40,
// //    paddingHorizontal: 10,
// //    color:"#333"
// //   },
// //   welcomeText:{
// //           textAlign:"center",
// //           marginBottom:30,
// //           fontSize:24,
// //           fontWeight:"bold"
// //   },
// //   signinBtn:{
// //      backgroundColor:"blue",
// //      paddingVertical:10

// //   },
// //   siginText:{
// //      textAlign:"center",
// //      color:"#fff",
// //      fontSize:18,
// //      fontWeight:"bold"

// //   }
// // })
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
//import {postMethod} from '../services/Apiservices';
import {postMethod} from '../services/Apiservices';
import {useTheme} from 'react-native-paper';
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

  const [isLoading, setIsLoading] = React.useState(false);

  //const { signIn } = React.useContext(AuthContext);

  const setInfo = async data => {
    console.warn('dataaaa-', data.data.userId);
    const jsonValue = JSON.stringify(data.data);
    const id = JSON.stringify(data.data.userId);
    await AsyncStorage.setItem('userInfo', jsonValue);
    await AsyncStorage.setItem('userId', id);
  };

  const doLogin = () => {
    const req = {
      name: data.name,
      number: data.number,
      password: data.password,
      address: data.address,
      pinCode: data.pincode,
    };

    if (
      data.number != '' &&
      data.name != '' &&
      data.password != '' &&
      data.address != '' &&
      data.pincode != ''
    ) {
      setIsLoading(true);
      postMethod('/signup', req)
        .then(response => {
          if (response) {
            console.warn('login response', response);

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

              Alert.alert('User Added Successfully');
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
  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={styles.container}>
        {/* <StatusBar backgroundColor="#009387" barStyle="light-content" /> */}
        <View style={styles.header}>
          <Text style={styles.text_header}>RegisterNow!</Text>
          <Image
            source={require('../assets/images/login_screen.jpg')}
            resizeMode="contain"
            style={{
              width: 135,
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
            PinCode
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
              placeholder="Enter Your PinCode"
              placeholderTextColor="#666666"
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={val => handleValidPinCode(val)}
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
              SIGN UP
            </Text>
          </TouchableOpacity>
          {isLoading ? <ActivityLoading size="large" /> : null}

          <Text> </Text>
          <Text>Already have an account! Please SignIn</Text>
          <TouchableOpacity
            style={styles.appButtonContainer}
            onPress={() => navigation.navigate('Login')}>
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
    paddingTop: 50,
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

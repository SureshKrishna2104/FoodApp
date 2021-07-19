import * as React from 'react';
//import { Text, View, StyleSheet, Image ,TextInput,TouchableOpacity} from 'react-native';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  ScrollView,
} from 'react-native';
//import axios from 'axios'
//import * as Animatable from 'react-native-animatable';
//import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import {postMethod} from '../services/Apiservices';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
class SignUp extends React.Component {
  state = {
    number: '',
    pwd: '',
    address: '',
    firstname: '',
    lastname: '',
    username: '',

    emailid: '',
    phonenumber: '',
  };
  onChangeHandle(state, value) {
    this.setState({
      [state]: value,
    });
  }
  doLogin() {
    const {number, pwd, address} = this.state;
    const req = {
      number: number,
      password: pwd,
      address: address,
    };
    // axios.post("https://book-online-management.herokuapp.com//create_user/V1.0", req).then(
    //   res=>{
    //     this.props.navigation.navigate('SignIn');
    //     alert("Registered Sucessfully")
    //     console.log(res)m
    //   },
    //   err=>{
    //     alert("wrong")
    //   }
    // )
    if (number != '') {
      //setIsLoading(true)
      postMethod('/signup', req)
        .then(response => {
          if (response) {
            console.warn('signup response', response);

            if (response.status == 200) {
              // const user_data = {
              //         token: response.data.token,
              //         userId: response.data.userId,
              //         roles: response.data.roles,
              //         userName: response.data.userName,
              //     };

              // setInfo(response)
              // signIn(user_data);
              // setIsLoading(false)

              Alert.alert('user added successfully');
              this.props.navigation.navigate('Login');
            } else if (response.status == 500) {
              //setIsLoading(false)

              Alert.alert('Not able to signup, Please try later');
            }
            if (response.statuscode == 404) {
              //setIsLoading(false)

              Alert.alert('User account already deactivated');
            }
          }
        })
        .catch(error => {
          //setIsLoading(false)

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
      //setIsLoading(false)

      Alert.alert('Username and Password cannot be empty');
    }
  }
  render() {
    const {number, pwd, address} = this.state;
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.text_header}>Register Now!</Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.text_footer}>Phone Number</Text>
            <View style={styles.action}>
              <Icon name="user" color="#05375a" />
              <TextInput
                style={styles.textInput}
                placeholder="Enter Phone Number"
                placeholderTextColor="#333"
                value={number}
                onChangeText={value => this.onChangeHandle('number', value)}
              />
            </View>
            <Text style={styles.text_footer}>Password</Text>
            <View style={styles.action}>
              <Feather name="lock" color="#05375a" />
              <TextInput
                style={styles.textInput}
                placeholder="Enter Your Password"
                // secureTextEntry={true}
                placeholderTextColor="#333"
                value={pwd}
                onChangeText={value => this.onChangeHandle('pwd', value)}
              />
            </View>
            <Text style={styles.text_footer}>Address</Text>
            <View style={styles.action}>
              <FontAwesome name="user" color="#05375a" />
              <TextInput
                style={styles.textInput}
                placeholder="Enter Your Address"
                placeholderTextColor="#333"
                value={address}
                onChangeText={value => this.onChangeHandle('address', value)}
              />
            </View>

            <TouchableOpacity style={styles.appButtonContainer}>
              <Text
                style={styles.appButtonText}
                secureTextEntry={true}
                color="grey"
                align="center"
                onPress={() => this.doLogin()}>
                SignUp
              </Text>
            </TouchableOpacity>
            <Text>{}</Text>
            <Text>Already have an account please signin</Text>
            <TouchableOpacity
              style={styles.appButtonContainer}
              onPress={() => this.props.navigation.navigate('Login')}>
              <Text
                style={styles.appButtonText}
                secureTextEntry={true}
                color="grey"
                align="center">
                SignIn
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}
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
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    // paddingBottom: 10,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
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
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#0f73ee',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  // actionError: {
  //     flexDirection: 'row',
  //     marginTop: 10,
  //     borderBottomWidth: 1,
  //     borderBottomColor: '#FF0000',
  //     paddingBottom: 5
  // },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  //   signinBtn:{
  //     textAlign:"center",
  //     backgroundColor:"#6fbbd3",
  //     paddingVertical:10

  // },
  //   errorMsg: {
  //       color: '#FF0000',
  //       fontSize: 14,
  //   },
  //   button: {
  //       alignItems: 'center',
  //       marginTop: 50
  //   },
  //   signIn: {
  //       width: '100%',
  //       height: 50,
  //       justifyContent: 'center',
  //       alignItems: 'center',
  //       borderRadius: 10
  //   },
  //   textSign: {
  //       fontSize: 18,
  //       fontWeight: 'bold'
  //   }
});
// const styles = StyleSheet.create({
//   container:{
//     height:"100%",
//     alignItems:"center",
//     justifyContent:"center"
//   },
//   formWrapper:{
//     width:"90%"
//   },
//   action:{
//    marginBottom: 10
//   },
//   textInput:{
//    backgroundColor:"#ddd",
//    height:40,
//    paddingHorizontal: 10,
//    color:"#333"
//   },
//   welcomeText:{
//           textAlign:"center",
//           marginBottom:30,
//           fontSize:24,
//           fontWeight:"bold"
//   },
//   signinBtn:{
//      backgroundColor:"blue",
//      paddingVertical:10

//   },
//   siginText:{
//      textAlign:"center",
//      color:"#fff",
//      fontSize:18,
//      fontWeight:"bold"

//   }
// })

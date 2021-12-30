import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';

const Button = ({text, onPress, containerStyles}) => {
  return (
    <View>
      <Pressable style={[styles.button, containerStyles]} onPress={onPress}>
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    height: 50,
    marginVertical: 10,
    backgroundColor: '#6FC3F7',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#6FC3F7',
  },
  text: {
    fontSize: 16,
    color:'#fff'
  },
});
export default Button;

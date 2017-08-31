import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Rest from './rest.js';

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity style={ buttonStyle }>
      <Text style={textStyle}>
        Press
      </Text>
    </TouchableOpacity>
  );
};
//j
const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 10
  },
  buttonStyle: {
    borderWidth: 1,
    borderColor: 'blue',
    borderStyle: 'solid',
    borderRadius: 10,
    backgroundColor: 'transparent'
  }
};

function pressDis() {
  alert("Button Pressed");
}

function restTest() {
  return fetch('https://spring-clock.herokuapp.com/hello/showjobs');
}

export default Button;

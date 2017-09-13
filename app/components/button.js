import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Rest from './rest.js';

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  function clockIn(id) {
   fetch('https://spring-clock.herokuapp.com/rest/clockin/' + id)
     .then((responseJson) => {
       return responseJson;
     })
     .catch((error) => {
       console.error(error);
     });
  }

  return (
    <TouchableOpacity style={ buttonStyle } onPress={() => clockIn(2)}>
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

function clockIn(id) {
 fetch('https://spring-clock.herokuapp.com/rest/clockin/' + id)
   .then((response) => response.json())
   .then((responseJson) => {
     return responseJson;
   })
   .catch((error) => {
     console.error(error);
   });
}

function pressDis() {
  alert("Button Pressed");
}


export default Button;

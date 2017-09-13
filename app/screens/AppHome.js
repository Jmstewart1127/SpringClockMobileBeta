import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Rest               from '../components/rest.js'
import Button             from '../components/button.js';
import MyTextInput        from '../components/textInput.js';
import EmployeeList       from '../components/EmployeeList.js';

class AppHome extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };


   clockIn(id) {
    fetch('https://spring-clock.herokuapp.com/rest/clockin/' + id)
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <MyTextInput/>
        <EmployeeList/>
        <Button/>
      </View>
    );
  }
}

export default AppHome;

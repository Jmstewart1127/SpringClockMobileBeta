import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Button             from '../components/button.js';
import MyTextInput        from '../components/textInput.js';
import EmployeeList       from '../components/EmployeeList.js';

class AppHome extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <MyTextInput/>
        <EmployeeList/>
      </View>
    );
  }
}

export default AppHome;

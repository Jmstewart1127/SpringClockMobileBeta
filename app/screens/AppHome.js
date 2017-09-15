import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Rest               from '../components/rest.js'
import Button             from '../components/button.js';
import MyTextInput        from '../components/textInput.js';
import EmployeeList       from '../components/EmployeeList.js';

class AppHome extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "Enter ID" };
  }
  static navigationOptions = {
    title: 'Welcome',
  };

  render() {
    let userId = this.state.text;
    const { navigate } = this.props.navigation;
    return (
      <View>
        <MyTextInput
          onChangeText={(text) => this.setState({text:text})}
        />
        <EmployeeList/>
        <Button
          id={ userId }
        />
      </View>
    );
  }
}

export default AppHome;

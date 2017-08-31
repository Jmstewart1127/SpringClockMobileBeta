import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import axios from 'axios';

import Button             from '../components/button.js';
import MyTextInput        from '../components/textInput.js';
import Rest               from '../components/rest.js';

class AppHome extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
      <MyTextInput/>
      <Button
        onPress={ Rest.clockInTest() }
        title="Sup"
      />
      </View>
    );
  }
}
//
  // function clockInTest() {
  //   axios.post('https://spring-clock.herokuapp.com/rest/clockin/12')
  //     .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // };

export default AppHome;

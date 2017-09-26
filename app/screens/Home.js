import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, AppRegistry, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Rest               from '../components/rest.js'
import Button             from '../components/button.js';
import MyTextInput        from '../components/textInput.js';
import EmployeeList       from '../components/EmployeeList.js';
import Clock              from '../components/Clock.js'
import Location           from '../components/Location.js'
import AddressLocation    from '../components/AddressLocation.js'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "Enter ID" };
  }
  static navigationOptions = {
    title: 'Welcome',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={ styles.outerScreen }>
          <Text style={ styles.componentPadding }></Text>
          <EmployeeList></EmployeeList>
          <Text style={ styles.componentPadding }></Text>
          <Text style={ styles.componentPadding }></Text>
    
      </View>
    );
  }
}

const styles = {
  screenStyle: {
    padding: 10,
    flexDirection: 'row',
    width: 1000,
  },

  componentPadding: {
    padding: 5,
  },

  labelStyle: {
    paddingLeft: 10,
    paddingTop: 10,
  },

  outerScreen: {

  }
}

export default Home;

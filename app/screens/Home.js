import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, AppRegistry, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Button             from '../components/Button.js';
import MyTextInput        from '../components/TextInput.js';
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
      <View style={ styles.screenStyle }>
        <Text style={ styles.labelStyle }>Enter Employee ID</Text>
        <Clock></Clock>
      </View>
    );
  }
}

const styles = {
  screenStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'transparent',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 0,
    elevation: 15,
    paddingBottom: 10,
    marginBottom: 15,
  },

  componentPadding: {
    padding: 5,
  },

  labelStyle: {
    textAlign: 'center',
    paddingTop: 10,
  },

}

export default Home;

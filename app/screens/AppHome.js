import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AppRegistry, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Button             from '../components/Button.js';
import MyTextInput        from '../components/TextInput.js';
import EmployeeList       from '../components/EmployeeList.js';
import Clock              from '../components/Clock.js';
import Location           from '../components/Location.js';
import AddressLocation    from '../components/AddressLocation.js';
import EmployeeStatus     from '../components/EmployeeStatus.js';
import Refresh            from '../components/Refresh.js';

class AppHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Enter ID",
      userId: [],
    };
  }
  static navigationOptions = {
    title: 'Welcome',
  };

  async _userIdTrue() {
      let context = this;
      try {
         let value = await AsyncStorage.getItem('userId');
         if (value != null){
           this.setState({
             userId: true
           });
         }
         else {
           this.setState({
             userId: false
           });
        }
      } catch (error) {
        console.log(error);
      }
  }

  componentDidMount() {
    this._userIdTrue();
    console.log('ui ' + this.state.userId);
  }

  render() {
    if (!this.state.userId) {
      return (
        <View style={ styles.outerScreen }>
          <Text style={ styles.labelStyle }>Enter Employee ID</Text>
          <Clock></Clock>
        </View>
      );
    } else {
    const { navigate } = this.props.navigation;
      return (
        <View style={ styles.outerScreen }>
          <Text style={ styles.componentPadding }></Text>
          <EmployeeStatus></EmployeeStatus>
          <Text style={ styles.componentPadding }></Text>
          <Text style={ styles.componentPadding }></Text>
        </View>
      );
    }
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

  noUserId: {
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    padding: 30,
  },
}

export default AppHome;

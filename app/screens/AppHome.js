import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AppRegistry, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Button             from '../components/Button';
import MyTextInput        from '../components/TextInput';
import EmployeeList       from '../components/EmployeeList';
import Clock              from '../components/Clock';
import Location           from '../components/Location';
import AddressLocation    from '../components/AddressLocation';
import EmployeeStatus     from '../components/EmployeeStatus';
import Refresh            from '../components/Refresh';
import Jobs               from '../components/Jobs';

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
         } else {
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
  }

  render() {
    if (!this.state.userId) {
      return (
        <View style={ styles.outerScreen }>
          <Text style={ styles.labelStyle }>Enter Employee ID</Text>
          <Clock></Clock>
          <Refresh
            func = { this._userIdTrue() }
          ></Refresh>
        </View>
      );
    } else {
    const { navigate } = this.props.navigation;
      return (
        <View style={ styles.outerScreen }>
          <Text style={ styles.componentPadding }></Text>
          <Jobs></Jobs>
          <EmployeeStatus></EmployeeStatus>
          <Text style={ styles.componentPadding }></Text>
          <Text style={ styles.componentPadding }></Text>
          <TouchableOpacity
            style={ styles.changeId }
            onPress={() => navigate('Home')}
          >
            <Text>Change ID</Text>
          </TouchableOpacity>
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

  changeId: {
    flexDirection: 'row',
    marginTop: 160,
    justifyContent: 'center',
  },

  noUserId: {
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    padding: 30,
  },
}

export default AppHome;

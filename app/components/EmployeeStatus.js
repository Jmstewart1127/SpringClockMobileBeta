import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View, ScrollView, AsyncStorage, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Location from '../components/Location.js';

class EmployeeStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user: '',
      bizId: '',
      weekTimeInHours: '',
      payRate: '',
      totalPay: '',
      clocked: '',
    }
  }

  async _getUserData() {
    let id = await AsyncStorage.getItem('userId');
    if (id === null) {
      return "Enter ID";
    } else {
    fetch('https://spring-clock.herokuapp.com/rest/get/employee/' + id)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          user: responseJson["0"].user,
          bizId: responseJson["0"].bizId,
          weekTimeInHours: responseJson["0"].weekTimeInHours,
          payRate: responseJson["0"].payRate,
          totalPay: responseJson["0"].totalPay,
          clocked: responseJson["0"].clocked,
        });
        this._refreshUserData();
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }

  async _refreshUserData() {
    let id = await AsyncStorage.getItem('userId');
    fetch('https://spring-clock.herokuapp.com/rest/status/refresh/' + id)
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    this._getUserData();
  }

  render() {
    let bizId = this.state.bizId;
    const myIcon = (<Icon name='refresh' size={33} color='#3457E6' />);
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={ styles.viewStyle }>
        <Location
          bizId = { bizId }
          user = { this.state.user }
          weekTimeInHours = { this.state.weekTimeInHours }
          payRate = { this.state.payRate }
          totalPay = { this.state.totalPay }
          clockStatus = { this.state.clocked }
        ></Location>
        <TouchableOpacity style={ styles.buttonStyle }
           onPress={() => this._getUserData()}>
          <Text style={ styles.iconStyle }>
            { myIcon }
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  viewStyle: {
    marginLeft: 5,
    marginRight: 5,
  },

  buttonStyle: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'blue',
    borderStyle: 'solid',
    borderRadius: 50,
    backgroundColor: 'transparent',
    width: 66,
    height: 66,
    marginTop: 20,
  },

  textStyle: {
    color: 'white',
    marginTop: 10,
  },

  iconStyle: {
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },

}

export default EmployeeStatus;

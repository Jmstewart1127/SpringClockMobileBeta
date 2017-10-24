import React, { Component } from 'react';
import { ActivityIndicator, ListView,Text, View, ScrollView, AsyncStorage, TouchableOpacity } from 'react-native';
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
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }

  componentDidMount() {
    this._getUserData();
  }

  render() {
    const myIcon = (<Icon name='refresh' size={33} color='#3457E6' />);
    const { func } = this.props;
    return (
      <View>
        <TouchableOpacity
           onPress={() => this.props.func}>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {

  buttonStyle: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'blue',
    borderStyle: 'solid',
    borderRadius: 50,
    backgroundColor: 'transparent',
    width: 66,
    height: 66,
  },

  iconStyle: {
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  }

}

export default EmployeeStatus;

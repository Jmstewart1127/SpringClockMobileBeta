import React, { Component } from 'react';
import { View, AsyncStorage, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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

  async _getUserData(jobId) {
    let id = await AsyncStorage.getItem('userId');
    if (id === null) {
      return "Enter ID";
    } else {
    fetch('https://spring-clock.herokuapp.com/rest/mobile/get/employee/' + id)
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
    return (
      <View>
        <TouchableOpacity
           onPress={() => this.props.func}>
        </TouchableOpacity>
      </View>
    );
  }
}

export default EmployeeStatus;

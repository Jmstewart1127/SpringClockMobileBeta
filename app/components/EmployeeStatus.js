import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View, AsyncStorage, TouchableOpacity } from 'react-native';
import { Avatar, Card, ListItem, Button } from 'react-native-elements'
import Location from '../components/Location';

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
      jobs: [],
    }
  }

  async _getUserData() {
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
      .then(() => this._refreshUserData())
      .catch((error) => {
        console.error(error);
      });
    }
  }

  async _refreshUserData() {
    let id = await AsyncStorage.getItem('userId');
    fetch('https://spring-clock.herokuapp.com/rest/mobile/status/refresh/' + id)
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
    const totalPay = Math.round(this.state.totalPay * 100) / 100;
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <Card
        title={this.state.user}
      >
        <View style={ styles.viewStyle }>
          <Location
            user = { this.state.user }
            weekTimeInHours = { this.state.weekTimeInHours }
            payRate = { this.state.payRate }
            totalPay = { totalPay }
            clockStatus = { this.state.clocked }
          />
          <Button
            icon={{name: 'refresh'}}
            title={'Refresh Status'}
            onPress={() => this._getUserData()}
            containerStyle={{ marginTop: 20 }}
          />
        </View>
      </Card>
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

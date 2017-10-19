import React, { Component }                        from 'react';
import { ActivityIndicator, ListView, Text, View, ScrollView, AsyncStorage } from 'react-native';
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
        console.log(responseJson);

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
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View>
          <Text style={ styles.listStyle }>
            <Text style={ styles.userStyle } >
              {this.state.user + " "}
            </Text>

            <Text style={ styles.listStyle } >
              {"Business ID: " + this.state.bizId},
              {"Week Time: " + this.state.weekTimeInHours},
              {"Pay Rate: " + this.state.payRate},
              {"Period Pay: " + this.state.totalPay},
              {"Clock In Status: " + this.state.clocked}
            </Text>
          </Text>
          <Location
            bizId = { bizId }
          ></Location>
      </View>
    );
  }
}

const styles = {
  listStyle: {
    textAlign: 'left',
    borderRadius: 0,
    borderWidth: 1,
    backgroundColor: '#F3F1F1',
    padding: 10,
  },

  userStyle: {
    textAlign: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'blue',
    fontWeight: 'bold',
    fontSize: 18,
  }

}

export default EmployeeStatus;

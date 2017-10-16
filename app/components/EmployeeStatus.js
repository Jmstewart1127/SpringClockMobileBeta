import React, { Component }                        from 'react';
import { ActivityIndicator, ListView, Text, View, ScrollView } from 'react-native';

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

  async _getUserId() {
    try {
      const value = await AsyncStorage.getItem('userId');
      if (value !== null){
        console.log("async test: " + value);
        return JSON.parse(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  componentWillMount() {
    fetch('https://spring-clock.herokuapp.com/rest/get/employee/' + this._getUserId())
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          user: responseJson.user,
          bizId: responseJson.bizId,
          weekTimeInHours: responseJson.weekTimeInHours,
          payRate: responseJson.payRate,
          totalPay: responseJson.totalPay,
          clocked: responseJson.clocked,
        });
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
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

import React, { Component }                        from 'react';
import { ActivityIndicator, ListView,
  Text, View, ScrollView,
  AsyncStorage, TouchableOpacity } from 'react-native';
import Location from '../components/Location.js';
import FontAwesome, { Icons } from 'react-native-fontawesome';

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
        <Text style={ styles.userStyle }>
          {this.state.user + " "}
        </Text>
        <Text style={ styles.listStyle }>
          {"Week Time: " + this.state.weekTimeInHours},
        </Text>
        <Text style={ styles.listStyle }>
          {"Pay Rate: " + this.state.payRate},
        </Text>
        <Text style={ styles.listStyle }>
          {"Period Pay: " + this.state.totalPay},
        </Text>
        <Text style={ styles.listStyle }>
          {"Clock In Status: " + this.state.clocked}
        </Text>

        <Location
          bizId = { bizId }
        ></Location>
        <TouchableOpacity style={ styles.buttonStyle }
           onPress={() => this._getUserData()}>
          <Text style={ styles.textStyle }>
            <FontAwesome>{ Icons.home }</FontAwesome>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  listStyle: {
    textAlign: 'left',
    borderRadius: 0,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#F3F1F1',
    padding: 10,
  },

  userStyle: {
    alignContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
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
  },

  textStyle: {
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  }

}

export default EmployeeStatus;

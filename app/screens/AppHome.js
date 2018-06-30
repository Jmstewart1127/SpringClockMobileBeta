import React, { Component } from 'react';
import { AsyncStorage, Text, View } from 'react-native';
import EnterIdForm from '../components/EnterIdForm';
import EmployeeStatus from '../components/EmployeeStatus';
import Refresh from '../components/Refresh';

class AppHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Enter ID",
      userId: "",
    };
  }
  static navigationOptions = {
    title: 'Welcome',
  };

  async _userIdTrue() {
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
        <View style={ styles.noUserIdStyle }>
          <Text style={ styles.labelStyle }>Enter Employee ID</Text>
          <EnterIdForm/>
          <Refresh
            func = { this._userIdTrue() }
          />
        </View>
      );
    } else {
      return (
        <View>
          <EmployeeStatus/>
        </View>
      );
    }
  }
}

const styles = {
  noUserIdStyle: {
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

  labelStyle: {
    textAlign: 'center',
    paddingTop: 10,
  },
}

export default AppHome;

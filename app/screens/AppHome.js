import React, { Component } from 'react';
import { AsyncStorage, Text, TouchableOpacity, View } from 'react-native';
import EnterIdForm from '../components/EnterIdForm';
import EmployeeStatus from '../components/EmployeeStatus';
import Refresh from '../components/Refresh';
import Jobs from '../components/Jobs';

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
          <EnterIdForm/>
          <Refresh
            func = { this._userIdTrue() }
          />
        </View>
      );
    } else {
    const { navigate } = this.props.navigation;
      return (
        <View style={ styles.outerScreen }>
          <Text style={ styles.componentPadding }/>
          <Jobs/>
          <Text style={ styles.componentPadding }/>
          <EmployeeStatus/>
          <Text style={ styles.componentPadding }/>
          <Text style={ styles.componentPadding }/>
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
  outerScreen: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
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

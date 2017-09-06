import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View } from 'react-native';

class EmployeeList extends Component {
  state = { clock: [] };

  componentWillMount() {
    fetch('https://spring-clock.herokuapp.com/rest/employees')
     .then((response) => response.json())
     .then((responseData) => this.setState({ clock: responseData }));
  }

  renderEmployee() {
    return this.state.clock.map(clock =>
      <Text key={
        clock.id
      } clock={clock} />
    );
  }

  render() {
    return (
      <View>
        {this.renderEmployee()}
      </View>
    );
  }
}

export default EmployeeList;

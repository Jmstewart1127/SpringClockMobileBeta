import React, { Component } from 'react';

import { StyleSheet, Text, View, AppRegistry } from 'react-native';

import Button from '../components/button.js';

class tesstScreen extends Component {
  static navigationOptions = {
    title: "Hello",
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
      <Button
        title="Go back"
        onPress={() => goBack()}
      />
      </View>
    );
  }
}

export default tesstScreen;

import React from 'react';

import { StyleSheet, Text, View, AppRegistry } from 'react-native';

import Button from '../components/button.js';

class ProfileScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.name,
  });
  render() {
    const { goBack } = this.props.navigation;
    return (
      <Button
        title="Go back"
        onPress={() => goBack()}
      />
    );
  }
}


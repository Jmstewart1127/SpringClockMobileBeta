import React from 'react';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';

import { StackNavigator } from 'react-navigation';
import Button from '../components/button.js';

class AppHome extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
      <Button
        title="Go to Jane's profile"
        onPress={() => navigate('Profile')}
        title="Sup"
      />
      </View>
    );
  }
}



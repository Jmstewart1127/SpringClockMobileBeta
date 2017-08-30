import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, AppRegistry } from 'react-native';

import { StackNavigator } from 'react-navigation';
import Button             from '../components/button.js';
import MyTextInput        from '../components/textInput.js';

class AppHome extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
      <MyTextInput
        multiline = {false}
        numberOfLines = {1}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
      <Button
        title="Go to Jane's profile"
        onPress={() => navigate('Profile')}
        title="Sup"
      />
      </View>
    );
  }
}

export default AppHome;

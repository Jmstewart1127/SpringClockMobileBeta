import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Tabs   from './app/config/router.js';
import Button from './app/components/button.js';

import AppHome from './app/screens/AppHome';

export default class App extends React.Component {
    static navigationOptions = {
      title: 'Welcome'
  };
  render() {
    return (
      <View style={styles.container}>
        <Tabs/>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Button/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function restTest() {
  return alert("yo");
}

const SpringClockMobile = StackNavigator({ 
  Other: { screen:App }
});

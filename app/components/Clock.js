import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, AppRegistry } from 'react-native';

import Button                from '../components/Button.js';
import MyTextInput           from '../components/TextInput.js';
import Location              from '../components/Location.js';
import AddressLocation       from '../components/AddressLocation.js';


class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "Enter ID", };
  }

  render() {
    let userId = this.state.text;
    return(
      <View style={ styles.screenStyle }>
        <MyTextInput
          onChangeText={(text) => this.setState({text:text})}
        ></MyTextInput>
        <Button
          id = { userId }
        />
        <Text
          style={ styles.componentPadding }
        ></Text>
      </View>
    );
  }
}

const styles = {
  screenStyle: {
    padding: 10,
    flexDirection: 'row',
    width: 1000,
  },

  componentPadding: {
    padding: 5,
  },

  labelStyle: {
    paddingLeft: 10,
    paddingTop: 10,
  },

  outerScreen: {

  }
}

export default Clock;

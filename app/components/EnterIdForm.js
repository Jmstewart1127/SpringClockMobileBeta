import React, { Component } from 'react';
import { Text, View  } from 'react-native';
import Button from './Button';
import MyTextInput from './TextInput';

class EnterIdForm extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "Enter ID", };
  }

  render() {
    return(
      <View style={ styles.screenStyle }>
        <MyTextInput
          onChangeText={(text) => this.setState({text:text})}
        />
        <Text
          style={ styles.buttonPadding }
        />
        <Button
          id = { this.state.text }
        />
        <Text
          style={ styles.componentPadding }
        />
      </View>
    );
  }
}

const styles = {
  screenStyle: {
    padding: 10,
    flexDirection: 'column',
  },

  componentPadding: {
    padding: 5,
  },

  buttonPadding: {
    paddingTop: 5,
  },

  labelStyle: {
    paddingLeft: 10,
    paddingTop: 10,
  },

}

export default EnterIdForm;

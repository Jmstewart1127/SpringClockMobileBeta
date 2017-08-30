import React, { Component, state } from 'react';
import { View, TextInput, AppRegistry } from 'react-native';

class MyTextInput extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = { text: "Enter ID", };
  // }

  render() {
    return (
      <TextInput
        {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
        editable = {true}
        maxLength = {40}
      />
    );
  }
}

export default MyTextInput;
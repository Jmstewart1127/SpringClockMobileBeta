import React, { Component } from 'react';
import { TextInput } from 'react-native';

class MyTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "Enter ID" };
  }

  render() {
    return (
      <TextInput
        style={styles.textInputStyle}
        {...this.props}
        editable = { true }
        maxLength = { 40 }
      />
    );
  }
}

const styles = {
  textInputStyle: {
	borderColor: 'grey',
	borderWidth: 1,
	borderRadius: 10,
	height: 40,
	justifyContent: 'center',
	paddingLeft: 4,
  width: 210,
  marginLeft: 'auto',
  marginRight: 'auto',
  }
}

export default MyTextInput;

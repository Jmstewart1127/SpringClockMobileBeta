import React, { Component, state } from 'react';
import { View, TextInput, AppRegistry } from 'react-native';

class MyTextInput extends Component {

  constructor(props) {
    super(props);
    this.state = { text: "Enter ID" };
  }

  render() {
    return (
      <TextInput
        style={styles.textInputStyle}
        {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
        editable = {true}
        maxLength = {40}
        ref= {(el) => { this.username = el; }}
        onChangeText={(username) => this.setState({username})}
        value={this.state.username}
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
	paddingLeft: 4
  }
}

export default MyTextInput;

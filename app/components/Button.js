import React, { Component } from 'react';
import { Text, TouchableOpacity, AsyncStorage } from 'react-native';
import Toast from '../modules/Toast';


class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
    };
  }

  async _onPressButton(id) {
    try {
      await AsyncStorage.setItem('userId', id);
      Toast.show('ID Saved', 1000);
    } catch (error) {
        console.error(error)
    }
  }

  render() {
    return (
      <TouchableOpacity style={ styles.buttonStyle }
         onPress={() => this._onPressButton(this.props.id)}>
        <Text style={styles.textStyle}>
          Save
        </Text>
      </TouchableOpacity>
    );
  }
}
  const styles = {
    textStyle: {
      alignSelf: 'center',
      color: '#007aff',
      fontSize: 16,
      fontWeight: '600',
      paddingTop: 10,
      paddingBottom: 10,
      paddingRight: 10,
      paddingLeft: 10,
      borderRadius: 10
    },
    buttonStyle: {
      borderWidth: 1,
      borderColor: 'blue',
      borderStyle: 'solid',
      borderRadius: 10,
      backgroundColor: 'transparent',
      width: '25%',
      marginLeft: 'auto',
      marginRight: 'auto',
    }
  }

export default Button;

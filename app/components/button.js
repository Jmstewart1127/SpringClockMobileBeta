import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
  }

  _clockIn(id) {
   fetch('https://spring-clock.herokuapp.com/rest/clockin/' + id)
     .then((responseJson) => {
       return responseJson;
     })
     .catch((error) => {
       console.error(error);
     });
  }

  _pressDis() {
    alert("Button Pressed");
  }

  render() {
    return (
      <TouchableOpacity style={ styles.buttonStyle } onPress={() => this._clockIn(2)}>
        <Text style={styles.textStyle}>
          Press
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
      backgroundColor: 'transparent'
    }
  }


export default Button;

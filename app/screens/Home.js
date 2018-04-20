import React, { Component } from 'react';
import { Text, View } from 'react-native';
import EnterIdForm from '../components/EnterIdForm'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "Enter ID" };
  }
  static navigationOptions = {
    title: 'Welcome',
  };

  render() {
    return (
      <View style={ styles.screenStyle }>
        <Text style={ styles.labelStyle }>Enter Employee ID</Text>
        <EnterIdForm/>
      </View>
    );
  }
}

const styles = {
  screenStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'transparent',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 0,
    elevation: 15,
    paddingBottom: 10,
    marginBottom: 15,
  },

  componentPadding: {
    padding: 5,
  },

  labelStyle: {
    textAlign: 'center',
    paddingTop: 10,
  },

}

export default Home;

import React, { Component } from 'react';
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native';

class Storage extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  let userId = { id: this.props.id, };

  componentDidMount () {
    this._updateList();
  }

  async _addTask () {
  const listOfTasks = [ this.state.listOfTasks, this.state.text ];

  await AsyncStorage.setItem('listOfTasks',
  JSON.stringify(listOfTasks));

  this._updateList();
  }

  async _updateList () {
    let response = await AsyncStorage.getItem('listOfTasks');
    let listOfTasks = await JSON.parse(response) || [];

    this.setState({
      listOfTasks
    });

    this._changeTextInputValue('');
  }

}

export default Storage;

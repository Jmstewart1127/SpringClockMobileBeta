import React, { Component } from 'react';
import { View, AsyncStorage, TouchableOpacity } from 'react-native';
import Jobs from '../components/Jobs';

class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return(
      <View>
        <Jobs/>
      </View>
    );
  }
}

export default MapScreen;
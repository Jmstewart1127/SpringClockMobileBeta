import React, { Component } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import getDirections from 'react-native-google-maps-directions'

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  handleGetDirections = () => {
    const data = {
      source: {
        latitude: this.props.userLat,
        longitude: this.props.userLng,
      },
      destination: {
        latitude: this.props.addressLat,
        longitude: this.props.addressLng
      },
      params: [
        {
          key: "dirflg",
          value: "w"
        }
      ]
    }
    getDirections(data)
  }

  render() {
    return(
      <View>
        <Button title={this.props.address} onPress={this.handleGetDirections} />
      </View>
    );
  }
}

export default Map;
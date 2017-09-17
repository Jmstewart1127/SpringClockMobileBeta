import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class Location extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    };
  }

  _getLatitude() {
    return this.state.latitude;
  }

  _getLongitude() {
    return this.state.longitude;
  }

  _locationMatch(userLat, userLng, addressLat, addressLng) {
    let isThere = false;
    if (this._lngMatch(userLng, addressLng) == true
        && this._latMatch(userLat, addressLat) == true) {
          isThere == true;
          return isThere;
        } else {
          return isThere;
        }
  }

  _lngMatch(userLng, addressLng) {
    let match = false;

    if (userLng + 0.0005 > addressLng && userLng - 0.0005 < addressLng) {
      this.match = true;
      console.log("lng true");
      return match;
    } else {
      console.log("false");
    }
  }

  _latMatch(userLat, addressLat) {
    let match = false;

    if (userLat + 0.0005 > addressLat && userLat - 0.0005 < addressLat) {
      this.match = true;
      console.log("lat true");
      return match;
    } else {
      console.log("false");
    }
  }

  componentWillMount() {
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=2716+NE+Lyndon+Ct,+Lees+Summit,+MO&key=AIzaSyDlXAOpZfmgDvrk4G7MkD6NXxPf9yJeJo8')
      .then((response) => response.json())
      .then((responseJson) => {

        let data = responseJson.results["0"].geometry.location.lat;
        let data1 = responseJson.results["0"].geometry.location.lng;
        let test = 38.917033;
        let test2 = -94.31519274;
        console.log(data1);
        console.log(data);
        this.setState({
          isLoading: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render() {
    return (
      this._locationMatch(this.data, this.data1, this.state.longitude, this.state.latitude),
      <TouchableOpacity style={ styles.buttonStyle }
         onPress={() => this._clockIn(this.props.id)}>
        <Text style={styles.textStyle}>
          Start/End Shift
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
  }
}

export default Location;

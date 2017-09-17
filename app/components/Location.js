import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class Location extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      addressLat: null,
      addressLng: null,
      error: null,
    };
  }

  _getLatitude() {
    return this.state.latitude;
  }

  _getLongitude() {
    return this.state.longitude;
  }

  _locationMatch(addressLat, addressLng, userLat, userLng, id) {
    let isThere = false;

    console.log("ul: " + userLat);
    console.log("uLng: " + userLng);
    console.log("addLt: " + addressLat);
    console.log("addLng: " + addressLng);
    console.log(id);
    if (this._lngMatch(userLng, addressLng) === true
        && this._latMatch(userLat, addressLat) === true) {
          isThere == true;
          this._clockIn(id);
          console.log("fire");
        } else {
          return isThere;
        }
  }

  _lngMatch(userLng, addressLng) {
    let match = false;

    if (userLng + 0.0005 > addressLng && userLng - 0.0005 < addressLng) {
      this.match = true;
      console.log("lng true");
      return true;
    } else {
      console.log("false");
    }
  }

  _latMatch(userLat, addressLat) {
    let match = false;

    if (userLat + 0.0005 > addressLat && userLat - 0.0005 < addressLat) {
      this.match = true;
      console.log("lat true");
      return true;
    } else {
      console.log("false");
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


  componentWillMount() {
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=1631+SE+Boone+Tr,+Lees+Summit,+MO&key=AIzaSyDlXAOpZfmgDvrk4G7MkD6NXxPf9yJeJo8')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          addressLat: responseJson.results["0"].geometry.location.lat,
          addressLng: responseJson.results["0"].geometry.location.lng,
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
    const { id } = this.props;
    return (
      <TouchableOpacity style={ styles.buttonStyle }
         onPress={() => this._locationMatch(
           this.state.addressLat,
           this.state.addressLng,
           this.state.latitude,
           this.state.longitude,
           this.props.id
         )}>
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

import React, { Component } from 'react';
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native';

class Location extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      addressLat: null,
      addressLng: null,
      coordinateMatches: [],
      error: null,
    };
  }

  _lngMatch(userLng, addressLng) {
    if (userLng + 0.005 > addressLng && userLng - 0.005 < addressLng) {
      console.log("lng true");
      return true;
    } else {
      console.log("false");
      return false
    }
  }

  _latMatch(userLat, addressLat) {
    if (userLat + 0.005 > addressLat && userLat - 0.005 < addressLat) {
      console.log("lat true");
      return true;
    } else {
      console.log("false");
      return false;
    }
  }

  async _clockIn() {
    let id = await AsyncStorage.getItem('userId');
    fetch('https://spring-clock.herokuapp.com/rest/clock/in/' + id)
     .then((responseJson) => {
       return responseJson;
     })
     .catch((error) => {
       console.error(error);
     });
  }

  async _clockOut() {
    let id = await AsyncStorage.getItem('userId');
    fetch('https://spring-clock.herokuapp.com/rest/clock/out/' + id)
     .then((responseJson) => {
       return responseJson;
       console.log("clocked out");
     })
     .catch((error) => {
       console.error(error);
     });
  }

  _checkTrue(arr, val) {
    return arr.some(function(arrVal) {
      console.log("in: " + arrVal);
      return val === arrVal;
    });
  }

  _clockInAndOut(arr) {
    if (this._checkTrue(arr, true)) {
      this._clockIn();
    } else {
      this._clockOut();
    }
  }

  _getAddresses(bizId) {
    fetch('https://spring-clock.herokuapp.com/rest/jobs/address/' + bizId)
    .then((response) => response.json())
    .then((responseJson) => {
      var addresses = [];
      var coordMatch = [];
      console.log('addresses: ' + responseJson);
      for (var i=0; i<responseJson.length; i++) {
        addresses.push(responseJson[i]);
        for (var j=0; j<addresses.length; j++) {
          fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+ addresses[j].split(" ") + '&key=AIzaSyDlXAOpZfmgDvrk4G7MkD6NXxPf9yJeJo8')
            .then((response) => response.json())
            .then((responseJson) => {
              let lat = responseJson.results["0"].geometry.location.lat;
              let lng = responseJson.results["0"].geometry.location.lng;
              console.log("coordinates: " + lat + " " + lng);
              if (this._latMatch(this.state.latitude, lat) && this._lngMatch(this.state.longitude, lng)) {
                let match = true;
                coordMatch.push(match);
              } else {
                let noMatch = false;
                coordMatch.push(noMatch);
              }
              this.setState({
                coordinateMatches: coordMatch,
              });
            })
            .catch((error) => {
              console.error(error);
            });
          }
        }
      });
    }

  _getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        console.log(this.state.latitude);
        console.log(this.state.longitude);
        this._getAddresses(this.props.bizId);
        this._clockInAndOut(this.state.coordinateMatches);
        console.log("cm " + this.state.coordinateMatches);
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  componentWillMount() {
     this.timer = setInterval(()=> this._getCurrentLocation(), 10000);
  }

  render() {
    const { bizId } = this.props;
      return (
          <Text style={styles.textStyle}>

          </Text>
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

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
    console.log("ul: " + userLat);
    console.log("uLng: " + userLng);
    console.log("addLt: " + addressLat);
    console.log("addLng: " + addressLng);
    console.log(id);

    if (this._lngMatch(userLng, addressLng) === true &&
        this._latMatch(userLat, addressLat) === true) {
          this._clockIn(id);
          console.log("fire");
        } else {
          this._clockOut(id);
        }
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

  _clockIn(id) {
   fetch('https://spring-clock.herokuapp.com/rest/clock/in/' + id)
     .then((responseJson) => {
       return responseJson;
     })
     .catch((error) => {
       console.error(error);
     });
  }

  _clockOut(id) {
   fetch('https://spring-clock.herokuapp.com/rest/clock/out/' + id)
     .then((responseJson) => {
       return responseJson;
     })
     .catch((error) => {
       console.error(error);
     });
  }

  _loopThis(addresses) {
    for (var i=0; i<addresses.length; i++) {
      let string = 'https://maps.googleapis.com/maps/api/geocode/json?address='+ addresses[i].split(" ") + '&key=AIzaSyDlXAOpZfmgDvrk4G7MkD6NXxPf9yJeJo8';
      return string;
    }
  }

  _getAddresses(bizId) {
   fetch('https://spring-clock.herokuapp.com/rest/jobs/address/' + bizId)
   .then((response) => response.json())
   .then((responseJson) => {
     var addresses = [];
     console.log('addresses: ' + responseJson);

     for (var i=0; i<responseJson.length; i++) {
       addresses.push(responseJson[i]);
       for (var j=0; j<addresses.length; j++) {
       fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+ addresses[i].split(" ") + '&key=AIzaSyDlXAOpZfmgDvrk4G7MkD6NXxPf9yJeJo8')
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             addressLat: responseJson.results["0"].geometry.location.lat,
             addressLng: responseJson.results["0"].geometry.location.lng,
             isLoading: false,
           });
           console.log("lat: " + this.state.addressLat);
           console.log("lng: " + this.state.addressLng);
         })
         .catch((error) => {
           console.error(error);
         });
       }
     }
     for (var i=0; i<addresses.length; i++) {
       console.log(addresses[i]);
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
        this._getAddresses(2);
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  _wait(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  async _waitForIt() {
    await this._wait(1500);
    return     this._locationMatch(
          this.state.addressLat,
          this.state.addressLng,
          this.state.latitude,
          this.state.longitude,
          2
        );
  }

   componentWillMount() {
    this._getCurrentLocation();
    this._waitForIt();
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
           2
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

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

  _clockIn() {
   fetch('https://spring-clock.herokuapp.com/rest/clock/in/' + 2)
     .then((responseJson) => {
       return responseJson;
     })
     .catch((error) => {
       console.error(error);
     });
  }

  _clockOut() {
   fetch('https://spring-clock.herokuapp.com/rest/clock/out/' + 2)
     .then((responseJson) => {
       return responseJson;
       console.log("clocked out");
     })
     .catch((error) => {
       console.error(error);
     });
  }

  _getAddresses(bizId) {
    let latTrue = false;
    let lngTrue = false;
    var latitude = [];
    var longitude = [];

   fetch('https://spring-clock.herokuapp.com/rest/jobs/address/' + bizId)
   .then((response) => response.json())
   .then((responseJson) => {
     var addresses = [];
     console.log('addresses: ' + responseJson);

     for (var i=0; i<responseJson.length; i++) {
       addresses.push(responseJson[i]);
       for (var j=0; j<addresses.length; j++) {
         fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+ addresses[j].split(" ") + '&key=AIzaSyDlXAOpZfmgDvrk4G7MkD6NXxPf9yJeJo8')
           .then((response) => response.json())
           .then((responseJson) => {
             this.setState({
               addressLat: responseJson.results["0"].geometry.location.lat,
               addressLng: responseJson.results["0"].geometry.location.lng,
             });
             console.log("abc: " + this.state.addressLat);
             console.log("def: " + this.state.addressLng);
             latitude.push(responseJson.results["0"].geometry.location.lat);
             longitude.push(responseJson.results["0"].geometry.location.lng);

             for (var k=0; k<latitude.length; k++) {
               if (this._latMatch(this.state.latitude, latitude[k])) {
                 latTrue = true;
               }
             }

             for (var l=0; l<longitude.length; l++) {
               if (this._lngMatch(this.state.longitude, longitude[l])) {
                 lngTrue = true;
               }
             }

             if (latTrue && lngTrue) {
               this._clockIn(2);
               console.log("fire");
             }

           })
           .catch((error) => {
             console.error(error);
           });
       }
     }
     for (var k=0; k<latitude.length; k++) {
       if (this._latMatch(this.state.latitude, latitude[k])) {
         latTrue = true;
       }
     }

     for (var l=0; l<longitude.length; l++) {
       if (this._lngMatch(this.state.longitude, longitude[l])) {
         lngTrue = true;
       }
     }

     if (latTrue && lngTrue) {
       this._clockIn(2);
       console.log("fire");
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

   componentWillMount() {
     this.timer = setInterval(()=> this._getCurrentLocation(), 10000);
  }

  render() {
    return (
        <Text style={styles.textStyle}>
          Start/End Shift
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

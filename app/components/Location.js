import React, { Component } from 'react';
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { Avatar, Card, List, ListItem, Button, Divider } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

class Location extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      addressLat: null,
      addressLng: null,
      coordinateMatches: [],
      jobId: null,
      clockStatus: null,
      clockable: false,
      error: null,
    };
  }

  _lngMatch(userLng, addressLng) {
    if (userLng + 0.005 > addressLng && userLng - 0.005 < addressLng) {
      return true;
    } else {
      return false
    }
  }

  _latMatch(userLat, addressLat) {
    if (userLat + 0.005 > addressLat && userLat - 0.005 < addressLat) {
      return true;
    } else {
      return false;
    }
  }

  async _clockIn() {
    let id = await AsyncStorage.getItem('userId');
    let jobId = this.state.jobId;
    console.log("this.state.jobId: " + jobId);
    if (this.state.latitude && this.state.longitude) {
      fetch('https://spring-clock.herokuapp.com/rest/mobile/clock/in/' + id + '/' + jobId)
        .then((responseJson) => {
          return responseJson;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  async _clockOut() {
    let id = await AsyncStorage.getItem('userId');
    let jobId = this.state.jobId;
    console.log(jobId);
    if (this.state.latitude && this.state.longitude) {
      fetch('https://spring-clock.herokuapp.com/rest/mobile/clock/out/' + id + '/' + jobId)
        .then((responseJson) => {
          return responseJson;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  _checkTrue(arr, val) {
    return arr.some(function(arrVal) {
      return val === arrVal;
    });
  }

  _clockInAndOut(arr) {
    if (this._checkTrue(arr, true)) {
      this.setState({
        clockStatus: true,
        clockable: true,
      })
    } else {
      this._clockOut();
      this.setState({
        clockStatus: false,
      })
    }
  }

  async _getAddresses() {
    let userId = await AsyncStorage.getItem('userId');
    fetch('https://spring-clock.herokuapp.com/rest/mobile/jobs/assigned/employee/' + userId)
      .then((response) => response.json())
      .then((responseJson) => {
        const addresses = [];
        const coordMatch = [];
        const jobIds = [];
        let jobId;
        console.log(responseJson);
        for (var i=0; i<responseJson.length; i++) {
          console.log("id: " + responseJson[i].id);
          console.log("ja: " + responseJson[i].jobAddress);
          jobIds.push(responseJson[i].id);
          addresses.push(responseJson[i].jobAddress);
          for (var j=0; j<addresses.length; j++) {
            let jobIdMatch = jobIds[j];
            console.log("jobIds array: " + jobIds[j]);
            console.log("addresses array: " + addresses[j]);
            fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+ addresses[j].split(" ")
              + '&key=AIzaSyDlXAOpZfmgDvrk4G7MkD6NXxPf9yJeJo8')
              .then((response) => response.json())
              .then((responseJson) => {
                let lat = responseJson.results["0"].geometry.location.lat;
                let lng = responseJson.results["0"].geometry.location.lng;
                if (this._latMatch(this.state.latitude, lat) && this._lngMatch(this.state.longitude, lng)) {
                  coordMatch.push(true);
                  jobId = jobIdMatch;
                  console.log("jobId: " + jobId);
                } else {
                  coordMatch.push(false);
                }
                this.setState({
                  coordinateMatches: coordMatch,
                  jobId: jobId,
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
        this._getAddresses();
        this._clockInAndOut(this.state.coordinateMatches);
        console.log("looking");
        console.log("state.jobId: " + this.state.jobId);
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  _manualClockInOut() {
    if (this.state.clockStatus) {
      this._clockOut();
      this.setState({
        clockStatus: false,
      });
      console.log(this.state.clockStatus);
    } else {
      this._getCurrentLocation();
      if (this.state.clockable) {
        this._clockIn();
      }
    }
  }

  _clockStatusText() {
    if (this.state.clockStatus === null) {
      if (this.props.clockStatus) {
        return "Clocked In"
      } else {
        return "Clocked Out"
      }
    }
    if (this.state.clockStatus) {
      return "Clocked In";
    } else {
      return "Clocked Out";
    }
  }

  render() {
    const totalPay = Math.round(this.props.totalPay * 100) / 100;
    return (
      <View>
        <List containerStyle={{marginBottom: 20}}>

          <ListItem
            roundAvatar
            title={this.props.weekTimeInHours}
          />
          <ListItem
            leftIcon={{name: 'attach-money'}}
            title={"$" + totalPay}
          />
          <ListItem
            leftIcon={{name: 'access-alarm'}}
            title={this._clockStatusText()}
          />
        </List>
        <Button
          icon={{name: 'access-alarm'}}
          backgroundColor='#03A9F4'
          fontFamily='Lato'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='Clock In/Out'
          onPress={() => this._manualClockInOut()}
        />
      </View>
    );
  }
}

export default Location;
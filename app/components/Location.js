import React, { Component } from 'react';
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import EmployeeStatus from '../components/EmployeeStatus';
import Jobs from '../components/Jobs';

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
      fetch('https://spring-clock.herokuapp.com/rest/clock/in/' + id + '/' + jobId)
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
      fetch('https://spring-clock.herokuapp.com/rest/clock/out/' + id + '/' + jobId)
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
      console.log(this.state.clockStatus);
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
      <View style={ styles.listStyle }>
        <Text style={ styles.userStyle }>
          {this.props.user + " "}
        </Text>
        <Text style={ styles.textStyle }>{"Week Time: " + this.props.weekTimeInHours}</Text>
        <Text style={ styles.textStyle }>{"Pay Rate: " + "$" + this.props.payRate}</Text>
        <Text style={ styles.textStyle }>{"Net Pay: " + "$" + totalPay}</Text>
        <Text style={ styles.textStyle }>{this._clockStatusText()}</Text>
        <TouchableOpacity
          style={ styles.buttonStyle }
          onPress={() => this._manualClockInOut()}
        >
          <Text style={ styles.buttonText}>Clock In/Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {

  listStyle: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#5C77E6',
    padding: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 0,
    elevation: 15,
    height: 300,
  },

  userStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    textAlign: 'left',
    borderColor: 'white',
    borderBottomWidth: 1,
    height: 50,
  },

  textStyle: {
    color: 'white',
    marginTop: 10,
    marginBottom: 10,
  },

  buttonText: {
    color: '#5C77E6',
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },

  buttonStyle: {
    borderWidth: 1,
    borderColor: 'white',
    borderStyle: 'solid',
    borderRadius: 4,
    backgroundColor: 'white',
    height: 50,
    marginTop: 10,
  }
}

export default Location;
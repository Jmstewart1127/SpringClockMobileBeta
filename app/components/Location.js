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
    if (this.state.latitude && this.state.longitude) {
      fetch('https://spring-clock.herokuapp.com/rest/clock/in/' + id)
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
    if (this.state.latitude && this.state.longitude) {
      fetch('https://spring-clock.herokuapp.com/rest/clock/out/' + id)
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

  _getAddresses(bizId) {
    fetch('https://spring-clock.herokuapp.com/rest/jobs/address/' + bizId)
    .then((response) => response.json())
    .then((responseJson) => {
      var addresses = [];
      var coordMatch = [];
      for (var i=0; i<responseJson.length; i++) {
        addresses.push(responseJson[i]);
        for (var j=0; j<addresses.length; j++) {
          fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+ addresses[j].split(" ") + '&key=AIzaSyDlXAOpZfmgDvrk4G7MkD6NXxPf9yJeJo8')
            .then((response) => response.json())
            .then((responseJson) => {
              let lat = responseJson.results["0"].geometry.location.lat;
              let lng = responseJson.results["0"].geometry.location.lng;
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
        this._getAddresses(this.props.bizId);
        this._clockInAndOut(this.state.coordinateMatches);
        console.log("looking");
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
        return "Clocked In"
      }
    }
    if (this.state.clockStatus) {
      return "Clocked In";
    } else {
      return "Clocked Out";
    }
  }

  // componentWillMount() {
  //   if (!this.state.manualClockInOut) {
  //     this.timer = setInterval(()=> this._getCurrentLocation(), 5000);
  //   }
  // }

  render() {
    const { bizId } = this.props;
    const { user } = this.props;
    const { weekTimeInHours } = this.props;
    const { payRate } = this.props;
    const { totalPay } = this.props;
    const { clockStatus } = this.props
      return (
        <View style={ styles.listStyle }>
          <Text style={ styles.userStyle }>
            {this.props.user + " "}
          </Text>
          <Text style={ styles.textStyle }>{"Week Time: " + this.props.weekTimeInHours}</Text>
          <Text style={ styles.textStyle }>{"Pay Rate: " + "$" + this.props.payRate}</Text>
          <Text style={ styles.textStyle }>{"Net Pay: " + "$" + this.props.totalPay}</Text>
          <Text style={ styles.textStyle }>{this._clockStatusText()}</Text>
          <TouchableOpacity
            onPress={() => this._manualClockInOut()}
          >
            <Text>Clock In/Out</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

const styles = {

  listStyle: {
    width: 400,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#5C77E6',
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 0,
    elevation: 15,
  },

  userStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 'auto',
    marginBottom: 'auto',
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

  buttonStyle: {
    borderWidth: 1,
    borderColor: 'blue',
    borderStyle: 'solid',
    borderRadius: 10,
    backgroundColor: 'transparent',
  }
}

export default Location;

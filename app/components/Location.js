import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements'

class Location extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      addressLat: null,
      addressLng: null,
      coordinateMatches: [],
      jobs: [],
      jobId: null,
      clockStatus: this.props.clockStatus,
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
    fetch('https://spring-clock.herokuapp.com/rest/mobile/clock/in/' + id + '/' + jobId)
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async _clockOut() {
    let id = await AsyncStorage.getItem('userId');
    let jobId = this.state.jobId;
    fetch('https://spring-clock.herokuapp.com/rest/mobile/clock/out/' + id + '/' + jobId)
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async _getAddressesTest() {
    let userId = await AsyncStorage.getItem('userId');
    fetch('https://spring-clock.herokuapp.com/rest/mobile/jobs/assigned/employee/' + userId)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          jobs: responseJson
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  _compareLocationToPremises() {
    const coordMatch = [];
    let jobId;
    for (let i=0; i<this.state.jobs.length; i++) {
      let lat = this.state.jobs[i].latitude;
      let lng = this.state.jobs[i].longitude;
      if (this._latMatch(this.state.latitude, lat)
        && this._lngMatch(this.state.longitude, lng)) {
        coordMatch.push(true);
        jobId = this.state.jobs[i].id;
      } else {
        coordMatch.push(false);
      }
    }
    this.setState({
      coordinateMatches: coordMatch,
      jobId: jobId,
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
        this._compareLocationToPremises();
        this._clockInAndOut(this.state.coordinateMatches);
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  _checkTrue(arr, val) {
    return arr.some(function(arrVal) {
      return val === arrVal;
    });
  }

  _clockInAndOut(arr) {
    if (this._checkTrue(arr, true)) {
      this._clockIn();
      this.setState({
        clockStatus: true,
        clockable: true,
      })
    } else {
      this.setState({
        clockStatus: false,
      })
    }
  }

  _manualClockInOut() {
    if (this.state.clockStatus) {
      this._clockOut();
      this.setState({
        clockStatus: false,
      });
    } else {
      this._getCurrentLocation();
    }
  }

  _clockStatusText() {
    if (this.state.clockStatus) {
      return "Clocked In";
    } else {
      return "Clocked Out";
    }
  }

  componentDidMount() {
    this._getAddressesTest();
  }

  render() {
    const totalPay = Math.round(this.props.totalPay * 100) / 100;
    return (
      <View>
        <List containerStyle={{marginBottom: 20}}>
          <ListItem
            leftIcon={{name: 'alarm'}}
            title={this.props.weekTimeInHours}
          />
          <ListItem
            leftIcon={{name: 'attach-money'}}
            title={"$" + totalPay}
          />
          <ListItem
            leftIcon={{name: 'alarm-on'}}
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
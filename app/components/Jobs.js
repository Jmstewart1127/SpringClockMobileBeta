import React, { Component } from 'react';
import { AsyncStorage, ListView, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, Card, ListItem, Button } from 'react-native-elements';
import Map from './Map';

class Jobs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      refreshing: false,
      error: false,
      userLat: '',
      userLng: '',
      addressLat: '',
      addressLng: '',
      jobs: [],
      jobAddresses: [{
          address: [],
          addressLat: [],
          addressLng: [],
        }],
    };
  }

  _getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          userLat: position.coords.latitude,
          userLng: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    console.log(this.state.userLat);
    console.log(this.state.userLng);
  }

  async _getJobs() {
    let id = await AsyncStorage.getItem('userId');
    fetch('https://spring-clock.herokuapp.com/rest/mobile/jobs/assigned/employee/' + id)
    .then((response) => response.json())
    .then((responseJson) => {
      const x = [];
      for (let i=0; i<responseJson.length; i++) {
        x.push(responseJson[i]);
      }
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({
        isLoading: false,
        dataSource: ds.cloneWithRows(responseJson),
        jobs: x,
      });
    })
    .then(() => console.log(this.state.jobs[1].jobAddress))
    .then(() => this._getAddressCoordinates())
    .catch((error) => {
      console.error(error);
    });
  }

  _getAddressCoordinates() {
    const addressLat = [];
    const addressLng = [];
    for (let i=0; i<this.state.jobs.length; i++) {
      fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.state.jobs[i].jobAddress.split(" ")
        + '&key=AIzaSyDlXAOpZfmgDvrk4G7MkD6NXxPf9yJeJo8')
        .then((response) => response.json())
        .then((responseJson) => {
          let lat = responseJson.results["0"].geometry.location.lat;
          let lng = responseJson.results["0"].geometry.location.lng;
          addressLat.push(lat);
          addressLng.push(lng);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    this.setState({
      addressLng: addressLat,
      addressLat: addressLng,
    });
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this._getJobs().then(() => {
      this.setState({refreshing: false});
    });
  }

  componentWillMount() {
    this._getJobs();
    this._getCurrentLocation();
    console.log(this.state.userLat);
    console.log(this.state.userLng);
    console.log(this.state.addressLat);
    console.log(this.state.addressLng);
  }

  render() {
    if (this.state.isLoading || this.state.jobs.length < 1) {
      return (
        <View>
          <Text/>
        </View>
      );
    } else {
      return (
        <Card
          title={'Job Sites'}
        >
          <View>
            {
              this.state.jobs.map((job, i) => {
              const getAddressCoords = () => {
                return this._getAddressCoordinates(job.jobAddress);
              }
                return (
                  <TouchableOpacity
                    onPress={() => getAddressCoords}>
                    <Text>AAA</Text>
                    <ListItem
                      key={i}
                      roundAvatar
                      title={job.jobAddress}
                    />
                    <Map
                      userLat={this.state.userLat}
                      userLng={this.state.userLng}
                      addressLat={this.state.addressLat}
                      addressLng={this.state.addressLng}
                    />
                  </TouchableOpacity>
                );
              })
            }
          </View>
        </Card>
      );
    }
  }
}

const styles = {
  viewStyle: {
    marginLeft: 5,
    marginRight: 5,
  },

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
      height: 100,
      marginLeft: 5,
      marginRight: 5,
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
      marginTop: 5,
      marginBottom: 5,
    },

    buttonStyle: {
      borderWidth: 1,
      borderColor: 'blue',
      borderStyle: 'solid',
      borderRadius: 10,
      backgroundColor: 'transparent',
    }
  }

export default Jobs;
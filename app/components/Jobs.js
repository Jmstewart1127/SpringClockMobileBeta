import React, { Component } from 'react';
import { AsyncStorage, ListView, Text, TouchableOpacity, View } from 'react-native';
import { Card, Divider, Header, ListItem } from 'react-native-elements';
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
    .catch((error) => {
      console.error(error);
    });
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this._getJobs().then(() => {
      this.setState({refreshing: false});
    });
  }

  componentWillMount() {
    this._getCurrentLocation();
    this._getJobs();
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
        <View>
          <Card
            title={'Job Sites'}
          >
            <View>
              {
                this.state.jobs.map((job, i) => {
                  return (
                    <View>
                      <Map
                        userLat={this.state.userLat}
                        userLng={this.state.userLng}
                        addressLat={job.latitude}
                        addressLng={job.longitude}
                        address={job.jobAddress}
                      >
                        <ListItem
                          key={i}
                        />
                      </Map>
                      <Divider style={{ backgroundColor: 'blue' }}/>
                    </View>
                  );
                })
              }
            </View>
          </Card>
        </View>
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
import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View, ScrollView, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class Jobs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      jobs: [],
    };
  }

  async _getJobs() {
    let id = await AsyncStorage.getItem('userId');
    fetch('https://spring-clock.herokuapp.com/rest/jobs/assigned/employee/' + id)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      var x = [];
      for (let i=0; i<responseJson.length; i++) {
        x.push(responseJson[i]);
      }
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2, r3, r4, r5, r6) => r1 !== r2});
      this.setState({
        isLoading: false,
        dataSource: ds.cloneWithRows(responseJson),
        jobs: x,
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  componentWillMount() {
    this._getJobs();
  }

  render() {
    if (this.state.isLoading || this.state.jobs.length < 1) {
      return (
        <View>
          <Text></Text>
        </View>
      );
    } else {
      return (
        <View style={ styles.listStyle }>
          <Text style={ styles.userStyle } >
            {"Today's Job Site"}
          </Text>
          <ListView
            dataSource={ this.state.dataSource }
              renderRow={(rowData) =>
              <Text style={ styles.textStyle }>
                  <Text style={ styles.textStyle } >
                  { rowData.jobAddress }
                  {/* {"Week Time: " + rowData.weekTimeInHours},
                  {"Pay Rate: " + rowData.payRate},
                  {"Period Pay: " + rowData.totalPay},
                  {"Clock In Status: " + rowData.clocked} */}
                  </Text>
              </Text>
              }
          />
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

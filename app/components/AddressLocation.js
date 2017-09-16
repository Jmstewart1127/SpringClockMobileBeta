import React, { Component }                        from 'react';
import { ActivityIndicator, ListView, Text, View } from 'react-native';

class AddressLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
  }

  componentWillMount() {
    var id = 2;
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=2716+NE+Lyndon+Ct,+Lees+Summit,+MO&key=AIzaSyDlXAOpZfmgDvrk4G7MkD6NXxPf9yJeJo8')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2, r3, r4, r5, r6) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) =>
          <Text style={ styles.listStyle }>
            <Text style={ styles.userStyle } >
              {rowData.user + " "}
            </Text>

            <Text style={ styles.listStyle } >
              {"address lat: " + rowData.results.formatted_address.location.lat},
              {"address lng: " + rowData.results.formatted_address.location.lng},
            </Text>
          </Text>
        }
      />
      </View>
    );
  }
}

const styles = {
  listStyle: {
    textAlign: 'left',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'blue',
    padding: 10,
  },

  userStyle: {
    textAlign: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'blue',
    fontWeight: 'bold',
    fontSize: 18,
  }

}

export default AddressLocation;

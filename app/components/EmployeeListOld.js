import React, { Component }                        from 'react';
import { ActivityIndicator, ListView, Text, View } from 'react-native';

class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
  }

  componentWillMount() {
    fetch('https://spring-clock.herokuapp.com/rest/employees')
      .then((response) => response.json())
      .then(responseJson => console.log(responseJson))
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var data = new Array();
        data.push(new responseJson);
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
        renderRow={(rowData) => <Text>{data}</Text>}
      />
      </View>
    );
  }
}

export default EmployeeList;










import React, { Component }                        from 'react';
import { ActivityIndicator, ListView, Text, View } from 'react-native';

class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
  }

  componentWillMount() {
    fetch('https://spring-clock.herokuapp.com/rest/employees')
      .then((response) => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
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
        <Text>{this.state.dataSource}</Text>
      </View>
    );
  }
}

export default EmployeeList;

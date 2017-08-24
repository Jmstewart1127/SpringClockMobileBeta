import React from 'react';
import { StyleSheet, Text, Button, View, AppRegistry } from 'react-native';
import Test from '../SpringClockMobile/components/test.js';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Button 
          title="My Button"
          style={styles.button}
          color="#841584"
          onPress={Test.test}
        />
      </View>

    );
  }
}//

// // My first component
// const Stuff = () => (
//   <Text>Mas Text</Text>
// );

// // Render to device
// ReactNative.AppRegistry.registerComponent('SpringClockMobile', () => Stuff);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    width: 30,
    color: "#841584",
    backgroundColor: 'powderblue',
    borderWidth: 1,
    borderColor: 'blue',
    borderStyle: 'solid',
    height: 15,
  },
});

function restTest() {
  return alert("yo");
}


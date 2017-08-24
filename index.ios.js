import React from 'react';
import { StyleSheet, Text, Button, View, AppRegistry } from 'react-native';

// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Open up App.js to start working on your app!</Text>
//         <Text>Changes you make will automatically reload.</Text>
//         <Text>Shake your phone to open the developer menu.</Text>
//         <Button 
//           title="My Button"
//           style={styles.button}>
//         </Button>
//       </View>

//     );
//   }
// }

// My first component
const Stuff = () => (
  <Text>Mas Text</Text>
);

// Render to device
ReactNative.AppRegistry.registerComponent('SpringClockMobile', () => Stuff);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    width: 30,
    backgroundColor: 'powderblue',
    borderWidth: 20,
    borderColor: 'blue',
    borderStyle: 'solid',
    height: 15,
  },
});

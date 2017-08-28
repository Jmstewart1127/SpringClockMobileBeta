import React from 'react';
import { TabNavigator } from 'react-navigation';
//import  Icon from 'react-navigation';

import AppHome from '../screens/AppHome.js';
import tesstScreen from '../screens/tesstScreen.js';

// export const Tabs = TabNavigator({
// 	AppHome: {
// 		screen: AppHome,
// 	},
// 	tesstScreen: {
// 		screen: tesstScreen,
// 	},
// });

export const Tabs = TabNavigator({
  AppHome: {
    screen: AppHome,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
    },
  },
  tesstScreen: {
    screen: tesstScreen,
    navigationOptions: {
      tabBarLabel: 'Me',
      tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
    },
  },
});
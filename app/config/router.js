import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
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

export const FeedStack = StackNavigator({
  AppHome: {
    screen: AppHome,
    navigationOptions: {
      title: 'Feed',
    },
  },
  tesstScreen: {
    screen: tesstScreen,
    navigationOptions: {
      title: 'ScreenTwo',
    }
  },
});

export const Tabs = TabNavigator({
  AppHome: {
    screen: FeedStack,
    navigationOptions: {
      tabBarLabel: 'Home',
    },
  },
  tesstScreen: {
    screen: tesstScreen,
    navigationOptions: {
      tabBarLabel: 'Me'
    },
  },
});

export const Root = StackNavigator({
  Tabs: {
    screen: Tabs,
  },
  Settings: {
    screen: AppHome,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});

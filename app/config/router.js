import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import AppHome from '../screens/AppHome.js';
import Home from '../screens/Home.js';
import MapScreen from '../screens/MapScreen';

export const FeedStack = StackNavigator({
  AppHome: {
    screen: AppHome,
    navigationOptions: {
      title: 'Status',
    },
  },
  Jobs: {
    screen: MapScreen,
    navigationOptions: {
      title: 'My Jobs'
    },
  },
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'My ID#',
    }
  },
});

export const Tabs = TabNavigator({
  AppHome: {
    screen: FeedStack,
    icon: 'user',
    navigationOptions: {
      tabBarLabel: 'Home',
    },
  },
  Jobs: {
    screen: MapScreen,
    navigationOptions: {
      tabBarLabel: 'My Jobs'
    },
  },
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Change ID#'
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

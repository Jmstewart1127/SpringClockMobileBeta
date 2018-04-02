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
    navigationOptions: {
      tabBarLabel: 'Home',
      header: { visible: false }
    },
  },
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'My ID#'
    },
  },
  Jobs: {
    screen: MapScreen,
    navigationOptions: {
      tabBarLabel: 'My ID#'
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

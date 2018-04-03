import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import AppHome from '../screens/AppHome.js';
import Home from '../screens/Home.js';
import MapScreen from '../screens/MapScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

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
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: () => <Icon name="home" size={22} style={{color:'gray'}} />,
    },
  },
  Jobs: {
    screen: MapScreen,
    navigationOptions: {
      tabBarLabel: 'My Jobs',
      tabBarIcon: () => <Icon name="briefcase" size={22} style={{color:'gray'}} />,
    },
  },
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Change ID#',
      tabBarIcon: () => <Icon name="gear" size={22} style={{color:'gray'}} />,
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

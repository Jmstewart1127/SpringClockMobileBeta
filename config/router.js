import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Icon } from 'react-navigation-elements';

import AppHome from '../screens/AppHome';
import tesstScreen from '../screens/tesstScreen';

export const Tabs = TabNavigator({
	AppHome: {
		screen: AppHome,
	},
	tesstScreen: {
		screen: tesstScreen,
	},
});
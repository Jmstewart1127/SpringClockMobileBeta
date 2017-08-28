import React from 'react';
import { StackNavigator } from 'react-navigation';

import AppHome from '../screens/AppHome';
import TestScreen from '../screens/tesstScreen';

const Nav = StackNavigator({ 
	Home: { screen: AppHome },
	Test: { screen: TestScreen } 
});
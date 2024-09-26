import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TrackListFlow from './TracklistFlow';
import AccountScreen from '../../screens/AccountScreen';
import TrackCreateScreen from '../../screens/TrackCreateScreen';

const Tab = createBottomTabNavigator();

export default function MainFlow() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Your Tracks" component={TrackListFlow} />
      <Tab.Screen name="Account" component={AccountScreen} />
      <Tab.Screen name="Create Tracks" component={TrackCreateScreen} />
    </Tab.Navigator>
  );
}

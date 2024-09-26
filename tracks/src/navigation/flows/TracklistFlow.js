import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TrackListScreen from '../../screens/TrackListScreen';
import TrackDetailScreen from '../../screens/TrackDetailScreen';

const Stack = createNativeStackNavigator();

export default function TrackListFlow() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TrackList" component={TrackListScreen} />
      <Stack.Screen name="TrackDetail" component={TrackDetailScreen} />
    </Stack.Navigator>
  );
}

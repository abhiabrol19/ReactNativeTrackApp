import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as LocationProvider } from './src/context/LocationContext';

import ResolveAuth from './src/screens/ResolveAuth';
import LoginFlow from './src/navigation/flows/LoginFlow';
import MainFlow from './src/navigation/flows/MainFlow';

import { navigationRef } from './src/navigation/navigationRef';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <LocationProvider>
      <AuthProvider>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            screenOptions={{ headerShown: false, gestureEnabled: false }}
          >
            <Stack.Screen name="Loading" component={ResolveAuth} />
            <Stack.Screen
              name="LoginFlow"
              component={LoginFlow}
              options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen name="MainFlow" component={MainFlow} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </LocationProvider>
  );
}

import React, { useContext, useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Map from '../components/Map';
import { Text, Input, Button } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import { useFocusEffect } from '@react-navigation/native';

import '../_mockLocation';

import TrackForm from '../components/TrackForm';

const TrackCreateScreen = () => {
  const { state, addLocation } = useContext(LocationContext);
  const [isTracking, setIsTracking] = useState(false);
  const [err] = useLocation(isTracking, (location) => {
    addLocation(location, state.recording);
  });

  useFocusEffect(
    useCallback(() => {
      setIsTracking(true);

      return () => {
        setIsTracking(false);
      };
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text h3>Create Track</Text>
      <Map />
      {err ? <Text>Please enable location services</Text> : null}
      <View style={styles.formContainer}>
        <TrackForm />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    marginTop: 5,
  },
});

export default TrackCreateScreen;

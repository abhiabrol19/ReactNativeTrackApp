import React, { useContext, useCallback, useState } from 'react';
import { StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import Map from '../components/Map';
import { Text, Button } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Context as LocationContext } from '../context/LocationContext';
import { Context as TrackContext } from '../context/TrackContext';
import useLocation from '../hooks/useLocation';
import { useFocusEffect } from '@react-navigation/native';
import TrackForm from '../components/TrackForm';
import '../_mockLocation';

const TrackCreateScreen = () => {
  const {
    state: locationState,
    addLocation,
    startRecording,
    stopRecording,
    changeName,
    clearTrackData,
  } = useContext(LocationContext);
  const { createTrack } = useContext(TrackContext);
  const [isTracking, setIsTracking] = useState(false);
  const [err] = useLocation(isTracking, (location) => {
    addLocation(location, locationState.recording);
  });

  const handleStartStopRecording = () => {
    if (!locationState.recording) {
      if (!locationState.name) {
        alert('Please enter a track name before starting to record.');
        return;
      }
      startRecording();
    } else {
      stopRecording();
    }
  };

  const saveTrack = () => {
    console.log('Saving track with locations:', locationState.locations); // Debug log
    if (!locationState.name || locationState.locations.length === 0) {
      alert('Please ensure track has a valid name and recorded locations.');
      return;
    }
    createTrack(locationState.name, locationState.locations);
    stopRecording();
    clearTrackData();
  };

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
      <Text h3 style={styles.header}>
        Create Track
      </Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.mapContainer}>
          <Map />
        </View>
        {err && (
          <Text style={styles.errorText}>Please enable location services</Text>
        )}
        <View style={styles.formContainer}>
          <TrackForm />
          <View style={styles.buttonContainer}>
            <Button
              title={
                locationState.recording ? 'Stop Recording' : 'Start Recording'
              }
              onPress={handleStartStopRecording}
              buttonStyle={styles.startStopButton}
              titleStyle={styles.buttonText}
            />
            <Button
              title="Save Track"
              onPress={saveTrack}
              buttonStyle={styles.saveButton}
              titleStyle={styles.buttonText}
              disabled={!locationState.recording}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
  },
  header: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#1a1a1a',
    fontSize: 24,
    fontWeight: '700',
  },
  scrollContainer: {
    paddingHorizontal: 15,
  },
  mapContainer: {
    borderRadius: 15,
    height: Dimensions.get('window').height * 0.4,
    overflow: 'hidden',
    elevation: 5,
    marginBottom: 20,
  },
  formContainer: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#fff',
    elevation: 2,
  },
  errorText: {
    color: '#d9534f',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  startStopButton: {
    flex: 1,
    backgroundColor: '#3498db',
    marginRight: 10,
    borderRadius: 12,
    paddingVertical: 14,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#2ecc71',
    marginLeft: 10,
    borderRadius: 12,
    paddingVertical: 14,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TrackCreateScreen;

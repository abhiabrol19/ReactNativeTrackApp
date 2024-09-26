import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Context as TrackContext } from '../context/TrackContext';
import MapView, { Polyline } from 'react-native-maps';

const TrackDetailScreen = ({ route }) => {
  const { state } = useContext(TrackContext);
  const { _id } = route.params;
  const track = state.tracks.find((t) => t._id === _id);

  if (!track) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{track.name}</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: track.locations[0].coords.latitude,
          longitude: track.locations[0].coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Polyline
          coordinates={track.locations.map((loc) => loc.coords)}
          strokeColor="#007BFF"
          strokeWidth={3}
        />
      </MapView>
      <Text style={styles.details}>Total Points: {track.locations.length}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  map: {
    height: 300,
    borderRadius: 8,
    marginBottom: 20,
  },
  details: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
});

export default TrackDetailScreen;

import React, { useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Context as TrackContext } from '../context/TrackContext';
import { Icon } from '@rneui/themed';

const TrackListScreen = () => {
  const { state, fetchTracks, deleteTrack } = useContext(TrackContext);
  const navigation = useNavigation();

  useEffect(() => {
    fetchTracks();
  }, []);

  const handleDelete = (id) => {
    Alert.alert('Delete Track', 'Are you sure you want to delete this track?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteTrack(id),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Tracks</Text>
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={state.tracks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.trackItem}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('TrackDetail', { _id: item._id })
              }
              style={styles.trackInfo}
            >
              <Text style={styles.trackName}>{item.name}</Text>
            </TouchableOpacity>
            <Icon
              name="delete"
              type="material"
              color="gray"
              size={28}
              onPress={() => handleDelete(item._id)}
              containerStyle={styles.iconContainer}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 70,
    paddingTop: 10,
    marginBottom: 15,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 10,
    paddingTop: 10,
  },
  trackItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  trackInfo: {
    flex: 1,
  },
  trackName: {
    fontSize: 18,
    color: '#007BFF',
  },
  iconContainer: {
    padding: 5,
  },
});

export default TrackListScreen;

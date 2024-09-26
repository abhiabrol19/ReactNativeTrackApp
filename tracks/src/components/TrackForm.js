import React, { useContext } from 'react';
import { Input, Button } from '@rneui/themed';
import { View, StyleSheet } from 'react-native';
import { Context as LocationContext } from '../context/LocationContext'; // Use LocationContext

const TrackForm = () => {
  const {
    state: { name, recording },
    startRecording,
    stopRecording,
    changeName,
  } = useContext(LocationContext);

  return (
    <View style={styles.form}>
      <Input
        placeholder="Enter track name"
        value={name}
        onChangeText={changeName} // Use changeName to update the track name
        style={styles.input}
      />
      {/* <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording} // Toggle recording state
        style={styles.button}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    color: '#fff',
  },
});

export default TrackForm;

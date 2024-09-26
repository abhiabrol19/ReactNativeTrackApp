import React from 'react';
import { Input, Button } from '@rneui/themed';
import { View, StyleSheet } from 'react-native';

const TrackForm = () => {
  return (
    <View style={styles.form}>
      <Input placeholder="Enter name" style={styles.input} />
      <Button title="Start Recording" style={styles.button} />
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

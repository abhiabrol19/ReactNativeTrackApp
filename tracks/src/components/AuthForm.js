import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Input, Button } from '@rneui/themed';

const AuthForm = ({
  headerText,
  errorMessage,
  onSubmit,
  submitButtonTitle,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <Text h3 style={styles.title}>
        {headerText}
      </Text>
      <Input
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Button
        title={submitButtonTitle}
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
        onPress={() => onSubmit({ email, password })}
      />
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  error: {
    fontSize: 16,
    color: 'red',
    marginTop: 15,
  },
});

export default AuthForm;

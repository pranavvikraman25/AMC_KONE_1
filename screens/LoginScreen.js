import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';

const VALID_EMAIL = 'kone';
const VALID_PASSWORD = 'kone';

export default function LoginScreen({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      onLoginSuccess && onLoginSuccess();
    } else {
      Alert.alert(
        'Login Failed',
        'Invalid company credentials'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>KONE Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Company Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      <Text style={styles.note}>
        Authorized maintenance personnel only
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0071CE',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#0071CE',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  note: {
    marginTop: 20,
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
  },
});

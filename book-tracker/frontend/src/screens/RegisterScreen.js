import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import API_URL from '../utils/api';

const { width, height } = Dimensions.get('window');

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok) {
        alert('Registro exitoso');
        navigation.replace('Login');
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert('Error al registrarse');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Title style={styles.title}>Crear Cuenta</Title>
        <TextInput
          label="Correo"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          label="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <Button mode="contained" onPress={register} style={styles.button}>
          Registrarse
        </Button>
        <Button
          onPress={() => navigation.navigate('Login')}
          style={styles.link}
          labelStyle={{ color: 'white' }}
        >
          ¿Ya tienes cuenta? Inicia sesión
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    backgroundColor: '#111',
    justifyContent: 'center'
  },
  overlay: {
    margin: 20,
    padding: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 10
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 24
  },
  input: {
    marginBottom: 12,
    backgroundColor: 'white'
  },
  button: {
    marginTop: 10,
    backgroundColor: '#ff6200'
  },
  link: {
    marginTop: 10,
    alignSelf: 'center'
  }
});

export default RegisterScreen;
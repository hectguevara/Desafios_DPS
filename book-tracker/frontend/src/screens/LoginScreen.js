import React, { useState } from 'react';
import { View, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import API_URL from '../utils/api';
import { saveToken } from '../utils/auth';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok) {
        await saveToken(data.token);
        navigation.replace('Home');
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert('Error de conexión');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/bg/collage.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Title style={styles.title}>Iniciar Sesión</Title>
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
        <Button mode="contained" onPress={login} style={styles.button}>
          Entrar
        </Button>
        <Button
          onPress={() => navigation.navigate('Register')}
          style={styles.link}
          labelStyle={{ color: 'white' }}
        >
          ¿No tienes cuenta? Regístrate
        </Button>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width,
    height,
    justifyContent: 'center'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    margin: 20,
    padding: 25,
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

export default LoginScreen;
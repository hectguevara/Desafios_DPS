import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import API_URL from '../utils/api';

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
    <View style={{ padding: 20 }}>
      <Title>Crear Cuenta</Title>
      <TextInput label="Correo" value={email} onChangeText={setEmail} />
      <TextInput label="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
      <Button mode="contained" onPress={register} style={{ marginTop: 20 }}>
        Registrarse
      </Button>
      <Button onPress={() => navigation.navigate('Login')} style={{ marginTop: 10 }}>
        ¿Ya tienes cuenta? Inicia sesión
      </Button>
    </View>
  );
};

export default RegisterScreen;
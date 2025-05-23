import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import API_URL from '../utils/api';
import { getToken } from '../utils/auth';

const { width, height } = Dimensions.get('window');

const AgregarLibroScreen = ({ navigation }) => {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');

  const agregarLibro = async () => {
    const token = await getToken();
    try {
      const res = await fetch(`${API_URL}/libros`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          titulo,
          autor,
          estado: 'por leer'
        })
      });

      const data = await res.json();
      if (res.ok) {
        alert('Libro agregado correctamente');
        navigation.goBack();
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert('Error al agregar libro');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Title style={styles.title}>Agregar Libro</Title>
        <TextInput
          label="Título"
          value={titulo}
          onChangeText={setTitulo}
          style={styles.input}
        />
        <TextInput
          label="Autor"
          value={autor}
          onChangeText={setAutor}
          style={styles.input}
        />
        <Button mode="contained" onPress={agregarLibro} style={styles.button}>
          Guardar
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
  }
});

export default AgregarLibroScreen;
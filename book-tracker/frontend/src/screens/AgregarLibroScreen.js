import React, { useState } from 'react';
import {
  View, StyleSheet, ScrollView, Dimensions
} from 'react-native';
import { TextInput, Button, Title, Text } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import API_URL from '../utils/api';
import { getToken } from '../utils/auth';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

const { width, height } = Dimensions.get('window');

const AgregarLibroScreen = ({ navigation }) => {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [estado, setEstado] = useState('por leer');
  const [comentario, setComentario] = useState('');
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [mostrarInicio, setMostrarInicio] = useState(false);
  const [mostrarFin, setMostrarFin] = useState(false);

  const guardarLibro = async () => {
    if (!titulo || !autor) return alert('Título y autor son obligatorios');
    const token = await getToken();

    try {
      const res = await fetch(`${API_URL}/libros`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          titulo,
          autor,
          estado,
          comentario,
          fechaInicio: fechaInicio ? fechaInicio.toISOString() : null,
          fechaFin: fechaFin ? fechaFin.toISOString() : null
        })
      });

      if (res.ok) navigation.goBack();
      else alert('Error al guardar');
    } catch {
      alert('Error de conexión');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.overlay}>
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

        <Text style={styles.label}>Estado:</Text>
        <Picker
          selectedValue={estado}
          onValueChange={setEstado}
          style={styles.picker}
          dropdownIconColor="#fff"
        >
          <Picker.Item label="Por leer" value="por leer" />
          <Picker.Item label="Leyendo" value="leyendo" />
          <Picker.Item label="Completado" value="completado" />
        </Picker>

        <Button
          mode="outlined"
          onPress={() => setMostrarInicio(true)}
          style={styles.buttonOutline}
          textColor="#ffa94d"
        >
          Seleccionar Fecha de Inicio
        </Button>
        {fechaInicio && (
          <Text style={styles.dateLabel}>
            Inicio: {moment(fechaInicio).format('DD/MM/YYYY')}
          </Text>
        )}
        <DateTimePickerModal
          isVisible={mostrarInicio}
          mode="date"
          onConfirm={(date) => {
            setFechaInicio(date);
            setMostrarInicio(false);
          }}
          onCancel={() => setMostrarInicio(false)}
        />

        <Button
          mode="outlined"
          onPress={() => setMostrarFin(true)}
          style={styles.buttonOutline}
          textColor="#ffa94d"
        >
          Seleccionar Fecha de Fin
        </Button>
        {fechaFin && (
          <Text style={styles.dateLabel}>
            Fin: {moment(fechaFin).format('DD/MM/YYYY')}
          </Text>
        )}
        <DateTimePickerModal
          isVisible={mostrarFin}
          mode="date"
          onConfirm={(date) => {
            setFechaFin(date);
            setMostrarFin(false);
          }}
          onCancel={() => setMostrarFin(false)}
        />

        <TextInput
          label="Comentario"
          value={comentario}
          onChangeText={setComentario}
          multiline
          style={styles.input}
        />

        <Button mode="contained" onPress={guardarLibro} style={styles.button}>
          Guardar Libro
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    backgroundColor: '#333' // gris medio
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
    margin: 20,
    borderRadius: 10
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 24
  },
  label: {
    color: 'white',
    marginTop: 10,
    marginBottom: 5
  },
  input: {
    backgroundColor: 'white',
    marginBottom: 12
  },
  picker: {
    backgroundColor: 'white',
    color: 'black',
    marginBottom: 10
  },
  button: {
    marginTop: 10,
    backgroundColor: '#ff6200'
  },
  buttonOutline: {
    marginTop: 10,
    borderColor: '#ffa94d'
  },
  dateLabel: {
    color: '#ffa94d',
    marginBottom: 5
  }
});

export default AgregarLibroScreen;
import React, { useState } from 'react';
import {
  View, StyleSheet, ScrollView, Dimensions, Alert
} from 'react-native';
import { TextInput, Button, Title, Text } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import API_URL from '../utils/api';
import { getToken } from '../utils/auth';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

const { width, height } = Dimensions.get('window');

const DetallesLibroScreen = ({ route, navigation }) => {
  const { libro } = route.params;
  const [titulo, setTitulo] = useState(libro.titulo);
  const [autor, setAutor] = useState(libro.autor);
  const [estado, setEstado] = useState(libro.estado);
  const [comentario, setComentario] = useState(libro.comentario || '');
  const [fechaInicio, setFechaInicio] = useState(libro.fechaInicio ? new Date(libro.fechaInicio) : null);
  const [fechaFin, setFechaFin] = useState(libro.fechaFin ? new Date(libro.fechaFin) : null);
  const [mostrarInicio, setMostrarInicio] = useState(false);
  const [mostrarFin, setMostrarFin] = useState(false);

  const actualizarLibro = async () => {
    const token = await getToken();
    try {
      const res = await fetch(`${API_URL}/libros/${libro.id}`, {
        method: 'PUT',
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
      else alert('Error al actualizar');
    } catch {
      alert('Error de conexión');
    }
  };

  const eliminarLibro = async () => {
    Alert.alert('Confirmar', '¿Eliminar este libro?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          const token = await getToken();
          try {
            const res = await fetch(`${API_URL}/libros/${libro.id}`, {
              method: 'DELETE',
              headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) navigation.goBack();
            else alert('Error al eliminar');
          } catch {
            alert('Error de conexión');
          }
        }
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.overlay}>
        <Title style={styles.title}>Editar Libro</Title>

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

        <Button mode="outlined" onPress={() => setMostrarInicio(true)} style={styles.buttonOutline}>
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

        <Button mode="outlined" onPress={() => setMostrarFin(true)} style={styles.buttonOutline}>
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

        <Button mode="contained" onPress={actualizarLibro} style={styles.button}>
          Guardar Cambios
        </Button>
        <Button mode="outlined" onPress={eliminarLibro} textColor="red" style={styles.buttonOutline}>
          Eliminar Libro
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
    backgroundColor: '#111'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
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
    marginTop: 10
  },
  dateLabel: {
    color: 'white',
    marginBottom: 5
  }
});

export default DetallesLibroScreen;
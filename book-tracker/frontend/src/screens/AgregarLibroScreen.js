import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { TextInput, Button, Title, Text } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import API_URL from '../utils/api';
import { getToken } from '../utils/auth';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

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
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Title>Agregar Libro</Title>

      <TextInput label="Título" value={titulo} onChangeText={setTitulo} />
      <TextInput label="Autor" value={autor} onChangeText={setAutor} style={{ marginTop: 10 }} />

      <Text style={{ marginTop: 10 }}>Estado:</Text>
      <Picker selectedValue={estado} onValueChange={setEstado}>
        <Picker.Item label="Por leer" value="por leer" />
        <Picker.Item label="Leyendo" value="leyendo" />
        <Picker.Item label="Completado" value="completado" />
      </Picker>

      <Button mode="outlined" onPress={() => setMostrarInicio(true)} style={{ marginTop: 10 }}>
        Seleccionar Fecha de Inicio
      </Button>
      {fechaInicio && (
        <Text style={{ marginBottom: 5 }}>
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

      <Button mode="outlined" onPress={() => setMostrarFin(true)} style={{ marginTop: 10 }}>
        Seleccionar Fecha de Fin
      </Button>
      {fechaFin && (
        <Text style={{ marginBottom: 5 }}>
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
        style={{ marginTop: 10 }}
      />

      <Button mode="contained" onPress={guardarLibro} style={{ marginTop: 20 }}>
        Guardar Libro
      </Button>
    </ScrollView>
  );
};

export default AgregarLibroScreen;
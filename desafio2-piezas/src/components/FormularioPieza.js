import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Platform,
  Pressable,
  Text,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import colores from '../utils/colors';

const FormularioPieza = ({ onAgregarPieza }) => {
  const [tipo, setTipo] = useState('');
  const [marca, setMarca] = useState('');
  const [serie, setSerie] = useState('');
  const [precio, setPrecio] = useState('');
  const [fecha, setFecha] = useState(null);
  const [mostrarPicker, setMostrarPicker] = useState(false);

  // Desafase zona horaria
  const formatearFechaLocal = (fecha) => {
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    return `${anio}-${mes}-${dia}`;
  };

  const manejarEnvio = () => {
    if (tipo && marca && serie && precio && fecha) {
      onAgregarPieza({
        id: Date.now().toString(),
        tipo,
        marca,
        serie,
        precio,
        fecha: formatearFechaLocal(fecha),
      });
      setTipo('');
      setMarca('');
      setSerie('');
      setPrecio('');
      setFecha(null);
    }
  };

  const mostrarFechaPicker = () => {
    setMostrarPicker(true);
  };

  const manejarCambioFecha = (event, fechaSeleccionada) => {
    setMostrarPicker(Platform.OS === 'ios');
    if (fechaSeleccionada) setFecha(fechaSeleccionada);
  };

  return (
    <View style={estilos.contenedor}>
      <Picker selectedValue={tipo} onValueChange={setTipo}>
        <Picker.Item label="Selecciona tipo de pieza" value="" />
        <Picker.Item label="Motor" value="Motor" />
        <Picker.Item label="Filtro" value="Filtro" />
        <Picker.Item label="Batería" value="Batería" />
      </Picker>

      <TextInput
        placeholder="Marca"
        value={marca}
        onChangeText={setMarca}
        style={estilos.entrada}
      />
      <TextInput
        placeholder="Número de Serie"
        value={serie}
        onChangeText={setSerie}
        style={estilos.entrada}
      />
      <TextInput
        placeholder="Precio"
        value={precio}
        onChangeText={setPrecio}
        keyboardType="numeric"
        style={estilos.entrada}
      />

      <Pressable onPress={mostrarFechaPicker} style={estilos.selectorFecha}>
        <Text style={fecha ? estilos.textoFecha : estilos.textoFechaPlaceholder}>
          {fecha ? formatearFechaLocal(fecha) : 'Seleccionar fecha de cambio'}
        </Text>
      </Pressable>

      {mostrarPicker && (
        <DateTimePicker
          value={fecha || new Date()}
          mode="date"
          display="default"
          onChange={manejarCambioFecha}
        />
      )}

      <Button title="Agregar Pieza" onPress={manejarEnvio} color={colores.primario} />
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: { padding: 10, backgroundColor: colores.gris },
  entrada: {
    borderWidth: 1,
    marginVertical: 5,
    padding: 8,
    borderRadius: 5,
    backgroundColor: colores.blanco,
  },
  selectorFecha: {
    padding: 10,
    backgroundColor: colores.blanco,
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 10,
  },
  textoFecha: { color: colores.negro },
  textoFechaPlaceholder: { color: '#888' },
});

export default FormularioPieza;
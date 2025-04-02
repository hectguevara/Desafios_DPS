import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import colors from '../utils/colors';

const PieceForm = ({ onAddPiece }) => {
  const [type, setType] = useState('');
  const [brand, setBrand] = useState('');
  const [serial, setSerial] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = () => {
    if (type && brand && serial && price && date) {
      onAddPiece({
        id: Date.now().toString(),
        type,
        brand,
        serial,
        price,
        date
      });
      // limpiar
      setType('');
      setBrand('');
      setSerial('');
      setPrice('');
      setDate('');
    }
  };

  return (
    <View style={styles.container}>
      <Picker selectedValue={type} onValueChange={setType}>
        <Picker.Item label="Selecciona tipo de pieza" value="" />
        <Picker.Item label="Motor" value="Motor" />
        <Picker.Item label="Filtro" value="Filtro" />
        <Picker.Item label="Batería" value="Batería" />
      </Picker>

      <TextInput placeholder="Marca" value={brand} onChangeText={setBrand} style={styles.input} />
      <TextInput placeholder="Número de Serie" value={serial} onChangeText={setSerial} style={styles.input} />
      <TextInput placeholder="Precio" value={price} onChangeText={setPrice} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Fecha de cambio (YYYY-MM-DD)" value={date} onChangeText={setDate} style={styles.input} />
      <Button title="Agregar Pieza" onPress={handleSubmit} color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: colors.gray },
  input: { borderWidth: 1, marginVertical: 5, padding: 8, borderRadius: 5, backgroundColor: colors.white }
});

export default PieceForm;
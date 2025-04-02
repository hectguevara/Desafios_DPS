import React from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';
import colores from '../utils/colors';

const PiezaItem = ({ pieza, onEliminar, onPresionar }) => {
  return (
    <TouchableOpacity onPress={onPresionar} style={estilos.item}>
      <View>
        <Text style={estilos.texto}>{pieza.tipo}</Text>
        <Text>{pieza.fecha}</Text>
      </View>
      <Button title="Eliminar" color={colores.peligro} onPress={() => onEliminar(pieza.id)} />
    </TouchableOpacity>
  );
};

const estilos = StyleSheet.create({
  item: {
    backgroundColor: colores.blanco,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2
  },
  texto: { fontWeight: 'bold' }
});

export default PiezaItem;
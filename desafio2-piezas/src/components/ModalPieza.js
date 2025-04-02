import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';
import colores from '../utils/colors';

const ModalPieza = ({ visible, pieza, onCerrar }) => {
  if (!pieza) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={estilos.centro}>
        <View style={estilos.modal}>
          <Text style={estilos.titulo}>{pieza.tipo}</Text>
          <Text>Marca: {pieza.marca}</Text>
          <Text>Serie: {pieza.serie}</Text>
          <Text>Precio: ${pieza.precio}</Text>
          <Text>Fecha: {pieza.fecha}</Text>
          <Button title="Cerrar" onPress={onCerrar} color={colores.primario} />
        </View>
      </View>
    </Modal>
  );
};

const estilos = StyleSheet.create({
  centro: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000099'
  },
  modal: {
    margin: 20,
    padding: 20,
    backgroundColor: colores.blanco,
    borderRadius: 10,
    elevation: 5
  },
  titulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 }
});

export default ModalPieza;
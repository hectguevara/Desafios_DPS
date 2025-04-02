import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';
import colors from '../utils/colors';

const PieceModal = ({ visible, piece, onClose }) => {
  if (!piece) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.center}>
        <View style={styles.modal}>
          <Text style={styles.title}>{piece.type}</Text>
          <Text>Marca: {piece.brand}</Text>
          <Text>Serie: {piece.serial}</Text>
          <Text>Precio: ${piece.price}</Text>
          <Text>Fecha: {piece.date}</Text>
          <Button title="Cerrar" onPress={onClose} color={colors.primary} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000099'
  },
  modal: {
    margin: 20,
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 5
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 }
});

export default PieceModal;
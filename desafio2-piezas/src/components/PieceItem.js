import React from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';
import colors from '../utils/colors';

const PieceItem = ({ piece, onDelete, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <View>
        <Text style={styles.text}>{piece.type}</Text>
        <Text>{piece.date}</Text>
      </View>
      <Button title="Eliminar" color={colors.danger} onPress={() => onDelete(piece.id)} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: colors.white,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2
  },
  text: { fontWeight: 'bold' }
});

export default PieceItem;
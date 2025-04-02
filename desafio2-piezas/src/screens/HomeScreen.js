import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import PieceForm from '../components/PieceForm';
import PieceItem from '../components/PieceItem';
import PieceModal from '../components/PieceModal';
import colors from '../utils/colors';

const HomeScreen = () => {
  const [pieces, setPieces] = useState([]);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const addPiece = (piece) => {
    const updated = [...pieces, piece].sort((a, b) => new Date(b.date) - new Date(a.date));
    setPieces(updated);
  };

  const deletePiece = (id) => {
    setPieces(pieces.filter(p => p.id !== id));
  };

  const openModal = (piece) => {
    setSelectedPiece(piece);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <PieceForm onAddPiece={addPiece} />
      <FlatList
        data={pieces}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PieceItem piece={item} onDelete={deletePiece} onPress={() => openModal(item)} />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay ninguna pieza, agregue una.</Text>
        }
      />
      <PieceModal visible={modalVisible} piece={selectedPiece} onClose={() => setModalVisible(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: colors.black,
    fontStyle: 'italic'
  }
});

export default HomeScreen;
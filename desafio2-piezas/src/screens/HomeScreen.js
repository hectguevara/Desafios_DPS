import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import FormularioPieza from '../components/FormularioPieza';
import PiezaItem from '../components/PiezaItem';
import ModalPieza from '../components/ModalPieza';
import colores from '../utils/colors';

const HomeScreen = () => {
  const [piezas, setPiezas] = useState([]);
  const [piezaSeleccionada, setPiezaSeleccionada] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const agregarPieza = (pieza) => {
    const actualizadas = [...piezas, pieza].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    setPiezas(actualizadas);
  };

  const eliminarPieza = (id) => {
    setPiezas(piezas.filter(p => p.id !== id));
  };

  const abrirModal = (pieza) => {
    setPiezaSeleccionada(pieza);
    setModalVisible(true);
  };

  return (
    <View style={estilos.contenedor}>
      <FormularioPieza onAgregarPieza={agregarPieza} />
      <FlatList
        data={piezas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PiezaItem pieza={item} onEliminar={eliminarPieza} onPresionar={() => abrirModal(item)} />
        )}
        ListEmptyComponent={
          <Text style={estilos.textoVacio}>No hay ninguna pieza, agregue una.</Text>
        }
      />
      <ModalPieza visible={modalVisible} pieza={piezaSeleccionada} onCerrar={() => setModalVisible(false)} />
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: { flex: 1, padding: 10 },
  textoVacio: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: colores.negro,
    fontStyle: 'italic'
  }
});

export default HomeScreen;
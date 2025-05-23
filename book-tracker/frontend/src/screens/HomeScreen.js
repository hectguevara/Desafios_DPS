import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { Text, Title, Card, Button, List } from 'react-native-paper';
import API_URL from '../utils/api';
import { getToken, clearToken } from '../utils/auth';

const HomeScreen = ({ navigation }) => {
  const [libros, setLibros] = useState([]);

  const cargarLibros = async () => {
    const token = await getToken();
    try {
      const res = await fetch(`${API_URL}/libros`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (res.ok) {
        setLibros(data);
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert('Error al cargar libros');
    }
  };

  const cerrarSesion = async () => {
    await clearToken();
    navigation.replace('Login');
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', cargarLibros);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ padding: 10 }}>
      <Title>Mis Libros</Title>

      <FlatList
        data={libros}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card
            style={{ marginVertical: 5 }}
            onPress={() => navigation.navigate('DetallesLibro', { libro: item })}
          >
            <Card.Content>
              <List.Item
                title={item.titulo}
                description={`Estado: ${item.estado}`}
              />
            </Card.Content>
          </Card>
        )}
      />

      <Button mode="contained" onPress={() => navigation.navigate('AgregarLibro')} style={{ marginTop: 10 }}>
        Agregar Libro
      </Button>

      <Button mode="outlined" onPress={cerrarSesion} style={{ marginTop: 10 }}>
        Cerrar Sesión
      </Button>
    </View>
  );
};

export default HomeScreen;
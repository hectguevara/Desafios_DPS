import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import AgregarLibroScreen from '../screens/AgregarLibroScreen';
import DetallesLibroScreen from '../screens/DetallesLibroScreen';

const Stack = createNativeStackNavigator();

const AppNavigation = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AgregarLibro" component={AgregarLibroScreen} />
      <Stack.Screen name="DetallesLibro" component={DetallesLibroScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigation;
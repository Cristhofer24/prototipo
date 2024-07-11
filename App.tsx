// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import InicioScreen from './screens/InicioScreen';
import CartasScreen from './screens/CartasScreen'; // Importa la pantalla CartasScreen y otras pantallas según sea necesario

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        {/* <Stack.Screen name="Inicio" component={InicioScreen} /> */}
        <Stack.Screen name="Cartas" component={CartasScreen} />
        {/* Agrega más pantallas aquí si es necesario */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

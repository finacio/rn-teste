import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from "./src/pages/Home"
import DetailScreen from "./src/pages/Details"

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          options={{ title: 'Marvel Heroes',           
            headerStyle: {
              backgroundColor: '#cc0c0d'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              textAlign: 'center'
            }
          }} 
          component={HomeScreen} 
          />

        <Stack.Screen 
          name="Details" 
          options={({ route }) => ({ title: route.params.name,           
            headerStyle: {
              backgroundColor: '#cc0c0d'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              textAlign: 'center',
              marginLeft: -20
            } })} 
          component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

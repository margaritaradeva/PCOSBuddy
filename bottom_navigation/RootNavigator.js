import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigation from './TabNavigation';
import { Development } from '../screens';
const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }} // default: no header
      >
        <Stack.Screen name="Go Back" component={TabNavigation} />
        <Stack.Screen
          name="Development"
          component={Development}
          options={{
            headerShown: true,
            title: 'Development',
            headerBackTitleVisible: false,
            headerTintColor: '#FF5B82',
            headerStyle: {
              backgroundColor: '#FFF',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

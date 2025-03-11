// RootNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignupScreen';
import TabNavigation from './TabNavigation'; // Home screen
import { BmiWeightScreen, Development, IrregularPeriodsScreen } from '../screens';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Set LoginScreen as the first/initial screen */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        {/* Home screen (your TabNavigation) */}
        <Stack.Screen name="Home" component={TabNavigation} />
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
        <Stack.Screen 
          name="IrregularPeriods" 
          component={IrregularPeriodsScreen} 
          options={{
            headerShown: true,
            title: 'Irregular Periods Tracker',
            headerBackTitleVisible: false,
            headerTintColor: '#FF5B82',
            headerStyle: {
              backgroundColor: '#FFF',
            },
          }}
        />
        <Stack.Screen 
          name="BMI" 
          component={BmiWeightScreen} 
          options={{
            headerShown: true,
            title: 'BMI & Weight Tracker',
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

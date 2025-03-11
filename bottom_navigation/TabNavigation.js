import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Provider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AIassistant, Home, Trackers, Tips, Settings, LoadingScreen } from '../screens';
import SignUpScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';

const Tab = createMaterialBottomTabNavigator();

export default function TabNavigation() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: 'pink',
          }}
          barStyle={{ backgroundColor: '#fff', zIndex: 1000 }}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home-outline" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Trackers"
            component={Trackers}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="chart-line" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Tips"
            component={Tips}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="lightbulb" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="AI"
            component={AIassistant}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="robot" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="cog-outline" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      </Provider>
    </GestureHandlerRootView>
  );
}

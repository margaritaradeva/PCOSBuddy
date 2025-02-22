// Import all of the necessary libraries, screens and components
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'; // Main navigation container and theming
import { Features, Home, LoadingScreen } from './screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Stack navigator
import { useEffect } from 'react'; // React hooks
import { LogBox } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignupScreen';
import { RootNavigator, TabNavigation } from './bottom_navigation';


LogBox.ignoreLogs(['new NativeEventEmitter']);
// Create a stack navigator instance
const Stack =  createNativeStackNavigator();

// Custom theme for the naviagtion container
const AppTheme = {
    ...DefaultTheme,
    colors: {
        background: 'white'
    }
};

// Main App component
export default function App() {
    // State management hooks using the zustand global state ,amagement hook.
    const initialised = false
    const authenticated = false
    return (
       <RootNavigator/>
            


    );



}
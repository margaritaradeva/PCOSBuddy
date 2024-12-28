// Import all of the necessary libraries, screens and components
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'; // Main navigation container and theming
import { LoadingScreen } from './screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Stack navigator
import { useEffect } from 'react'; // React hooks
import useGlobally from './assets/components' // Custom hook for global state management
import { LogBox } from 'react-native';
import TabNavigation from './assets/components/TabNavigation';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignupScreen';


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
        // Main navigation for the application
        <NavigationContainer theme={AppTheme}>
            {/* Loading screen when the app is not initialised yet */}
            <Stack.Navigator>
                {!initialised ? (
                <>
                  <Stack.Screen
                        name="Loading"
                        component={SignUpScreen}
                        options={{headerShown:false}}/>
                </>
                ) : !authenticated ? (

                <>
                {/* Sign In/Sign Up screeens when a user is not authenticated yet */}
                  <Stack.Screen
                        name="Log In"
                        component={TabNavigation}
                        options={{headerShown:false}}
                        />
                  <Stack.Screen
                        name='Sign Up'
                        component={LoadingScreen}
                        options={{headerShown:false}}/>
                </> 
                ) : (
                <>
                {/* When a user authenticates-navigate to the main screen of the application */}
                   <Stack.Screen
                        name="HomeScreen"
                        component={TabNavigation}
                        options={{headerShown:false}}/>

                    </>
                )}
               
            </Stack.Navigator>

        </NavigationContainer>


    );



}
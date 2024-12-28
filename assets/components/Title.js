import { StyleSheet, Text , View} from "react-native";
import { useFonts } from 'expo-font';

// Define the Title functional component
export default function Title ({ text, color, marginTop }) {
    // Define text style with dynamic color
    const textStyle = {
        ...styles.text,
        color: color,
        marginTop: marginTop,
    };
    const [fontsLoaded] = useFonts({
        'LeckerliOne-Regular': require('../fonts/LeckerliOne-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return <View><Text>Loading Fonts...</Text></View>;
    }
    // Return the Text component with specified style and text
    return (
        <Text style={textStyle}>
            {text}
        </Text>
    );
}

// Define styles for the component
const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontSize: 58,
        fontFamily: 'LeckerliOne-Regular',

    },
});
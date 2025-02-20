import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  FlatList, 
  SafeAreaView, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ImageBackground
} from 'react-native';
import { Title } from '../assets/components';
import { chatBackground } from '../assets/images';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  Easing
} from 'react-native-reanimated';

const ChatBubble = ({ message }) => {
  const isBot = message.sender === 'bot';
  return (
    <View style={[styles.bubble, isBot ? styles.botBubble : styles.userBubble]}>
      <Text style={styles.messageText}>{message.text}</Text>
    </View>
  );
};

const AIassistant = () => {
  const [messages, setMessages] = useState([
    { 
      id: '1', 
      text: "Hey, I'm your AI assistant to help you with any questions about PCOS.\n\nPlease note: I'm an AI assistant, so my answers might not be completely accurate.", 
      sender: 'bot' 
    }
  ]);
  const [inputText, setInputText] = useState('');

  // Shared value for animation inside the component
  const translateY = useSharedValue(0);
  const animationDuration = 12000;

  // Animation effect for logo
  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(20, { duration: animationDuration, easing: Easing.linear }),
        withTiming(0, { duration: animationDuration, easing: Easing.linear })
      ),
      -1,
      true
    );
  }, [translateY]);

  // Animated style for logo
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const handleSend = () => {
    if (inputText.trim() === '') return;
    const newMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user'
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputText('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        source={chatBackground} 
        style={styles.background}
      >
        <KeyboardAvoidingView 
          style={styles.innerContainer} 
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <Animated.View style={[animatedStyle, styles.titleContainer]}>
            <Title text="AI Assistant" color="#FF5B82" marginTop={'-4%'} />
          </Animated.View>
          <FlatList
            data={messages}
            renderItem={({ item }) => <ChatBubble message={item} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.chatContainer}
          />
          <View style={styles.inputContainer}>
            <TextInput 
              placeholder="Type your message..."
              value={inputText}
              onChangeText={setInputText}
              style={styles.input}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  innerContainer: {
    flex: 1,
  },
  titleContainer: {
    backgroundColor: '#FFF0F5', // Light pastel background for the title area
    paddingTop: 10,
    paddingBottom: 0,
    borderRadius: 10,
    margin: 10,
  },
  chatContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  bubble: {
    padding: 12,
    borderRadius: 20,
    marginBottom: 10,
    maxWidth: '75%',
  },
  botBubble: {
    backgroundColor: '#FFC1CC', // Soft pastel pink for bot messages
    alignSelf: 'flex-start'
  },
  userBubble: {
    backgroundColor: '#ADD8E6', // Soft pastel blue for user messages
    alignSelf: 'flex-end'
  },
  messageText: {
    fontSize: 16,
    color: '#000'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  sendButton: {
    backgroundColor: '#FF5B82',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginLeft: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});

export default AIassistant;

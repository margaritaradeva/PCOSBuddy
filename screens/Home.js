import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import { chatBackground } from '../assets/images';

const dailyTips = [
  "Remember to log your meals and exercise to better manage symptoms.",
  "Staying hydrated is crucial—aim for at least 8 cups of water a day.",
  "Try a short walk or stretch break every hour to combat fatigue.",
  "Include more fiber in your diet to help balance hormone levels.",
  "Keep track of your mood patterns to identify and reduce stress triggers.",
];

const tigerStories = [
  "Hi, I'm Tiggy! I used to struggle with unpredictable cycles and fatigue, but tracking my symptoms changed my life.",
  "By monitoring my diet and exercise, I discovered a holistic approach that improved my mood and energy.",
  "Today, I celebrate managing PCOS successfully. Every step counts—if I can do it, so can you!",
];

const Home = () => {
  // State for cycling through daily tips
  const [tipIndex, setTipIndex] = useState(0);
  // State for cycling through tiger stories
  const [storyIndex, setStoryIndex] = useState(0);

  // Fake data representing dashboard stats (6 items)
  const dashboardData = [
    { title: 'Cycle Length', value: '28 days', note: 'Normal' },
    { title: 'BMI', value: '25', note: 'Healthy' },
    { title: 'Mood Score', value: '80%', note: 'Stable' },
    { title: 'Fatigue Level', value: '60%', note: 'Moderate' },
    { title: 'Ovulation Day', value: '15', note: 'Expected' },
    { title: 'Stress Level', value: '70%', note: 'Elevated' },
  ];

  // Handlers to cycle through tips and stories
  const handleTipPress = () => {
    setTipIndex((prev) => (prev + 1) % dailyTips.length);
  };

  const handleStoryPress = () => {
    setStoryIndex((prev) => (prev + 1) % tigerStories.length);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={chatBackground} style={styles.background}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.title}>PCOS Buddy Dashboard</Text>
            <Text style={styles.subtitle}>Overview of Your Stats</Text>
          </View>

          {/* Daily Tip Section (Tap to cycle tips) */}
          <View style={styles.dailyTipSection}>
            <TouchableOpacity onPress={handleTipPress} activeOpacity={0.9}>
              <View style={styles.tipCard}>
                <Text style={styles.tipText}>{dailyTips[tipIndex]}</Text>
                <Text style={styles.tapHint}>(Tap for next tip)</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Tiger Thought and Animation Section */}
          <View style={styles.animationRow}>
            <TouchableOpacity
              onPress={handleStoryPress}
              activeOpacity={0.9}
              style={styles.thoughtBubble}
            >
              <Text style={styles.thoughtText}>{tigerStories[storyIndex]}</Text>
              <Text style={styles.tapHintBubble}>(Tap for more)</Text>
              <View style={styles.bubbleTail} />
            </TouchableOpacity>
            <View style={styles.tigerContainer}>
              <LottieView
                source={require('../assets/images/tiger.json')}
                autoPlay
                loop
                style={styles.tigerAnimation}
              />
            </View>
          </View>

          {/* Quick Actions Section */}
          <View style={styles.quickActionsSection}>
            <View style={styles.quickActionsContainer}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Log Symptoms</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Add Note</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Dashboard Cards (With Gradient) */}
          <View style={styles.dashboard}>
            {dashboardData.map((item, index) => (
              <LinearGradient
                key={index}
                colors={['#FFFFFF', '#FEE9F2']}
                style={styles.cardGradient}
              >
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardValue}>{item.value}</Text>
                  <Text style={styles.cardNote}>{item.note}</Text>
                </View>
              </LinearGradient>
            ))}
          </View>

          {/* Extra PCOS Resources Section */}
          <View style={styles.resourcesSection}>
            <Text style={styles.sectionHeader}>PCOS Resources</Text>
            <View style={styles.resourcesContainer}>
              <TouchableOpacity style={styles.resourceCard}>
                <Text style={styles.resourceTitle}>Lifestyle Tips</Text>
                <Text style={styles.resourceDesc}>
                  Explore diet & exercise plans that help regulate hormones.
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.resourceCard}>
                <Text style={styles.resourceTitle}>Doctor Finder</Text>
                <Text style={styles.resourceDesc}>
                  Find a PCOS-friendly specialist in your area.
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.resourceCard}>
                <Text style={styles.resourceTitle}>Community Forum</Text>
                <Text style={styles.resourceDesc}>
                  Chat with others managing PCOS.
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FF5B82',
    letterSpacing: 1,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    letterSpacing: 0.5,
  },
  dailyTipSection: {
    marginBottom: 30,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FF5B82',
    marginBottom: 12,
  },
  tipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#FF5B82',
    alignItems: 'center',
  },
  tipText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 8,
  },
  tapHint: {
    fontSize: 12,
    color: '#999',
  },
  // New styles for the thought bubble and animation row
  animationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  thoughtBubble: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    flex: 0.65,
    marginRight: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 4,
    position: 'relative',
  },
  thoughtText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    textAlign: 'left',
  },
  tapHintBubble: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
    textAlign: 'right',
  },
  bubbleTail: {
    position: 'absolute',
    bottom: -10,
    left: 20,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#fff',
  },
  tigerContainer: {
    flex: 0.35,
    alignItems: 'flex-end',
  },
  tigerAnimation: {
    width: 120,
    height: 120,
  },
  quickActionsSection: {
    marginBottom: 30,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: '#FF5B82',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 30,
    shadowColor: '#FF5B82',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  dashboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardGradient: {
    width: '48%',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 3, height: 8 },
    shadowRadius: 8,
    elevation: 3,
  },
  card: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF5B82',
    marginBottom: 6,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  cardNote: {
    fontSize: 13,
    color: '#777',
    marginTop: 6,
  },
  resourcesSection: {
    marginTop: 30,
    marginBottom: 10,
  },
  resourcesContainer: {
    marginTop: 10,
  },
  resourceCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 8,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#FF5B82',
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF5B82',
    marginBottom: 4,
  },
  resourceDesc: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});

export default Home;

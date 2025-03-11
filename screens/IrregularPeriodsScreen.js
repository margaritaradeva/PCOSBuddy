import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Replace these with your actual import paths
import { chatBackground } from '../assets/images'; 
// e.g., import chatBackground from '../assets/images/chatBackground.png'
import tigerAnimation from '../assets/images/tiger.json'; 
// e.g., import tigerAnimation from '../assets/images/tiger.json'

const { width } = Dimensions.get('window');

const IrregularPeriodsScreen = () => {
  // States for user input
  const [selectedDate, setSelectedDate] = useState(null);
  const [cycleLength, setCycleLength] = useState('');
  const [symptoms, setSymptoms] = useState('');

  // Example "Save" handler
  const handleSave = () => {
    if (!selectedDate) {
      Alert.alert('Please select a date on the calendar first.');
      return;
    }
    // Here you could store or send data to a backend
    console.log('Saved data:', {
      date: selectedDate,
      cycleLength,
      symptoms,
    });
    Alert.alert(
      'Noted!',
      `Date: ${selectedDate}\nMood: ${cycleLength}\nSymptoms: ${symptoms}`
    );
  };

  // Mark only the currently selected date
  const markedDates = selectedDate
    ? {
        [selectedDate]: {
          selected: true,
          selectedColor: '#FF5B82',
        },
      }
    : {};

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={chatBackground}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Lottie Animation */}
            <View style={styles.lottieContainer}>
              <LottieView
                source={tigerAnimation}
                autoPlay
                loop
                style={styles.lottie}
              />
            </View>

            <Text style={styles.headerText}>Irregular Periods Tracker</Text>
            <Text style={styles.subText}>
              Tracks cycle length, missed periods, and symptoms associated with irregular cycles.
            </Text>

            {/* Pinkish Calendar */}
            <View style={styles.calendarContainer}>
              <Calendar
                onDayPress={(day) => setSelectedDate(day.dateString)}
                markedDates={markedDates}
                theme={{
                  backgroundColor: 'transparent',
                  calendarBackground: 'transparent',
                  textSectionTitleColor: '#FF5B82',
                  todayTextColor: '#FF5B82',
                  dayTextColor: '#444',
                  monthTextColor: '#FF5B82',
                  arrowColor: '#FF5B82',
                  selectedDayBackgroundColor: '#FF5B82',
                  selectedDayTextColor: '#fff',
                  dotColor: '#FF5B82',
                }}
                style={styles.calendar}
              />
            </View>

            {/* Modern Stats Section (two rows of gradient cards) */}
            <View style={styles.statsContainer}>
              
              {/* Row 1: Missed Periods + Cycle Length */}
              <View style={styles.row}>
                {/* Missed Periods Card */}
                <LinearGradient
                  colors={['#FFF', '#FFE4EC']}
                  style={styles.statCard}
                >
                  <Text style={styles.statTitle}>Missed Periods</Text>
                  <Text style={styles.statValue}>2 this quarter</Text>
                </LinearGradient>

                {/* Current Cycle Length Card */}
                <LinearGradient
                  colors={['#FFF', '#FFE6F5']}
                  style={styles.statCard}
                >
                  <Text style={styles.statTitle}>Current Cycle</Text>
                  <Text style={styles.statValue}>35 days</Text>
                </LinearGradient>
              </View>

              {/* Row 2: Last Logged Symptoms */}
              <View style={styles.row}>
                <LinearGradient
                  colors={['#FFF', '#FFE9F8']}
                  style={[styles.statCard, { width: '100%' }]} // Full width for a single card
                >
                  <Text style={styles.statTitle}>Last Logged Symptoms</Text>
                  <Text style={styles.statValue}>Cramps, mood swings</Text>
                  <Text style={styles.viewMore}>View more previous symptoms...</Text>
                </LinearGradient>
              </View>
            </View>

            {/* User Inputs (Cycle Length + Symptoms) */}
            <View style={styles.inputsContainer}>
              <Text style={styles.inputLabel}>Mood:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="e.g. happy, anxious, tired ..."
                placeholderTextColor="#aaa"
                value={cycleLength}
                onChangeText={setCycleLength}
              />

              <Text style={styles.inputLabel}>Symptoms Noted:</Text>
              <TextInput
                style={[styles.input, styles.multilineInput]}
                placeholder="e.g. cramps, mood swings, heavy flow..."
                placeholderTextColor="#aaa"
                value={symptoms}
                onChangeText={setSymptoms}
                multiline
              />

              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>

            {/* Next Period / Next Ovulation Cards */}
            <View style={styles.cardsContainer}>
              <View style={[styles.infoCard, { backgroundColor: '#FFE3EA' }]}>
                <Text style={styles.cardTitle}>Next Period</Text>
                <Text style={styles.cardDate}>June 06</Text>
                <Text style={styles.cardNote}>(28 days left)</Text>
              </View>
              <View style={[styles.infoCard, { backgroundColor: '#FFF1E6' }]}>
                <Text style={styles.cardTitle}>Next Ovulation</Text>
                <Text style={styles.cardDate}>May 23</Text>
                <Text style={styles.cardNote}>(14 days left)</Text>
              </View>
              <View style={[styles.infoCard, { backgroundColor: '#EAF8FF' }]}>
                <Text style={styles.cardTitle}>Fertile Days</Text>
                <Text style={styles.cardDate}>May 21 — May 25</Text>
                <Text style={styles.cardNote}>(12 days left)</Text>
              </View>
              <View style={[styles.infoCard, { backgroundColor: '#FFE7F1' }]}>
                <Text style={styles.cardTitle}>Safe Days</Text>
                <Text style={styles.cardDate}>May 15 — May 20</Text>
                <Text style={styles.cardNote}>(6 days left)</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default IrregularPeriodsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 120, // Enough bottom padding to avoid tab overlap
  },
  lottieContainer: {
    width: width * 0.5,
    height: width * 0.5,
    marginTop: 30,
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
  headerText: {
    fontSize: 24,
    color: '#FF5B82',
    fontWeight: 'bold',
    marginTop: -10,
    textAlign: 'center',
  },
  subText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  calendarContainer: {
    width: width * 0.9,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    marginTop: 10,
    paddingVertical: 10,
    // Shadows
    shadowColor: '#FF5B82',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 15,
  },
  calendar: {
    borderRadius: 20,
  },

  /* Modern Stats */
  statsContainer: {
    width: width * 0.9,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statCard: {
    width: '48%',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 12,
    // Shadows
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 2,
  },
  statTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF5B82',
    marginBottom: 4,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  viewMore: {
    fontSize: 13,
    color: '#888',
    marginTop: 8,
    textAlign: 'center',
    fontStyle: 'italic',
  },

  /* User Inputs */
  inputsContainer: {
    width: width * 0.9,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    // Shadows
    shadowColor: '#FF5B82',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  inputLabel: {
    fontSize: 14,
    color: '#FF5B82',
    marginTop: 6,
  },
  input: {
    backgroundColor: '#fff',
    marginTop: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,91,130,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: '#333',
  },
  multilineInput: {
    height: 60,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#FF5B82',
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  /* Next Period / Ovulation Cards */
  cardsContainer: {
    width: width * 0.9,
    marginTop: 5,
    marginBottom: 10,
  },
  infoCard: {
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    // Shadows
    shadowColor: '#FF5B82',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF5B82',
    marginBottom: 3,
  },
  cardDate: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  cardNote: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
});

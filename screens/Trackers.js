import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { chatBackground, water } from '../assets/images';

const data = [
  { id: '1',  title: 'Irregular Periods',       description: 'Tracks cycle length, missed periods, and symptoms associated with irregular cycles.', screen: 'IrregularPeriods' },
  { id: '2',  title: 'BMI & Weight',            description: 'Monitors BMI changes, commonly affected in PCOS.', screen: 'BMI' },
  { id: '3',  title: 'Infertility Tracker',     description: 'Records fertility treatments, ovulation days, and relevant hormone levels.', screen: 'Development' },
  { id: '4',  title: 'Cervical Mucus',          description: 'Tracks cervical mucus changes to identify fertile window.', screen: 'Development' },
  { id: '5',  title: 'Cysts on Ovaries',        description: 'Monitors ovarian cyst development, size, and associated symptoms.', screen: 'Development' },
  { id: '6',  title: 'Acne Tracker',            description: 'Tracks hormonal acne flare-ups and possible triggers.', screen: 'Development' },
  { id: '7',  title: 'Skin Changes',            description: 'Observes PCOS-related skin conditions like acanthosis nigricans.', screen: 'Development' },
  { id: '8',  title: 'Excess Hair Growth',      description: 'Logs hirsutism (unwanted hair growth) patterns.', screen: 'Development' },
  { id: '9',  title: 'Ovulation & Libido',      description: 'Monitors ovulation patterns and libido changes.', screen: 'Development' },
  { id: '10', title: 'Insulin Resistance',      description: 'Tracks glucose levels & insulin resistance indicators.', screen: 'Development' },
  { id: '11', title: 'Blood Pressure',          description: 'Monitors blood pressure which can be elevated in PCOS.', screen: 'Development' },
  { id: '12', title: 'Pelvic Pain',             description: 'Keeps a record of pelvic or abdominal pain frequency.', screen: 'Development' },
  { id: '13', title: 'Headaches/Migraines',     description: 'Tracks headache severity & potential triggers.', screen: 'Development' },
  { id: '14', title: 'Joint Pain',              description: 'Logs any joint pain or stiffness related to inflammation.', screen: 'Development' },
  { id: '15', title: 'Digestive Issues',        description: 'Tracks nausea, bloating, or other GI symptoms.', screen: 'Development' },
  { id: '16', title: 'Mood Swings',             description: 'Logs emotional fluctuations to spot hormonal correlations.', screen: 'Development' },
  { id: '17', title: 'Fatigue Levels',          description: 'Records daily fatigue intensity and possible triggers.', screen: 'Development' },
  { id: '18', title: 'Anxiety & Stress',        description: 'Notes stress levels that may worsen PCOS symptoms.', screen: 'Development' },
];

// Basic single-column layout
const Trackers = ({ navigation }) => {
  const [showInfo, setShowInfo] = useState(false);

  const handlePress = (screen) => {
    if (navigation) {
      navigation.navigate(screen);
    } else {
      console.log(`Navigate to ${screen}`);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cardWrapper}
      onPress={() => handlePress(item.screen)}
      activeOpacity={0.9}
    >
      <LinearGradient colors={['#FFFFFF', '#FEE9F2']} style={styles.cardGradient}>
        <Image source={water} style={styles.image} resizeMode="contain" />
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={chatBackground} style={styles.background} resizeMode="cover">
        {/* Use a slight overlay so the background is still visible */}
        <View style={styles.overlay}>
          
          {/* Header */}
          <View style={styles.headerRow}>
            <Text style={styles.header}>Trackers</Text>
            <View style={styles.infoContainer}>
              <TouchableOpacity onPress={() => setShowInfo(!showInfo)}>
                <Text style={styles.infoIcon}>i</Text>
              </TouchableOpacity>
              {showInfo && (
                <View style={styles.tooltip}>
                  <Text style={styles.tooltipText}>
                    Track various PCOS symptoms here. Tap a tracker for more details or to log info!
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* FlatList */}
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // fallback background
  },
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.2)', // Light overlay so background is still visible
    paddingTop: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FF5B82',
    textAlign: 'center',
  },
  infoContainer: {
    marginLeft: 10,
    marginTop: -6,
    position: 'relative',
  },
  infoIcon: {
    fontSize: 16,
    color: '#FF5B82',
    backgroundColor: '#FFF',
    borderRadius: 10,
    width: 24,
    height: 24,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#FF5B82',
  },
  tooltip: {
    position: 'absolute',
    top: 30,
    right: 0,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    width: 220,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    zIndex: 6,
  },
  tooltipText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 10, // So it doesn’t overlap bottom tabs
    alignItems: 'center',
  },
  cardWrapper: {
    width: CARD_WIDTH,
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  cardGradient: {
    padding: 20,
    alignItems: 'center',
    shadowColor: '#FF5B82',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 91, 130, 0.2)',
  },
  image: {
    width: CARD_WIDTH * 0.4,
    height: CARD_WIDTH * 0.3,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF5B82',
    textAlign: 'center',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
});

export default Trackers;

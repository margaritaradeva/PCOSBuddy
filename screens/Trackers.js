import React, { useState } from 'react';
import { 
  SafeAreaView,
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  Dimensions,
  ImageBackground 
} from 'react-native';
import { chatBackground, water } from '../assets/images';
import Tips from './Tips';

const trackers = [
  {
    id: '1',
    title: 'Water Tracker',
    description: 'Track your daily water intake.',
    image: water,
    screen: Tips,
  },
  {
    id: '2',
    title: 'BMI Tracker',
    description: 'Monitor your BMI.',
    image: water,
    screen: Tips,
  },
  {
    id: '3',
    title: 'Food Tracker',
    description: 'Log your meals.',
    image: water,
    screen: Tips,
  },
];

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
    <TouchableOpacity style={styles.card} onPress={() => handlePress(item.screen)}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={chatBackground} style={styles.background}>
        <View style={styles.overlay}>
          <View style={styles.headerRow}>
            <Text style={styles.header}>Trackers</Text>
            <View style={styles.infoContainer}>
              <TouchableOpacity onPress={() => setShowInfo(!showInfo)}>
                <Text style={styles.infoIcon}>i</Text>
              </TouchableOpacity>
              {showInfo && (
                <View style={styles.tooltip}>
                  <Text style={styles.tooltipText}>
                    Tap a tracker card to access detailed logs and insights about your progress.
                  </Text>
                </View>
              )}
            </View>
          </View>
          <FlatList
            data={trackers}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');
const cardWidth = width * 0.85;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingVertical: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    position: 'relative',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF5B82',
    textAlign: 'center',
    marginBottom: 10,
  },
  infoContainer: {
    marginLeft: 5,
    marginTop: -8,
    position: 'relative',
  },
  infoIcon: {
    fontSize: 16,
    color: '#FF5B82',
    backgroundColor: '#FFF',
    borderRadius: 10,
    width: 20,
    height: 20,
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#FF5B82',
  },
  tooltip: {
    position: 'absolute',
    top: 25,
    right: 0,
    backgroundColor: '#FFF',
    padding: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    width: 220,
    zIndex: 1,
  },
  tooltipText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  listContainer: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  card: {
    width: cardWidth,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#FF5B82',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 91, 130, 0.2)',
  },
  image: {
    width: cardWidth * 0.6,
    height: cardWidth * 0.6,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#FF5B82',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
});

export default Trackers;

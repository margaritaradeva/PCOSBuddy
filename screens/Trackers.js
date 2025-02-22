import React, { useState } from 'react';
import { 
  SafeAreaView,
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Dimensions,
  ImageBackground 
} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { chatBackground, water } from '../assets/images';
  
const initialTrackers = [
  {
    id: '1',
    title: 'Irregular Periods',
    description: 'Tracks cycle length, missed periods, and symptoms associated with irregular cycles.',
    screen: 'Development',
  },
  {
    id: '2',
    title: 'Ovulation & Libido Tracker',
    description: 'Monitors ovulation via line graphs, with indicators for ovulation days.',
    screen: 'Development',
  },
  {
    id: '3',
    title: 'Infertility Tracker',
    description: 'Monitors all aspects of fertility, such as ovulation, cervical mucus, and fertility treatments.',
    screen: 'Development',
  },
  {
    id: '4',
    title: 'Cervival Mucus Tracker',
    description: 'Helps users identify their fertile window and ovulation by tracking cervical mucus consistency.',
    screen: 'Development',
  },
  {
    id: '5',
    title: 'Cysts on Ovaries',
    description: 'Tracks ovarian cysts development, size, and associated symptoms.',
    screen: 'Development',
  },
  {
    id: '6',
    title: 'Acne Tracker',
    description: 'Monitors acne flare-ups triggered by hormonal imbalances.',
    screen: 'Development',
  },
  {
    id: '7',
    title: 'PCOC-related Skin Conditions',
    description: 'Tracks skin changes related to PCOS, like acanthosis.',
    screen: 'Development',
  },
  {
    id: '8',
    title: 'Skin Texture & Oiliness',
    description: 'Monitors changes in skin texture and oil production due to hormonal shifts in PCOS.',
    screen: 'Development',
  },
  {
    id: '9',
    title: 'Excess Hair Growth (Hirsutism)',
    description: 'Tracks unwanted hair growth often caused by PCOS.',
    screen: 'Development',
  },
  {
    id: '10',
    title: 'BMI Tracker',
    description: 'Tracks BMI to monitor weight changes, which are a common issue with PCOS.',
    screen: 'Development',
  },
  {
    id: '11',
    title: 'Insulin Resistance Tracker',
    description: 'Monitors insulin resistance, common in PCOS, which can affect weight and metabolic health.',
    screen: 'Development',
  },
  {
    id: '12',
    title: 'Blood Pressure',
    description: 'Monitors blood pressure, as hypertension is common in women with PCOS.',
    screen: 'Development',
  },
  {
    id: '13',
    title: 'Pelvic Pain Tracker',
    description: 'Monitors pelvic pain, often experienced with PCOS or endometriosis.',
    screen: 'Development',
  },
  {
    id: '14',
    title: 'Headaches/Migranes',
    description: 'Tracks frequency, severity, and triggers of headaches or migraines, often caused by hormonal fluctuations.',
    screen: 'Development',
  },
  {
    id: '15',
    title: 'Joint Pain',
    description: 'Monitors joint pain or stiffness related to inflammation from PCOS.',
    screen: 'Development',
  },
  {
    id: '16',
    title: 'Nausea & Digestive Issues',
    description: 'Tracks nausea, bloating, and other digestive issues related to PCOS.',
    screen: 'Development',
  },
  {
    id: '17',
    title: 'Mood Swings',
    description: 'Monitors emotional fluctuations.',
    screen: 'Development',
  },
  {
    id: '18',
    title: 'Fatigue',
    description: 'Tracks fatigue levels and how they affect daily activities.',
    screen: 'Development',
  },
  {
    id: '19',
    title: 'Anxiety & Stress',
    description: 'Monitors anxiety and stress, which can worsen PCOS symptoms.',
    screen: 'Development',
  },
];

const Trackers = ({ navigation }) => {
  const [data, setData] = useState(initialTrackers);
  const [showInfo, setShowInfo] = useState(false);

  const handlePress = (screen) => {
    if (navigation) {
      navigation.navigate(screen);
    } else {
      console.log(`Navigate to ${screen}`);
    }
  };

  const renderItem = ({ item, drag, isActive }) => (
    <TouchableOpacity
      style={[styles.card, isActive && styles.activeCard]}
      onLongPress={drag}
      onPress={() => handlePress(item.screen)}
    >
      <Image source={water} style={styles.image} resizeMode="contain" />
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
                    Each tracker on this page will help you manage your PCOS symptoms better. To reorder trackers, simply hold and drag them.
                  </Text>
                </View>
              )}
            </View>
          </View>
          <DraggableFlatList
            data={data}
            onDragEnd={({ data }) => setData(data)}
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
    backgroundColor: 'rgb(249, 237, 252)',
    paddingVertical: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF5B82',
    textAlign: 'center',
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
    zIndex: 6,
  },
  tooltipText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  listContainer: {
    paddingBottom: 10,
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
  activeCard: {
    opacity: 0.8,
  },
  image: {
    width: cardWidth * 0.4,
    height: cardWidth * 0.3,
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

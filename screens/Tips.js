import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground
} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { chatBackground } from '../assets/images';
import { Title } from '../assets/components';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  Easing
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
// We'll keep the card width at ~75% for a nice horizontal carousel feel
const CARD_WIDTH = width * 0.75;

// Extra-long tips data
const initialTips = [
  {
    id: '1',
    title: 'Hydration & Hormones',
    description:
      'Hydration is crucial for everyone, but especially for those with PCOS. ' +
      'Adequate water intake helps balance hormones, reduce bloating, and support metabolism. ' +
      'Try flavoring your water with fruits or herbs (like mint, lemon, or berries) for a refreshing twist. ' +
      'This not only keeps you hydrated, but also provides additional antioxidants and micronutrients ' +
      'to support hormonal health. Aim for at least 8 cups a day, but listen to your body—thirst is a signal ' +
      'you should not ignore. Staying hydrated can also reduce sugar cravings, which often worsen PCOS symptoms.',
  },
  {
    id: '2',
    title: 'Optimizing Breakfast',
    description:
      'Many studies suggest that a high-protein, moderate-fat breakfast can stabilize blood sugar levels ' +
      'and improve insulin sensitivity throughout the day—vital for managing PCOS. Consider incorporating ' +
      'eggs, Greek yogurt, or protein shakes into your morning routine. Adding leafy greens, healthy fats ' +
      '(such as avocado), or fiber-rich berries can further help maintain a stable glucose curve. ' +
      'Skipping breakfast or choosing high-sugar cereals might lead to midday energy crashes and cravings, ' +
      'so plan carefully for a nourishing start!',
  },
  {
    id: '3',
    title: 'Muscle Matters',
    description:
      'While cardio is great for heart health, strength training plays a key role in insulin sensitivity ' +
      'and hormone regulation. Building lean muscle mass can significantly improve the body’s ability ' +
      'to process glucose and manage PCOS symptoms like weight gain and fatigue. Even short 20-minute ' +
      'resistance workouts two to three times a week can yield noticeable benefits. Use resistance bands, ' +
      'dumbbells, or even bodyweight exercises like squats and push-ups for an effective home routine. ' +
      'Remember to rest adequately—muscle repair is where the magic happens!',
  },
  {
    id: '4',
    title: 'Inositol Insights',
    description:
      'Inositol supplements (Myo-Inositol and D-Chiro Inositol) are becoming increasingly popular in ' +
      'the PCOS community. Research suggests they may help reduce insulin resistance, support healthy ' +
      'ovulation, and even improve fertility. Always consult with your healthcare provider before adding ' +
      'new supplements, as dosage and ratios can vary based on individual needs and existing treatments. ' +
      'Some users report improved skin and mood, but keep track of your own body’s response to see if ' +
      'it’s the right fit for you.',
  },
  {
    id: '5',
    title: 'Mindful Snacking & Blood Sugar Control',
    description:
      'For PCOS, keeping blood sugar levels stable is critical. Mindful snacking means choosing ' +
      'low-glycemic, protein- or fiber-rich options—like almonds, seeds, cheese sticks, or vegetables ' +
      'with hummus—instead of reaching for sweet or highly processed foods. Frequent insulin spikes ' +
      'can worsen hormonal imbalances and trigger fatigue or mood swings. Pre-portion healthy snacks ' +
      'to avoid mindless grazing and keep them accessible—like in your purse or at your desk—for when ' +
      'hunger strikes!',
  },
  {
    id: '6',
    title: 'Stress Management & Cortisol Reduction',
    description:
      'Stress is a silent driver of hormonal chaos. When stress hormones like cortisol stay elevated, ' +
      'they can disrupt the delicate balance of reproductive hormones, potentially worsening PCOS ' +
      'symptoms like irregular cycles, acne, and fatigue. Find stress-relief techniques that resonate ' +
      'with you—this might be yoga, guided meditation, journaling, or even taking a quiet walk in nature. ' +
      'Consistency is key: daily 5-minute “mini-breaks” can have a cumulative positive effect on your ' +
      'well-being and hormone balance.',
  },
  {
    id: '7',
    title: 'Journaling & Cycle Tracking',
    description:
      'Tracking your symptoms, emotional states, and cycle patterns can reveal important correlations. ' +
      'PCOS often leads to irregular periods, so a journal or tracker app can help you spot potential ' +
      'triggers or improvements. Record details like sleep quality, diet, exercise, and mood. ' +
      'This data can be valuable when discussing treatment options with your healthcare provider ' +
      'because it provides a real-world picture of how your lifestyle interacts with your condition. ' +
      'Over time, you’ll become more attuned to your body’s cues and patterns.',
  },
  {
    id: '8',
    title: 'Stay Proactive with Check-Ups',
    description:
      'Because PCOS can affect multiple systems in the body, routine check-ups and lab tests are vital. ' +
      'Keep an eye on key indicators like fasting glucose, cholesterol, and hormone panels to catch ' +
      'imbalances early. Regular pelvic ultrasounds can monitor ovarian cysts and endometrial thickness. ' +
      'Early detection often means more effective management strategies in the long run. Build a ' +
      'relationship with a trusted healthcare professional who understands the complexities of PCOS.',
  },
  {
    id: '9',
    title: 'Sleep: Your Secret Weapon',
    description:
      'Quality sleep is not a luxury—it’s a necessity for hormone regulation. Aim for 7–9 hours ' +
      'of uninterrupted rest nightly. Poor or insufficient sleep is linked to higher insulin resistance, ' +
      'weight gain, and increased stress hormones—all detrimental to PCOS management. Try establishing ' +
      'a consistent bedtime routine: dim lights, limit screen time an hour before bed, and create a ' +
      'peaceful environment to let your mind and body wind down.',
  },
  {
    id: '10',
    title: 'Find a Support Network',
    description:
      'Mental and emotional support can make a world of difference. Whether it’s an online forum, a local ' +
      'meetup, or a friend who also has PCOS, connecting with others who understand the journey can ' +
      'alleviate stress and foster resilience. Share experiences, tips, and even recipes. ' +
      'A sense of community reminds you that you’re not alone, and that encouragement can be ' +
      'a powerful motivator for healthier habits and self-care.',
  },
];

const Tips = () => {
  const [tips, setTips] = useState(initialTips);
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
  const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateY: translateY.value }],
      };
    });
  // The DraggableFlatList item
  const renderItem = ({ item, drag, isActive }) => (
    <TouchableOpacity
      style={[styles.card, isActive && styles.activeCard]}
      onLongPress={drag}
      activeOpacity={0.9}
    >
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={chatBackground}
        style={styles.background}
        resizeMode="cover"
      >
        {/* Lower overlay opacity to see the background more clearly */}
        <View style={styles.overlay}>
          <Animated.View style={[animatedStyle, styles.titleContainer]}>
                      <Title text="PCOS Tips   " color="#FF5B82" marginTop={'-4%'} />
                    </Animated.View>
          <Text style={styles.subheader}>
            Tips to help you manage your PCOS.
          </Text>

          <DraggableFlatList
            data={tips}
            onDragEnd={({ data }) => setTips(data)}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={styles.listContainer}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  // Heavily reduced overlay so background is actually visible
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(249, 237, 252, 0.2)',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 90, // Enough to avoid bottom tabs overlap
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FF5B82',
    marginBottom: 4,
  },
  subheader: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
    marginTop:15,
    alignItems:'center'
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 80, // Additional bottom spacing for horizontal scroll
  },
  // Each card is somewhat transparent so you can still see the background
  card: {
    width: CARD_WIDTH,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    padding: 15,
    marginHorizontal: 10,
    marginTop:40,
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
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF5B82',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 15,
    color: '#555',
    textAlign: 'justify',
    lineHeight: 22,
  },
  titleContainer: {
    backgroundColor: '#FFF0F5', // Light pastel background for the title area
    paddingTop: 1,
    paddingBottom: 0,
    borderRadius: 10,
    margin: 10,
  },
});

export default Tips;

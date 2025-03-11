import React, { useState, useEffect } from 'react';
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
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LineChart } from 'react-native-chart-kit';

// Example imports (update with your actual file paths)
import { chatBackground } from '../assets/images';
// e.g., import chatBackground from '../assets/images/chatBackground.png'
import tigerAnimation from '../assets/images/tiger.json';
// e.g., import tigerAnimation from '../assets/images/tiger.json'

const { width } = Dimensions.get('window');
const chartWidth = width * 0.9;

const BmiWeightScreen = () => {
  // User inputs
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  // Calculated BMI
  const [computedBmi, setComputedBmi] = useState('');

  // "Database": an array of logs. Each entry: { date, weight, bmi }
  const [logs, setLogs] = useState([]);

  // Example static stats
  const [goalWeight] = useState('65 kg');

  // On mount, you might load logs from async storage or an API, etc.
  useEffect(() => {
    // For now, just start with a couple of example logs
    setLogs([
      { date: '2025-03-01', weight: 70, bmi: 25.7 },
      { date: '2025-03-03', weight: 69, bmi: 25.3 },
      { date: '2025-03-05', weight: 72, bmi: 26.4 },
      { date: '2025-03-06', weight: 69, bmi: 25.3 },
      { date: '2025-03-08', weight: 67.5, bmi: 24.8 },
    ]);
  }, []);

  /**
   * Simple BMI calculation (metric):
   * BMI = weight (kg) / [height (m)]^2
   * e.g. weight=70, height=170 -> 70 / (1.7*1.7) = 24.22
   */
  const handleComputeBmi = () => {
    if (!weight || !height) {
      Alert.alert('Please enter both weight (kg) and height (cm).');
      return;
    }
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // cm -> m
    if (isNaN(w) || isNaN(h) || h <= 0) {
      Alert.alert('Invalid values. Please enter numeric weight/height.');
      return;
    }
    const result = w / (h * h);
    const rounded = Math.round(result * 10) / 10; // 1 decimal place
    setComputedBmi(rounded.toString());
  };

  /**
   * Save the computed data into logs
   */
  const handleSave = () => {
    if (!computedBmi) {
      Alert.alert('Compute your BMI first before saving.');
      return;
    }
    // We'll create an entry with the current date/time
    const currentDate = new Date().toISOString().split('T')[0]; // e.g. "2025-03-11"
    const newLog = {
      date: currentDate,
      weight: parseFloat(weight),
      bmi: parseFloat(computedBmi),
    };

    setLogs((prevLogs) => [...prevLogs, newLog]);

    // Reset inputs if you like
    // setWeight('');
    // setHeight('');
    // setComputedBmi('');

    Alert.alert(
      'Saved!',
      `Weight: ${weight}\nHeight: ${height}\nBMI: ${computedBmi}\n(${currentDate})`
    );
  };

  /**
   * Convert logs into chart data
   * We’ll chart BMI over time (in chronological order).
   */
  const getChartData = () => {
    // Sort logs by date to ensure chronological order
    const sortedLogs = [...logs].sort((a, b) => new Date(a.date) - new Date(b.date));

    const labels = sortedLogs.map((entry) => entry.date.slice(5)); // e.g. "03-01"
    const bmiValues = sortedLogs.map((entry) => entry.bmi);

    return {
      labels,
      datasets: [
        {
          data: bmiValues,
          color: () => '#FF5B82', // pinkish line color
          strokeWidth: 3,
        },
      ],
    };
  };

  // For example, last log can fill "Last Logged BMI"
  const lastLog = logs[logs.length - 1];

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={chatBackground} style={styles.background} resizeMode="cover">
        <View style={styles.overlay}>
          <ScrollView contentContainerStyle={styles.scrollContent}>

            {/* Lottie Animation */}
            <View style={styles.lottieContainer}>
              <LottieView source={tigerAnimation} autoPlay loop style={styles.lottie} />
            </View>

            <Text style={styles.headerText}>BMI & Weight Tracker</Text>
            <Text style={styles.subText}>Monitors BMI changes, commonly affected in PCOS.</Text>

            {/* Gradient Cards: Stats (two rows) */}
            <View style={styles.statsContainer}>
              {/* Row 1 */}
              <View style={styles.row}>
                {/* Last Logged BMI */}
                <LinearGradient colors={['#FFF', '#FFE4EC']} style={styles.statCard}>
                  <Text style={styles.statTitle}>Last Logged BMI</Text>
                  <Text style={styles.statValue}>
                    {lastLog ? lastLog.bmi.toFixed(1) : 'N/A'}
                  </Text>
                </LinearGradient>

                {/* Goal Weight */}
                <LinearGradient colors={['#FFF', '#FFE6F5']} style={styles.statCard}>
                  <Text style={styles.statTitle}>Goal Weight</Text>
                  <Text style={styles.statValue}>{goalWeight}</Text>
                </LinearGradient>
              </View>

              {/* Row 2 */}
              <View style={styles.row}>
                <LinearGradient colors={['#FFF', '#FFE9F8']} style={styles.statCard}>
                  <Text style={styles.statTitle}>Last Logged Weight</Text>
                  <Text style={styles.statValue}>
                    {lastLog ? `${lastLog.weight} kg` : 'N/A'}
                  </Text>
                </LinearGradient>

                {/* Example placeholder or extra stat */}
                <LinearGradient colors={['#FFF', '#FFE3EA']} style={styles.statCard}>
                  <Text style={styles.statTitle}>Number of Entries</Text>
                  <Text style={styles.statValue}>{logs.length}</Text>
                </LinearGradient>
              </View>
            </View>

            {/* BMI Chart */}
            <View style={styles.chartContainer}>
              <LinearGradient colors={['#FFF', '#FFF1F7']} style={styles.chartGradient}>
                <Text style={styles.chartTitle}>BMI Trend</Text>
                <LineChart
                  data={getChartData()}
                  width={chartWidth}
                  height={220}
                  chartConfig={{
                    backgroundGradientFrom: '#FFF1F7',
                    backgroundGradientTo: '#FFF',
                    color: () => '#FF5B82',
                    labelColor: () => '#777',
                    propsForDots: {
                      r: '4',
                      strokeWidth: '2',
                      stroke: '#FF5B82',
                    },
                  }}
                  style={styles.lineChart}
                  bezier
                />
              </LinearGradient>
            </View>

            {/* User Inputs Section */}
            <View style={styles.inputsContainer}>
              <Text style={styles.inputLabel}>Enter Current Weight (kg):</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="e.g. 68"
                placeholderTextColor="#aaa"
                value={weight}
                onChangeText={setWeight}
              />

              <Text style={styles.inputLabel}>Enter Height (cm):</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="e.g. 165"
                placeholderTextColor="#aaa"
                value={height}
                onChangeText={setHeight}
              />

              {/* Display computed BMI */}
              {computedBmi.length > 0 && (
                <Text style={styles.computedBmiText}>Your BMI is: {computedBmi}</Text>
              )}

              {/* Buttons row */}
              <View style={styles.buttonsRow}>
                <TouchableOpacity style={styles.computeButton} onPress={handleComputeBmi}>
                  <Text style={styles.buttonText}>Compute BMI</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>

          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default BmiWeightScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(255,255,255,0.3)' },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 120,
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
    alignItems: 'center',
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
  chartContainer: {
    width: width * 0.9,
    marginBottom: 20,
  },
  chartGradient: {
    borderRadius: 15,
    padding: 15,
    // Shadows
    shadowColor: '#FF5B82',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF5B82',
    marginBottom: 8,
    textAlign: 'center',
  },
  lineChart: {
    borderRadius: 10,
  },
  inputsContainer: {
    width: width * 0.9,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
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
  computedBmiText: {
    fontSize: 15,
    color: '#333',
    marginVertical: 10,
    textAlign: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  computeButton: {
    backgroundColor: '#FF5B82',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  saveButton: {
    backgroundColor: '#FF5B82',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Development = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Sorry, this page is under development. Please check back later!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default Development;

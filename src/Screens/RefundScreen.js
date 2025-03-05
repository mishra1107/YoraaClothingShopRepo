import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RefundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>No order is delivered yet</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  message: {
    fontSize: 18,
    color: '#555',
  },
});

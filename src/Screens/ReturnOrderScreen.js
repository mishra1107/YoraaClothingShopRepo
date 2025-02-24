import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ReturnOrderScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>No order placed yet</Text>
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

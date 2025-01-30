import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Using Material Icons for the arrow

const JustForYou = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {/* Divider Line */}
      <View style={styles.divider} />

      {/* Text and Arrow */}
      <View style={styles.content}>
        <Text style={styles.text}>JUST FOR YOU</Text>
        <Icon name="chevron-right" size={20} color="#000" />
      </View>
    </TouchableOpacity>
  );
};

export default JustForYou;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginBottom: 10,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
    color: '#000',
  },
});

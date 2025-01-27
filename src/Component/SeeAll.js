import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'; // Ensure AntDesign is installed

const SeeAll = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <View style={styles.leftBorder} /> {/* Blue left border */}
      <View style={styles.content}>
        <Text style={styles.text}>SEE ALL</Text>
        <Icon name="arrowright" size={16} color="#000" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginStart:20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    // overflow: 'hidden', // Ensures the left border stays within the button
    width: 150, // Adjust width as needed
    height: 40, // Adjust height as needed
  },
  leftBorder: {
    
    width: 5,
    // backgroundColor: '#007BFF', // Blue color for the left border
    height: '100%', // Stretches to the full height of the button
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 5,
  },
});

export default SeeAll;

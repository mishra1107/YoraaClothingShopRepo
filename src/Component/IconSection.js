import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const IconSection = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <View style={styles.container}>
      {['MEN', 'WOMEN', 'KIDS', 'ACCESSORIES'].map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.touchable,
            selectedCategory === item && styles.selected,
            index === 3 && styles.lastItem,
          ]}
          onPress={() => setSelectedCategory(item)}
        >
          <Text
            style={[styles.text, selectedCategory === item && styles.selectedText]}
            numberOfLines={1}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    margin: 10,
  },
  touchable: {
    flex: 0.25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRightWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
  selected: {
    backgroundColor: 'black',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  selectedText: {
    color: 'white',
  },
  lastItem: {
    borderRightWidth: 0,
  },
});

export default IconSection;

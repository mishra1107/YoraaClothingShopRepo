import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const IconSection = () => {
  const [selected, setSelected] = useState('MEN');
  const navigation = useNavigation();

  const handlePress = (item) => {
    setSelected(item);

    if (item === 'WOMEN') {
      navigation.navigate('Women');
    } else if (item === 'KIDS') {
      navigation.navigate('Kid');
    } else if (item === 'ACCESSORIES') {
      navigation.navigate('Accessories');
    } else {
      navigation.navigate('');
    }
  };

  return (
    <View style={styles.container}>
      {['MEN', 'WOMEN', 'KIDS', 'ACCESSORIES'].map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.touchable,
            selected === item && styles.selected,
            index === 3 && styles.lastItem, // Remove right border for the last item
          ]}
          onPress={() => handlePress(item)}
        >
          <Text
            style={[styles.text, selected === item && styles.selectedText]}
            numberOfLines={1} // Prevent text wrapping
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
    flex: 0.25, // Adjust width for each item
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10, // Adjust padding
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
    borderRightWidth: 0, // Remove right border for the last item
  },
});

export default IconSection;

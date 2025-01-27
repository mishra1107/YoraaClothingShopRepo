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
          ]}
          onPress={() => handlePress(item)}
        >
          <Text style={[styles.text, selected === item && styles.selectedText]}>
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
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  touchable: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'transparent', 
  },
  selected: {
    backgroundColor: 'black', 
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black', 
  },
  selectedText: {
    color: 'white', 
  },
});

export default IconSection;

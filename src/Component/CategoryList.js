import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../styles/color';

const categories = [
  {name: 'TOPS', icon: 'shirt-outline'},
  {name: 'BOTTOMS', icon: 'analytics-outline'},
  {name: 'OUTERWEAR', icon: 'snow-outline'},
  {name: 'ETHNIC WEAR', icon: 'earth-outline'},
  {name: 'LOUNGEWEAR', icon: 'bed-outline'},
  {name: 'ACTIVEWEAR', icon: 'walk-outline'},
];

const CategoryList = () => {
  return (
    <View style={styles.container}>
      {categories.map((category, index) => (
        <TouchableOpacity key={index} style={styles.item}>
          <Icon name={category.icon} size={24} style={styles.icon} />
          <Text style={styles.text}>{category.name}</Text>
          <Icon name="chevron-forward-outline" size={20} />
        </TouchableOpacity>
      ))}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  icon: {
    marginRight: 10,
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
});

export default CategoryList;

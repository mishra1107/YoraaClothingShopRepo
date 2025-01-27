import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const categories = [
  { name: 'TOPS', image: require('../assests/images/Tshirt.png'), screen: 'Top' },
  { name: 'BOTTOMS', image: require('../assests/images/Bottom.png'), screen: 'Bottom' },
  { name: 'OUTERWEAR', image: require('../assests/images/outwear.png'), screen: 'Outwear' },
  { name: 'ETHNIC WEAR', image: require('../assests/images/Ethicwear.png'), screen: 'Ethic' },
  { name: 'LOUNGEWEAR', image: require('../assests/images/Lounwear.png'), screen: 'Loungewear' },
  { name: 'ACTIVEWEAR', image: require('../assests/images/Ethicwear.png'), screen: 'Active' },
  { name: 'SEASONALWEAR', image: require('../assests/images/Ethicwear.png'), screen: 'Active' },
];

const CategoryList = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {categories.map((category, index) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(category.screen)}
          key={index}
          style={styles.item}
        >
          {/* Replace Icon with Image */}
          <Image source={category.image} style={styles.image} />
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
  image: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  text: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  chevron: {
    width: 20,
    height: 20,
  },
});

export default CategoryList;

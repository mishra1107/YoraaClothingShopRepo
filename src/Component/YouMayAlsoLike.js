import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const YouMayAlsoLike = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.title}>YOU MAY ALSO LIKE</Text>
      <Icon   style={styles.title} name="chevron-right" size={18} color="black" />
    </TouchableOpacity>
  );
};

export default YouMayAlsoLike;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    marginTop:20,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

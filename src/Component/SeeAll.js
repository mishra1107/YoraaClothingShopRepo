import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native'; 

const SeeAll = () => {
  const navigation=useNavigation();
  return (                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
    <TouchableOpacity  onPress={() => navigation.navigate("AllCollection")} style={styles.button}>
      <View style={styles.leftBorder} />
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
    width: 150, 
    height: 40, 
  },
  leftBorder: {
    
    width: 5,
    
    height: '100%', 
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

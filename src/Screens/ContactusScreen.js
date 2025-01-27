import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ContactusScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>CONTACT US</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>OFFICE ADDRESS:</Text>
        <Text style={styles.address}>
          FORUM DLF CYBER CITY, PHASE 3, SECTOR 24, DLF QE, Dlf Qe, Gurgaon-122002, Haryana
        </Text>
        <Text style={styles.title}>EMAIL:</Text>
        <Text
          style={styles.email}
          onPress={() => Linking.openURL('mailto:support@yoraa.co.in')}
        >
          support@yoraa.co.in
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backButton: {
    marginRight: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginRight: 32, 
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  address: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  email: {
    fontSize: 14,
    textAlign: 'center',
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default ContactusScreen;

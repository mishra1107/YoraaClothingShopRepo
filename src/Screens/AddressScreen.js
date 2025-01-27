import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const AddAddressScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ADD ADDRESS</Text>
      </View>

      {/* Current Address Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CURRENT ADDRESS</Text>
        <Text style={styles.currentAddress}>
          606-3727 ULLAMCORPER. STREET{'\n'}
          ROSEVILLE NH 11523{'\n'}
          (786) 713-8616
        </Text>
      </View>

      {/* New Address Form */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>NEW ADDRESS</Text>
        <View style={styles.row}>
          <TextInput style={styles.inputHalf} placeholder="First name" />
          <TextInput style={styles.inputHalf} placeholder="Last name" />
        </View>
        <TextInput style={styles.inputFull} placeholder="Address" />
        <TextInput style={styles.inputFull} placeholder="City" />
        <View style={styles.row}>
          <TextInput style={styles.inputHalf} placeholder="State" />
          <TextInput style={styles.inputHalf} placeholder="PIN CODE" />
        </View>
        <TextInput style={styles.inputFull} placeholder="Phone number" />
      </View>

      {/* Confirm Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('')}
        style={styles.button}>
        <Text style={styles.buttonText}>CONFIRM ADDRESS</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  currentAddress: {
    fontSize: 12,
    color: '#555',
    lineHeight: 20,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  inputHalf: {
    flex: 0.48,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    fontSize: 14,
    color: '#000',
    paddingHorizontal: 10,
  },
  inputFull: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
    fontSize: 14,
    color: '#000',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddAddressScreen;

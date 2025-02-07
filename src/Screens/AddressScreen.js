import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { createAddress } from '../api/auth';  // Import the function to create address

const AddressScreen = () => {
  const navigation = useNavigation();

  // State variables for input fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Function to handle Confirm Address button press
  const handleConfirmAddress = async () => {
    if (!firstName || !lastName || !address || !city || !state || !pinCode || !phoneNumber) {
      Alert.alert("Validation Error", "Please fill all fields.");
      return;
    }

    const addressData = {
      firstName,
      lastName,
      address,
      city,
      state,
      pinCode,
      phoneNumber,
    };

    try {
      const response = await createAddress(addressData);
      if (response.success) {
        Alert.alert("Success", "Address added successfully!");
        navigation.goBack();
      } else {
        Alert.alert("Error", response.message || "Failed to add address.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong!");
    }
  };

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
          <TextInput
            style={styles.inputHalf}
            placeholder="First name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.inputHalf}
            placeholder="Last name"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
        <TextInput
          style={styles.inputFull}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.inputFull}
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />
        <View style={styles.row}>
          <TextInput
            style={styles.inputHalf}
            placeholder="State"
            value={state}
            onChangeText={setState}
          />
          <TextInput
            style={styles.inputHalf}
            placeholder="PIN CODE"
            value={pinCode}
            onChangeText={setPinCode}
            keyboardType="numeric"
          />
        </View>
        <TextInput
          style={styles.inputFull}
          placeholder="Phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
      </View>

      {/* Confirm Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleConfirmAddress}
      >
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



export default AddressScreen;

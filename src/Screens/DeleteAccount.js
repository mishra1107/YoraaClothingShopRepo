import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../constants/config';

export default function DeleteAccount() {
  const [modalVisible, setModalVisible] = useState(true);
  const navigation = useNavigation();

  const handleYes = async () => {
    try {
      // Retrieve the token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert("Error", "User token not found");
        return;
      }
      // Call the delete user API endpoint
      const response = await fetch(`${BASE_URL}/auth/deleteUser` ,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const result = await response.json();
  
      if (result.success) {
        setModalVisible(false);
       
        // Navigate to the Welcome screen on successful deletion
        navigation.navigate('Welcome');
      } else {
        Alert.alert("Error", result.message || "Failed to delete user");
      }
    } catch (error) {
    
      Alert.alert("Error", "An error occurred while deleting the account.");
    }
  };

  const handleNo = () => {
    setModalVisible(false);
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalView}>
            <Text style={styles.title}>Delete Account</Text>
            <Text style={styles.message}>
              Are you sure you want to delete your account?
            </Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={[styles.button, styles.buttonYes]} onPress={handleYes}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.buttonNo]} onPress={handleNo}>
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
    color: '#333',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
    color: '#666',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonYes: {
    backgroundColor: '#d9534f',
  },
  buttonNo: {
    backgroundColor: '#5bc0de',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BASE_URL } from '../constants/config';

const ResetPasswordScreen = ({ navigation, route }) => {
  const { phNo } = route.params; // Get phone number from params
  const [newPassword, setNewPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Handle password reset
  const handleResetPassword = async () => {
    if (!newPassword) {
      Alert.alert('Error', 'Please enter a new password.');
      return;
    }

    setLoading(true);
    
    try {
      const token = await AsyncStorage.getItem('token'); // Get token from AsyncStorage
      if (!token) {
        Alert.alert('Error', 'No authentication token found.');
        return;
      }

      const response = await fetch(`${BASE_URL}/auth/resetPassword`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phNo,
          newPassword,
        }),
      });

      const responseData = await response.json();
      console.log("Response:", responseData);

      if (response.ok) {
        Alert.alert('Success', 'Password reset successfully!', [
          { text: 'OK', onPress: () => navigation.replace('Login') },
        ]);
      } else {
        Alert.alert('Error', responseData.message || 'Failed to reset password.');
      }
    } catch (error) {
      console.error('Reset Password Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Icon */}
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => navigation.goBack()}>
        <Image
          source={require('../assests/images/BackArrow.png')}
          style={styles.backIconImage}
        />
      </TouchableOpacity>

      {/* Centered Reset Password Text */}
      <Text style={styles.title}>Reset Password</Text>

      {/* Phone Number Field (Read-Only) */}
      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={[styles.input, { backgroundColor: '#eee' }]} // Greyed out field
        value={phNo}
        editable={false}
      />

      {/* New Password Field */}
      <Text style={styles.label}>New Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Enter new password"
          placeholderTextColor="#aaa"
          secureTextEntry={!passwordVisible}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Icon name={passwordVisible ? 'visibility' : 'visibility-off'} size={20} color="#aaa" />
        </TouchableOpacity>
      </View>

      {/* Reset Password Button */}
      <TouchableOpacity onPress={handleResetPassword} style={styles.resetButton} disabled={loading}>
        <Text style={styles.resetButtonText}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </Text>
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
  backIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  backIconImage: {
    width: 28,
    height: 28,
    tintColor: 'black',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 40,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
    paddingVertical: 8,
    marginBottom: 20,
    color: '#000',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  resetButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'black',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ResetPasswordScreen;

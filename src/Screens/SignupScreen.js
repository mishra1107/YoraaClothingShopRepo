import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SignupScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <View style={styles.container}>
      {/* Back Icon */}
      <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Sign-up Text */}
      <Text style={styles.signupText}>Sign-up</Text>

      {/* Full Name Field */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="John Smith"
          placeholderTextColor="#aaa"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

      {/* Mobile Number Field */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Mobile No.</Text>
        <TextInput
          style={styles.input}
          keyboardType="phone-pad"
          placeholder="+91"
          placeholderTextColor="#aaa"
          value={mobileNumber}
          onChangeText={setMobileNumber}
        />
      </View>

      {/* Password Field */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="********"
            placeholderTextColor="#aaa"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon name={showPassword ? 'visibility' : 'visibility-off'} size={24} color="#aaa" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Confirm Password Field */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="********"
            placeholderTextColor="#aaa"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Icon name={showConfirmPassword ? 'visibility' : 'visibility-off'} size={24} color="#aaa" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Login Link */}
      <TouchableOpacity style={styles.loginContainer} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.loginLink}>Login</Text>
        </Text>
      </TouchableOpacity>

      {/* Sign-up Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('LoginVerifyOtp')}
        style={styles.signupButton}
      >
        <Text style={styles.signupButtonText}>SIGN-UP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  backIcon: {
    marginTop: 20,
    marginBottom: 20,
  },
  signupText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    fontSize: 16,
    paddingVertical: 5,
    color: '#000',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  loginContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#aaa',
  },
  loginLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  signupButton: {
    position: 'absolute', // Fixes the button to the bottom of the screen
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'black',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  signupButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default SignupScreen;

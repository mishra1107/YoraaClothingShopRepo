
import React, { useState } from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '841829729642-5vo1cbgnrsl83sm8c8h63s7c0hf0i3mi.apps.googleusercontent.com',
});

export default function LoginScreen({ navigation }) {
  const [phNo, setPhNo] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignUpFirebase = async () => {
    console.log('Inside Firebase Sign-In');

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.data.idToken;

      if (!idToken) throw new Error('Failed to retrieve Google ID Token');

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);

      const firebaseIdToken = await userCredential.user.getIdToken();

      const response = await fetch('http://18.144.80.232:8080/api/auth/signup/firebase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken: firebaseIdToken }),
      });

      const responseData = await response.json();

      if (response.ok) {
        const { token, user } = responseData.data;
        Alert.alert('Success', 'User signed up successfully');
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('user', JSON.stringify(user));
        navigation.replace('Home');
      } else {
        Alert.alert('Error', responseData.message || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!phNo || !password) {
      Alert.alert('Error', 'Please enter your phone number and password.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://18.144.80.232:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phNo, password }),
      });
      console.log("qwertyuiop")
      const responseData = await response.json();
      console.log("qwertyuiop11111111111111",responseData.success)

      if (response.ok && responseData.success) {
        const { token, user } = responseData.data;
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('user', JSON.stringify(user));
        Alert.alert('Success', 'Login Successful!');
        navigation.replace('Home');
      } else if (!responseData.success) {
        console.log("dfghjkhghjkhgjkhg546789897654",phNo)
        Alert.alert('Not Verified', 'User is not verified. Go to the signup page.');
        navigation.navigate('LoginVerifyOtp',{phNo: phNo});
      } else {
        Alert.alert('Login Failed', responseData.message || 'Invalid credentials.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Welcome')} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>LogIn</Text>

      <Text style={styles.label}>Mobile No.</Text>
      <TextInput
        style={styles.input}
        placeholder="+91"
        keyboardType="phone-pad"
        value={phNo}
        onChangeText={setPhNo}
      />

      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          // style={styles.passwordInput}
          style={[styles.passwordInput, {fontSize:12}]}
          placeholder="★★★★★★★"
          placeholderTextColor="rgba(171, 171, 171, 1)" 
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Icon name={passwordVisible ? 'visibility' : 'visibility-off'} size={20} color="#aaa" />
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.checkbox, isChecked && styles.checkedCheckbox]}
          onPress={() => setIsChecked(!isChecked)}
        >
          {isChecked && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>
        <Text style={styles.rememberMeText}>Remember me</Text>
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>Or</Text>
        <View style={styles.divider} />
      </View>

      <TouchableOpacity onPress={handleSignUpFirebase} style={styles.googleButton}>
        <Image source={require('../assests/images/Gmail.png')} style={styles.icon} />
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.appleButton}>
        <FontAwesome name="apple" size={20} color="white" />
        <Text style={styles.appleButtonText}>Continue with Apple</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signupContainer} onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupText}>Don't have an account? <Text style={styles.signupLink}>Sign-up</Text></Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogin} style={styles.loginButton} disabled={loading}>
        <Text style={styles.loginButtonText}>{loading ? 'Logging In...' : 'LOGIN'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    // fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
    paddingVertical: 8,
    marginBottom: 20,
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedCheckbox: {
    backgroundColor: '#000',
  },
  checkmark: {
    color: 'white',
    fontSize: 14,
  },
  rememberMeText: {
    fontSize: 14,
    marginLeft: 8,
  },
  forgotPassword: {
    marginLeft: 'auto',
  },
  forgotPasswordText: {
    color: '#aaa',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#aaa',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 12,
    marginBottom: 20,
  },
  googleButtonText: {
    fontSize: 16,
    marginLeft: 8,
  },
  appleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: 5,
    padding: 12,
    marginBottom: 20,
  },
  appleButtonText: {
    fontSize: 16,
    marginLeft: 8,
    color: 'white',
  },
  signupContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  signupText: {
    fontSize: 14,
    color: '#aaa',
  },
  signupLink: {
    color: 'black',
    // fontWeight: 'bold',
  },
  loginButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    padding: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    width: 20,
    height: 20,
  },
});




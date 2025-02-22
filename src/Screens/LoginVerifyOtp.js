
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert,Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import { postRequest } from "../api/api"; 
import { API_ENDPOINTS, BASE_URL } from "../constants/config";
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import axios from 'axios';

const LoginVerifyOtp = ({ navigation, route }) => {
  // const phNo = route?.params?.phNo || '';

  // const { phNo } = route.params;


  const { phNo, isForgotPassword } = route.params;

  console.log("Phone Number from route params:", phNo);

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(45);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [verificationId,setVerificationId] = useState(null);
  const inputs = useRef([]);
  const BACKEND_URL = 'http://192.168.1.40:8080/api/auth/verifyFirebaseOtp';

  useEffect(() => {
    startTimer();
    handleSendOtp();
  }, []);

  const startTimer = () => {
    setTimer(45);
    setResendDisabled(true);

    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          setResendDisabled(false);
          clearInterval(countdown);
        }
        return prevTimer > 0 ? prevTimer - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(countdown);
  };

  const handleOtpChange = (text, index) => {
    if (isNaN(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };


//  firebase otp resend process 
  const handleResendOTP = async () => {
    console.log("Resending OTP to:", phNo);
  
    if (!phNo || phNo.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number.');
      return;
    }
  
    setLoading(true);
    startTimer(); // Restart the timer
  
    try {
      console.log("Initiating Firebase OTP resend process...");
      const confirmation = await auth().signInWithPhoneNumber(`+91${phNo}`);
      console.log("Firebase OTP resent successfully, verificationId:", confirmation.verificationId);
  
      setVerificationId(confirmation.verificationId); // Update verificationId with the new one
      Alert.alert('OTP Resent', `A new OTP has been sent to +91 ${phNo}`);
    } catch (error) {
      console.error('Error resending OTP:', error);
      Alert.alert('Error', 'Failed to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // firebase otp send process
  const handleSendOtp = async () => {
    console.log("Attempting to send OTP to:", phNo);
    if (!phNo || phNo.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number.');
      return;
    }

    setLoading(true);

    try {
      console.log("Starting Firebase OTP process...");
      const confirmation = await auth().signInWithPhoneNumber(`+91${phNo}`);
      console.log("Firebase OTP sent successfully, verificationId:", confirmation.verificationId);

      setVerificationId(confirmation.verificationId);
      Alert.alert('OTP Sent', 'Please check your phone for the OTP.');
    } catch (error) {
      console.error('Error sending OTP:', error);
      Alert.alert('Error', 'Failed to send OTP. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const fullOtp = otp.join('');
    console.log("Entered OTP:", fullOtp);

    if (fullOtp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP.');
      return;
    }

    setLoading(true);

    try {
      console.log("Verification ID:", verificationId);

      const credential = auth.PhoneAuthProvider.credential(verificationId, fullOtp);
      console.log("Firebase Credential created:", credential);

      const userCredential = await auth().signInWithCredential(credential);
      const idToken = await userCredential.user.getIdToken();

      console.log("Sending to backend:", { idToken, phNo: `+91${phNo}` });

      const response = await axios.post(`${BASE_URL}/auth/verifyFirebaseOtp`, {
        idToken,
        phNo: `+91${phNo}`,
      });

      console.log("Backend response:", response);

      const { token, user } = response.data.data;
      Alert.alert('Success', 'Phone number verified successfully!');

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      console.log("Token stored in AsyncStorage:", await AsyncStorage.getItem('token'));
      if (isForgotPassword) {
        navigation.replace('ResetPasswordScreen', { phNo });
      } else {
        const sendFCMTokenToServer = async () => {
          try {
              // Retrieve FCM Token
              const fcmToken = await AsyncStorage.getItem('fcmToken');
              if (!fcmToken) {
                  console.log('No FCM token found');
                  return;
              }
      
              // Retrieve Auth Token
              const authToken = await AsyncStorage.getItem('token');
              if (!authToken) {
                  console.log('No Auth token found');
                  return;
              }
      
              // API URL
              const apiUrl = 'http://192.168.1.40:8080/api/save-token';
      
              // Request Body
              const requestBody = JSON.stringify({
                  token: fcmToken
              });
      
              // API Call
              const response = await fetch(apiUrl, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${authToken}`
                  },
                  body: requestBody
              });
      
              const data = await response.json();
              console.log('FCM Token Save Response:', data);
      
              if (data.success) {
                  console.log('zaibaaa FCM Token successfully saved to server');
              } else {
                  console.error('Error saving FCM token:', data.message);
              }
      
          } catch (error) {
              console.error('Error sending FCM token to server:', error);
          }
      };
      sendFCMTokenToServer();
        navigation.replace('Home');
      }
     
     
      // navigation.replace('Home');
    } catch (error) {
      console.error('Error verifying OTP:', error);
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
     <TouchableOpacity
              style={styles.backIcon}
              onPress={() => navigation.goBack()}>
              <Image 
                source={require('../assests/images/BackArrow.png')}  //  Use local asset
                style={styles.backIconImage}  //  Apply styles for proper size
              />
            </TouchableOpacity>

      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>Enter the OTP sent to +91 {phNo}</Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleOtpChange(text, index)}
            ref={(input) => (inputs.current[index] = input)}
          />
        ))}
      </View>

      <Text style={styles.resendText}>
        Didn’t receive the OTP?{' '}
        <Text
          style={[styles.resendLink, { color: resendDisabled ? '#cccccc' : '#000000' }]}
          onPress={!resendDisabled ? handleResendOTP : null}
        >
          Resend OTP
        </Text>
      </Text>

      <Text style={styles.timerText}>00 : {timer.toString().padStart(2, '0')}</Text>

      <TouchableOpacity
        onPress={handleVerifyOtp}
        style={styles.verifyButton}
        disabled={loading}
      >
        <Text style={styles.verifyButtonText}>{loading ? "VERIFYING..." : "VERIFY OTP"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({

  backIconImage: {
    width: 28,   //  Match original icon size
    height: 28,  //  Keep square dimensions
    tintColor: 'black', //  Optional: Change color if needed
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#000000',
    textAlign: 'center',
    fontSize: 18,
    marginHorizontal: 5,
  },
  resendText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginTop: 10,
  },
  resendLink: {
    fontWeight: 'bold',
  },
  timerText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginTop: 5,
  },
  verifyButton: {
    position: 'absolute', 
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000',
    padding: 15,
    alignItems: 'center',
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginVerifyOtp;
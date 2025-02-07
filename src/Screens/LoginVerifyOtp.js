
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import { postRequest } from "../api/api"; 
import { API_ENDPOINTS } from "../constants/config";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginVerifyOtp = ({ navigation, route }) => {
  const { phNo } = route.params; // Get phone number from previous screen
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(45);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  // Define an array of refs for each OTP input field
  const inputs = useRef([]);

  useEffect(() => {
    startTimer();
  }, []);

  // Function to start/restart the timer
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

  // Handle OTP input change
  const handleOTPChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to the next input if a digit is entered
    if (text.length === 1 && index < otp.length - 1) {
      inputs.current[index + 1]?.focus();
    } else if (text.length === 0 && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  // Function to Resend OTP
  const handleResendOTP = async () => {
    if (!resendDisabled) {
      console.log("Resending OTP...");
      setOtp(['', '', '', '']); // Clear OTP input fields
      startTimer(); // Restart the timer

      try {
        const response = await postRequest(API_ENDPOINTS.GENERATE_OTP, { phNo });
        console.log("Resend OTP Response:", response);

        if (response.success) {
          Alert.alert("Success", "OTP Resent Successfully. Please enter the new OTP.");
          console.log("New OTP has been sent. Please enter the latest OTP.");
        } else {
          Alert.alert("Error", response.message || "Failed to resend OTP.");
        }
      } catch (error) {
        console.error("Resend OTP Failed:", error);
        Alert.alert("Error", "Something went wrong while resending OTP.");
      }
    }
  };
  
  // Function to Verify OTP
  const handleVerifyOTP = async () => {
    if (otp.some((digit) => digit === '')) {
        Alert.alert("⚠️ Error", "Please enter the complete OTP.");
        return;
    }

    setLoading(true);
    const otpCode = otp.join(""); // Convert OTP array to string

    console.log("📤 Sending request to API with:", { phNo, otp: otpCode });

    try {
        // Ensure the request format is exactly as needed
        const response = await postRequest("http://10.0.2.2:8080/api/auth/verif-otp", {
            phNo: String(phNo).trim(),  // Ensure phNo is a string
            otp: String(otpCode).trim() // Ensure OTP is a string
        });

        console.log("📥 API Response:", response);

        if (response.success === true) {
            const { token, user } = response.data;

            // Store token and user info in AsyncStorage
            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('user', JSON.stringify(user));

            Alert.alert("✅ Success", "OTP Verified Successfully!");
            navigation.replace('Home'); // Navigate to Home Screen
        } else {
            console.error("❌ Verification Failed:", response);
            Alert.alert("Verification Failed", response.message || "Invalid OTP.");
        }
    } catch (error) {
        console.error("❌ OTP Verification Error:", error);
        Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
        setLoading(false);
    }
};


  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Welcome')}
        style={styles.backButton}>
        <MaterialIcons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.subtitle}>Enter the OTP sent to +91 ******333</Text>
      </View>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleOTPChange(text, index)}
            ref={(input) => (inputs.current[index] = input)}
          />
        ))}
      </View>
      <Text style={styles.resendText}>
        Didn’t receive the OTP?{' '}
        <Text
          style={[styles.resendLink, { color: resendDisabled ? '#cccccc' : '#000000' }]}
          onPress={handleResendOTP}
        >
          Resend OTP
        </Text>
      </Text>
      <View style={styles.timerContainer}>
        <MaterialIcons name="timer" size={18} color="#666666" />
        <Text style={styles.timerText}> 00 : {timer.toString().padStart(2, '0')}</Text>
      </View>
      <TouchableOpacity
        onPress={handleVerifyOTP}
        style={styles.verifyButton}
        disabled={loading}>
        <Text style={styles.verifyButtonText}>{loading ? "VERIFYING..." : "VERIFY OTP"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  header: {
    marginTop: 80,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 30,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#000000',
    textAlign: 'center',
    fontSize: 18,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  resendText: {
    fontSize: 14,
    color: '#666666',
    marginTop: 10,
    textAlign: 'center',
  },
  resendLink: {
    fontWeight: 'bold',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 14,
    color: '#666666',
  },
  verifyButton: {
    position: 'absolute', 
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 0, 
    alignItems: 'center',
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginVerifyOtp;

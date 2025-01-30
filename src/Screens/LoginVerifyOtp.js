// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
// } from 'react-native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
// import { postRequest } from "../api/api"; 
// import { API_ENDPOINTS } from "../constants/config";

// const LoginVerifyOtp = ({ navigation,route }) => {
//   const [otp, setOtp] = useState(['', '', '', '']);
//   const [timer, setTimer] = useState(45);
//   const [resendDisabled, setResendDisabled] = useState(true);
//   const { phNo } = route.params; 

//   useEffect(() => {
//     const countdown = setInterval(() => {
//       setTimer((prevTimer) => {
//         if (prevTimer === 1) {
//           setResendDisabled(false);
//           clearInterval(countdown);
//         }
//         return prevTimer > 0 ? prevTimer - 1 : 0;
//       });
//     }, 1000);

//     return () => clearInterval(countdown);
//   }, []);

//   const handleOTPChange = (text, index) => {
//     const newOtp = [...otp];
//     newOtp[index] = text;
//     setOtp(newOtp);
//     if (text.length === 1 && index < otp.length - 1) {
//       inputs[index + 1].focus();
//     } else if (text.length === 0 && index > 0) {
//       inputs[index - 1].focus();
//     }
//   };

//   const handleResendOTP = () => {
//     if (!resendDisabled) {
//       setOtp(['', '', '', '']);
//       setTimer(45);
//       setResendDisabled(true);
//     }
//   };
//   const handleVerifyOTP = async () => {
//     if (!otp) {
//       lert.alert("Error", "Please enter the OTP.");
//       return;
//     }
//     try {
//       const response = await postRequest(API_ENDPOINTS.VERIFY_OTP, { phNo, otp });

//       if (response.success) {
//         Alert.alert("Success", "OTP verified successfully!");
//         navigation.navigate("Home");
//       } else {
//         Alert.alert("Error", response.message || "Invalid OTP.");
//       }
//     } catch (error) {
//       console.error("Error verifying OTP:", error);
//       Alert.alert("Error", "Something went wrong while verifying OTP.");
//     }
//   };

//   const inputs = [];

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         onPress={() => navigation.navigate('Welcome')}
//         style={styles.backButton}>
//         <MaterialIcons name="arrow-back" size={24} color="black" />
//       </TouchableOpacity>
//       <View style={styles.header}>
//         <Text style={styles.title}>Verify OTP</Text>
//         <Text style={styles.subtitle}>Enter the OTP sent to +91 ******333</Text>
//       </View>
//       <View style={styles.otpContainer}>
//         {otp.map((digit, index) => (
//           <TextInput
//             key={index}
//             style={styles.otpInput}
//             keyboardType="number-pad"
//             maxLength={1}
//             value={digit}
//             onChangeText={(text) => handleOTPChange(text, index)}
//             ref={(input) => (inputs[index] = input)}
//           />
//         ))}
//       </View>
//       <Text style={styles.resendText}>
//         Didn’t you receive the OTP?{' '}
//         <Text
//           style={[
//             styles.resendLink,
//             { color: resendDisabled ? '#cccccc' : '#000000' },
//           ]}
//           onPress={handleResendOTP}
//         >
//           Resend OTP
//         </Text>
//       </Text>
//       <View style={styles.timerContainer}>
//         <MaterialIcons name="timer" size={18} color="#666666" />
//         <Text style={styles.timerText}> 00 : {timer.toString().padStart(2, '0')}</Text>
//       </View>
//       <TouchableOpacity
//        onPress={handleVerifyOTP}
//         // onPress={() => navigation.navigate('Home')}
//         style={styles.verifyButton}
//       >
//         <Text style={styles.verifyButtonText}>VERIFY OTP</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     padding: 20,
//   },
//   backButton: {
//     position: 'absolute',
//     top: 50,
//     left: 20,
//   },
//   header: {
//     marginTop: 80,
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#666666',
//     marginBottom: 30,
//     textAlign: 'center',
//   },
//   otpContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//     marginTop: 20,
//   },
//   otpInput: {
//     width: 50,
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#000000',
//     textAlign: 'center',
//     fontSize: 18,
//     borderRadius: 5,
//     marginHorizontal: 5,
//   },
//   resendText: {
//     fontSize: 14,
//     color: '#666666',
//     marginTop: 10,
//     textAlign: 'center',
//   },
//   resendLink: {
//     fontWeight: 'bold',
//   },
//   timerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 10,
//     justifyContent: 'center',
//   },
//   timerText: {
//     fontSize: 14,
//     color: '#666666',
//   },
//   verifyButton: {
//     position: 'absolute', 
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: '#000000',
//     padding: 15,
//     borderRadius: 0, 
//     alignItems: 'center',
//   },
//   verifyButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default LoginVerifyOtp;



import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import { verifyOTP, resendOTP } from "../api/auth";  

const LoginVerifyOtp = ({ navigation, route }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(45);
  const [resendDisabled, setResendDisabled] = useState(true);

  const { phNo } = route.params;  
  useEffect(() => {
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
  }, []);

  const handleOTPChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
  };

  // ✅ Handle OTP Verification
  const handleVerifyOTP = async () => {
    const otpCode = otp.join(""); // Convert array to string
    if (otpCode.length !== 4) {
      Alert.alert("Error", "Please enter a valid 4-digit OTP.");
      return;
    }

    try {
      const response = await verifyOTP(phNo, otpCode);

      if (response.success) {
        Alert.alert("Success", "OTP verified successfully!");
        navigation.navigate("Home"); // ✅ Navigate to Home screen
      } else {
        Alert.alert("Error", response.message || "Invalid or expired OTP.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      Alert.alert("Error", "Something went wrong while verifying OTP.");
    }
  };

  // ✅ Handle Resend OTP
  const handleResendOTP = async () => {
    if (!resendDisabled) {
      try {
        const response = await resendOTP(phNo);
        if (response.success) {
          Alert.alert("Success", "New OTP has been sent to your phone.");
          setOtp(['', '', '', '']);
          setTimer(45);
          setResendDisabled(true);
        } else {
          Alert.alert("Error", response.message || "Failed to resend OTP.");
        }
      } catch (error) {
        console.error("Error resending OTP:", error);
        Alert.alert("Error", "Something went wrong while resending OTP.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <MaterialIcons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.subtitle}>Enter the OTP sent to +91 {phNo}</Text>
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
      <TouchableOpacity onPress={handleVerifyOTP} style={styles.verifyButton}>
        <Text style={styles.verifyButtonText}>VERIFY OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', padding: 20 },
  backButton: { position: 'absolute', top: 50, left: 20 },
  header: { marginTop: 80, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 14, color: '#666666', marginBottom: 30, textAlign: 'center' },
  otpContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginTop: 20 },
  otpInput: { width: 50, height: 50, borderWidth: 1, borderColor: '#000', textAlign: 'center', fontSize: 18, borderRadius: 5 },
  verifyButton: { backgroundColor: '#000', padding: 15, borderRadius: 5, alignItems: 'center', marginTop: 20 },
  verifyButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});

export default LoginVerifyOtp;

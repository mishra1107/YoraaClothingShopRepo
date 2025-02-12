// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {signupUser} from '../api/auth';
// import {validateSignup} from '../utils/validator';
// import {generateOTP} from '../api/auth';
// const SignupScreen = ({navigation}) => {
//   const [fullName, setFullName] = useState('');
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
 

//   const handleSignup = async () => {
//     console.log("Initiating Signup...");

//     const validationError = validateSignup(fullName, mobileNumber, password, confirmPassword);
//     // console.log(validationError);
//     if (validationError) {
//       Alert.alert("Validation Error", validationError);
//       console.error("Validation Failed:", validationError);
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await signupUser(fullName, mobileNumber, password);
//       setLoading(false);
//       console.log("Response baba",response);
//       console.log("response bbmsg",response.success);
//       if (response.success) {
//         Alert.alert("Success", "Signup successful!");

//         navigation.navigate("LoginVerifyOtp",{phNo: mobileNumber});
//       } else {
//         Alert.alert("Signup Failed", response.message || "Something went wrong!");
//       }
//     } catch (error) {
//       console.error("Signup API Error:", error);
//       Alert.alert("Error", "Could not complete signup. Please try again.");
//     }
//     setLoading(false);
//   };



//   // const handleSignup = async () => {
//   //   console.log('Initiating Signup...');

//   //   // Step 1: Validate input fields
//   //   const validationError = validateSignup(
//   //     fullName,
//   //     mobileNumber,
//   //     password,
//   //     confirmPassword,
//   //   );

//   //   if (validationError) {
//   //     Alert.alert('Validation Error', validationError);
//   //     console.error('Validation Failed:', validationError);
//   //     return;
//   //   }

//   //   setLoading(true);
//   //   try {
//   //     // Step 2: Call signup API
//   //     const signupResponse = await signupUser(fullName, mobileNumber, password);

//   //     if (signupResponse.success) {
//   //       console.log('Signup Successful, now generating OTP...');

//   //       // Step 3: Call generate OTP API
//   //       const otpResponse = await generateOTP(mobileNumber);

//   //       if (otpResponse.success) {
//   //         Alert.alert('Success', 'Signup successful! OTP sent to your number.');

//   //         // Step 4: Navigate to OTP verification screen after OTP is sent
//   //         navigation.navigate('LoginVerifyOtp', {phNo: mobileNumber});
//   //       } else {
//   //         Alert.alert('Error', otpResponse.message || 'OTP generation failed.');
//   //       }
//   //     } else {
//   //       Alert.alert(
//   //         'Signup Failed',
//   //         signupResponse.message || 'Something went wrong!',
//   //       );
//   //     }
//   //   } catch (error) {
//   //     console.error('Signup API Error:', error);
//   //     Alert.alert('Error', 'Could not complete signup. Please try again.');
//   //   }

//   //   setLoading(false);
//   // };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         style={styles.backIcon}
//         onPress={() => navigation.goBack()}>
//         <Icon name="arrow-back" size={24} color="black" />
//       </TouchableOpacity>

//       <Text style={styles.signupText}>Sign-up</Text>

//       {/* Full Name */}
//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>Full Name</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="John Smith"
//           placeholderTextColor="#aaa"
//           value={fullName}
//           onChangeText={setFullName}
//         />
//       </View>

//       {/* Mobile Number */}
//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>Mobile No.</Text>
//         <TextInput
//           style={styles.input}
//           keyboardType="phone-pad"
//           placeholder="Enter 10-digit number"
//           placeholderTextColor="#aaa"
//           value={mobileNumber}
//           onChangeText={setMobileNumber}
//         />
//       </View>

//       {/* Password */}
//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>Password</Text>
//         <View style={styles.passwordContainer}>
//           <TextInput
//             style={[styles.input, {flex: 1}]}
//             placeholder="********"
//             placeholderTextColor="#aaa"
//             secureTextEntry={!showPassword}
//             value={password}
//             onChangeText={setPassword}
//           />
//           <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//             <Icon
//               name={showPassword ? 'visibility' : 'visibility-off'}
//               size={24}
//               color="#aaa"
//             />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Confirm Password */}
//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>Confirm Password</Text>
//         <View style={styles.passwordContainer}>
//           <TextInput
//             style={[styles.input, {flex: 1}]}
//             placeholder="********"
//             placeholderTextColor="#aaa"
//             secureTextEntry={!showConfirmPassword}
//             value={confirmPassword}
//             onChangeText={setConfirmPassword}
//           />
//           <TouchableOpacity
//             onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
//             <Icon
//               name={showConfirmPassword ? 'visibility' : 'visibility-off'}
//               size={24}
//               color="#aaa"
//             />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Login Link */}
//       <TouchableOpacity
//         style={styles.loginContainer}
//         onPress={() => navigation.navigate('Login')}>
//         <Text style={styles.loginText}>
//           Already have an account? <Text style={styles.loginLink}>Login</Text>
//         </Text>
//       </TouchableOpacity>

//       {/* Signup Button */}
//       <TouchableOpacity
//         onPress={handleSignup}
//         style={styles.signupButton}
//         disabled={loading}>
//         {loading ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           <Text style={styles.signupButtonText}>SIGN-UP</Text>
//         )}
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     backgroundColor: '#fff',
//   },
//   backIcon: {
//     marginTop: 20,
//     marginBottom: 20,
//   },
//   signupText: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   fieldContainer: {
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 14,
//     color: '#000',
//     marginBottom: 5,
//   },
//   input: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//     fontSize: 16,
//     paddingVertical: 5,
//     color: '#000',
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   loginContainer: {
//     marginTop: 10,
//     alignItems: 'center',
//   },
//   loginText: {
//     fontSize: 14,
//     color: '#aaa',
//   },
//   loginLink: {
//     color: 'blue',
//     textDecorationLine: 'underline',
//   },
//   signupButton: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: 'black',
//     padding: 16,
//     borderRadius: 0,
//     alignItems: 'center',
//   },
//   signupButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default SignupScreen;



import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {signupUser} from '../api/auth';
import {validateSignup} from '../utils/validator';

const SignupScreen = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = async () => {
    console.log("Initiating Signup...");
  
    const validationError = validateSignup(fullName, mobileNumber, password, confirmPassword);
    if (validationError) {
      Alert.alert("Validation Error", validationError);
      console.error("Validation Failed:", validationError);
      return;
    }
  
    setLoading(true);
    try {
      const response = await fetch("http://10.0.2.2:8080/api/auth/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: fullName,
          phNo: String(mobileNumber),
          password: password,
        }),
      });
  
      const responseData = await response.json();
      console.log('Signup Response:', responseData);
  
      setLoading(false);
      if (response.ok && responseData.success) {
        Alert.alert("Success", "Signup successful!");
        navigation.navigate("LoginVerifyOtp", { phNo: mobileNumber });
      } else if (responseData.errorDetails === "") {
        console.log("Unexpected empty error details.");
      } else if(responseData.message==="User is not verified. Please verify your account first.") {
        Alert.alert("Signup Failed", responseData.message || "Something went wrong!");
        navigation.navigate("LoginVerifyOtp", { phNo: mobileNumber });

      }
      else if(responseData.message==="User is  verified registered. Please login") {
        Alert.alert("Signup Failed", responseData.message || "Something went wrong!");
        navigation.navigate("Login");

      }
      
    } catch (error) {
      console.error("Signup API Error:", error);
      Alert.alert("Error", "Could not complete signup. Please try again.");
    }
    setLoading(false);
  };
  

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.signupText}>Sign-up</Text>

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

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, {flex: 1,fontSize:12}]}
              placeholder="⭐⭐⭐⭐⭐⭐⭐"
              placeholderTextColor="rgba(171, 171, 171, 1)" 
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'visibility' : 'visibility-off'}
              size={20}
              color="#aaa"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, {flex: 1,fontSize:12}]}
               placeholder="⭐⭐⭐⭐⭐⭐⭐"
               placeholderTextColor="rgba(171, 171, 171, 1)" 
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Icon
              name={showConfirmPassword ? 'visibility' : 'visibility-off'}
              size={20}
              color="#aaa"
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.loginContainer}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.loginLink}>Login</Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleSignup}
        style={styles.signupButton}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.signupButtonText}>SIGN-UP</Text>
        )}
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
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
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
    borderBottomColor: '#ccc',
    fontSize: 16,
    paddingVertical: 8,
    color: '#000',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  loginContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#aaa',
  },
  loginLink: {
    color: '#000',
    fontWeight: 'bold',
  },
  signupButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    padding: 16,
    alignItems: 'center',
  },
  signupButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignupScreen;


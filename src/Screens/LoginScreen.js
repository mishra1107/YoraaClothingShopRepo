
// //  API integrate logic

// import React, { useState } from 'react';
// import {
//   Image,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { validateLogin } from '../utils/validator';
// import { BASE_URL, API_ENDPOINTS } from '../constants/config';
// import auth from '@react-native-firebase/auth';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

// GoogleSignin.configure({
//   webClientId: '841829729642-5vo1cbgnrsl83sm8c8h63s7c0hf0i3mi.apps.googleusercontent.com', // Replace with your Web Client ID
// });

// export default function LoginScreen({ navigation }) {
//   const [phNo, setPhNo] = useState(''); // State for phone number
//   const [password, setPassword] = useState(''); // State for password
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [isChecked, setIsChecked] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Toggle password visibility
//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };


//   const handleSignUpFirebase = async () => {
//     setLoading(true);
//     console.log("Inside Firebase Sign-In");
  
//     try {
//       await GoogleSignin.hasPlayServices();
//       const userInfo = await GoogleSignin.signIn();
//       console.log('Google Sign-In userInfo:', userInfo);
  
//       const  idToken = userInfo.data.idToken;
//       if (!idToken) throw new Error('Failed to retrieve Google ID Token');
  
//       const googleCredential = auth.GoogleAuthProvider.credential(idToken);
//       console.log('Firebase Google Credential:', googleCredential);
  
//       const userCredential = await auth().signInWithCredential(googleCredential);
//       console.log('Firebase User Credential:', userCredential);
  
//       const firebaseIdToken = await userCredential.user.getIdToken();
//       console.log('Firebase ID Token:', firebaseIdToken);
  
//       const response = await fetch('http://10.0.2.2:8080/api/auth/signup/firebase', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ idToken: firebaseIdToken }),
//       });
  
//       const responseData = await response.json();
//       console.log('API Response:', responseData);

//       if (response.ok) {
//         const { token, user } = responseData.data;

//         Alert.alert('Success', 'User signed up successfully');
//         await AsyncStorage.setItem('token', token);
//         await AsyncStorage.setItem('user', JSON.stringify(user));
//         navigation.replace('Home');
//       } else {
//         Alert.alert('Error', responseData.message || 'Something went wrong');
//       }
//     } catch (error) {
//       console.error('Google Sign-In Error:', error);
//       Alert.alert('Error', error.message || 'An unexpected error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };
//   // Handle Login Button Click
//   const handleLogin = async () => {
//     if (!phNo || !password) {
//       Alert.alert(" Error", "Please enter your phone number and password.");
//       return;
//     }
//     setLoading(true); // Start loading
//     try {
//       console.log(" Sending login request to API...");
//       const response = await fetch('http:/10.0.2.2:8080:8080/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ phNo, password }),
//       });

//       const responseData = await response.json();
//       console.log(" API Response:", responseData);

//       if (response.ok && responseData.success === true) {
//         const { token, user } = responseData.data;

//         // Store token and user info in AsyncStorage
//         await AsyncStorage.setItem('token', token);
//         await AsyncStorage.setItem('user', JSON.stringify(user));

//         Alert.alert(" Success", "Login Successful!");
//         navigation.replace('Home'); // Navigate to Home Screen
//       } else if (responseData.success === false) {
//         Alert.alert(" Not Verified", "User is not verified. Go to the signup page.");
//         navigation.navigate('Signup');
//       } else {
//         Alert.alert(" Login Failed", responseData.message || "Invalid credentials.");
//       }
//     } catch (error) {
//       console.error(" Login Error:", error);
//       Alert.alert(" Error", "Something went wrong. Please try again.");
//     } finally {
//       setLoading(false); // Stop loading
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={() => navigation.navigate('Welcome')} style={styles.backButton}>
//         <Icon name="arrow-back" size={24} color="black" />
//       </TouchableOpacity>

//       <Text style={styles.title}>Log In</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Mobile No."
//         keyboardType="phone-pad"
//         value={phNo}
//         onChangeText={setPhNo}
//       />

//       <View style={styles.passwordContainer}>
//         <TextInput
//           style={styles.passwordInput}
//           placeholder="Enter your password"
//           secureTextEntry={!passwordVisible}
//           value={password}
//           onChangeText={setPassword}
//         />
//         <TouchableOpacity onPress={togglePasswordVisibility}>
//           <Icon name={passwordVisible ? 'visibility' : 'visibility-off'} size={20} color="#aaa" />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.row}>
//         <View style={styles.rememberMeContainer}>
//           <TouchableOpacity
//             style={[styles.checkbox, isChecked && styles.checkedCheckbox]}
//             onPress={() => setIsChecked(!isChecked)}
//           >
//             {isChecked && <Text style={styles.checkmark}>✓</Text>}
//           </TouchableOpacity>
//           <Text style={styles.rememberMeText}>Remember me</Text>
//         </View>
//         <View style={styles.dividerContainer}>
//         <View style={styles.divider} />
//         <Text style={styles.dividerText}>Or</Text>
//         <View style={styles.divider} />
//       </View>
//         <TouchableOpacity>
//           <Text>Forgot password?</Text>
//         </TouchableOpacity>
       
//       </View>


//       <TouchableOpacity  onPress={handleSignUpFirebase} style={styles.googleButton}>
//         <Image source={require('../assests/images/Gmail.png')} style={{ width: 20, height: 20 }} />
//         <Text style={styles.googleButtonText}>Continue with Google</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.appleButton}>
//         <FontAwesome name="apple" size={20} color="white" />
//         <Text style={styles.appleButtonText}>Continue with Apple</Text>
//       </TouchableOpacity>

   
//            <TouchableOpacity style={styles.loginContainer} onPress={() => navigation.navigate("Signup")}>
//               <Text style={styles.loginText}>
//               Don't have an account? <Text style={styles.loginLink}>Sign-up</Text>
//               </Text>
//             </TouchableOpacity>

//         <TouchableOpacity
//         onPress={handleLogin}
//         style={styles.loginButton}
//         disabled={loading} >
//         <Text style={styles.loginButtonText}>{loading ? "Logging In..." : "LOGIN"}</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: 'white',
//   },
//   backButton: {
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     fontSize: 16,
//     paddingVertical: 8,
//     marginBottom: 20,
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     marginBottom: 20,
//   },
//   passwordInput: {
//     flex: 1,
//     fontSize: 16,
//     paddingVertical: 8,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   rememberMeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   rememberMeText: {
//     fontSize: 14,
//     marginLeft: 8,
//   },
//   checkbox: {
//     width: 20,
//     height: 20,
//     borderRadius: 4,
//     borderWidth: 2,
//     borderColor: '#000000',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   checkedCheckbox: {
//     backgroundColor: '#000000',
//   },
//   loginButton: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: 'black',
//     padding: 16,
//     borderRadius: 0,
//     alignItems: 'center',
//   },
//   loginButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   googleButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 3,
//     padding: 12,
//     marginBottom: 20,
//   },
//   googleButtonText: {
//     fontSize: 16,
//     marginLeft: 8,
//   },
//   appleButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'black',
//     borderRadius: 3,
//     padding: 12,
//     marginBottom: 20,
//   },
//   appleButtonText: {
//     fontSize: 16,
//     marginLeft: 8,
//     color: 'white',
//   },

//   loginButton: {
//     position: 'absolute', 
//     bottom: 0, 
//     left: 0,
//     right: 0,
//     backgroundColor: 'black',
//     padding: 16,
//     borderRadius: 0,
//     alignItems: 'center',
//   },
//   loginButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   loginContainer: {
//     marginTop: 10,
//     alignItems: "center",
//   },
//   loginText: {
//     fontSize: 14,
//     color: "#aaa",
//   },
//   loginLink: {
//     color: "blue",
//     textDecorationLine: "underline",
//   },
// });



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
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.idToken;

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);

      const firebaseIdToken = await userCredential.user.getIdToken();

      const response = await fetch('http://10.0.2.2:8080/api/auth/signup/firebase', {
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
      const response = await fetch('http://10.0.2.2:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phNo, password }),
      });

      const responseData = await response.json();

      if (response.ok && responseData.success) {
        const { token, user } = responseData.data;
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('user', JSON.stringify(user));
        Alert.alert('Success', 'Login Successful!');
        navigation.replace('Home');
      } else if (!responseData.success) {
        Alert.alert('Not Verified', 'User is not verified. Go to the signup page.');
        navigation.navigate('Signup');
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
          style={styles.passwordInput}
          placeholder="⭐⭐⭐⭐⭐⭐⭐"
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
    fontWeight: 'bold',
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
    fontWeight: 'bold',
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




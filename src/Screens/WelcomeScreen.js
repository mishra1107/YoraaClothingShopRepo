// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity ,Image,Dimensions,  Alert,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome'; 
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; 
// const { width, height } = Dimensions.get("window");
// import { RFPercentage } from "react-native-responsive-fontsize";
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import auth from '@react-native-firebase/auth';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

// GoogleSignin.configure({
//   webClientId: '841829729642-5vo1cbgnrsl83sm8c8h63s7c0hf0i3mi.apps.googleusercontent.com', // Replace with your Web Client ID
// });
// const WelcomeScreen = ({ navigation }) => {
//     const [loading, setLoading] = useState(false);
  
//   const handleSignUpFirebase = async () => {
   
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
//   return (
//     <View style={styles.container}>
//       <Image 
//         source={require('../assests/images/Splash.png')} 
//         style={{marginBottom:80}} />

//        <View style={styles.buttonContainer}>
//         <TouchableOpacity  onPress={() => navigation.navigate('Login')} style={styles.loginButton}>
//           <Text style={styles.loginButtonText}>Log In</Text>
//         </TouchableOpacity>

//         <TouchableOpacity  onPress={() => navigation.navigate('Signup')} style={styles.signUpButton}>
//         <Text style={styles.signUpButtonText}>Sign Up</Text>
//         </TouchableOpacity>

// <View style={styles.dividerContainer}>
//   <View style={styles.divider} />
//   <Text style={styles.dividerText}>Or</Text>
//   <View style={styles.divider} />
// </View>
//         <TouchableOpacity  onPress={handleSignUpFirebase} style={styles.googleButton}>
       
//           <Image 
//         source={require('../assests/images/Gmail.png')} 
//         style={styles.icon}  />
//             <Text style={styles.googleButtonText}>Continue with Google</Text>
//          </TouchableOpacity>

//         <TouchableOpacity style={styles.appleButton}>
//           <View style={styles.iconWithText}>
//             <MaterialCommunityIcons name="apple" size={20} color="#FFFFFF" />
//             <Text style={styles.appleButtonText}>Continue with Apple</Text>
//           </View>
//         </TouchableOpacity>
//       </View>
//       <TouchableOpacity   onPress={() => navigation.navigate('Home')} style={styles.skipButton}>
//         <Text style={styles.skipButtonText}>SKIP</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   icon: {
//     width: 20,
//     height: 20
//   },
//   container: {
//     justifyContent: 'center',
//     flex: 1,
//     alignItems: 'center',
//   },
//   buttonContainer: {
//     width: '100%',
//     alignItems: 'center',
//     marginBottom: 50,
//   },
//   loginButton: {
//     backgroundColor: '#000000',
//     paddingVertical: 15,
//     width: width * 0.9,  // Increased width
//     alignItems: 'center',
//     borderRadius: 3,
//     marginBottom: 15,
//   },
//   loginButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   signUpButton: {
//     borderWidth: 1,
//     borderColor: '#000000',
//     paddingVertical: 15,
//     width: width * 0.9,  // Increased width
//     alignItems: 'center',
//     borderRadius: 3,
//     marginBottom: 15,
//   },
//   signUpButtonText: {
//     color: '#000000',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   dividerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: width * 0.9, 
//     marginVertical: 20,
//   },
//   divider: {
//     flex: 1,
//     height: 1,
//     backgroundColor: '#C4C4C4',
//   },
//   dividerText: {
//     marginHorizontal: 10,
//     color: '#C4C4C4',
//     fontSize: 14,
//   },
//   googleButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#C4C4C4',
//     paddingVertical: 15,
//     width: width * 0.9,  // Increased width
//     borderRadius: 3,
//     marginBottom: 15,
//     justifyContent: 'center',
//   },
//   googleButtonText: {
//     color: '#000000',
//     fontSize: 16,
//     marginLeft: 10,
//   },
//   appleButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#000000',
//     paddingVertical: 15,
//     width: width * 0.9,  // Increased width
//     borderRadius: 3,
//     justifyContent: 'center',
//   },
//   appleButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     marginLeft: 10,
//   },
//   iconWithText: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   skipButton: {
//     position: 'absolute',
//     bottom: 0, 
//     backgroundColor: "#000000",
//     paddingVertical: 18, 
//     width: '100%', 
//     alignItems: "center",
//     justifyContent: "center",
//     borderTopLeftRadius: 0, 
//     borderTopRightRadius: 0, 
//     borderBottomLeftRadius: 0, 
//     borderBottomRightRadius: 0, 
//   },
//   skipButtonText: {
//     color: "#FFFFFF",
//     fontSize: RFPercentage(2.5),
//     fontWeight: "bold",
//   },
  
  
// });


// export default WelcomeScreen;


import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; 
const { width } = Dimensions.get('window');
import { RFPercentage } from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '841829729642-5vo1cbgnrsl83sm8c8h63s7c0hf0i3mi.apps.googleusercontent.com',
});

const WelcomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

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

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>YORAA</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.signUpButton}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>Or</Text>
          <View style={styles.divider} />
        </View>

        <TouchableOpacity onPress={handleSignUpFirebase} style={styles.googleButton}>
          <Image source={require('../assests/images/Gmail.png')} style={styles.icon} />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.appleButton}>
          <MaterialCommunityIcons name="apple" size={20} color="#FFFFFF" />
          <Text style={styles.appleButtonText}>Continue with Apple</Text>
        </TouchableOpacity> */}
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.skipButton}>
        <Text style={styles.skipButtonText}>SKIP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 60,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    width: width * 0.85,
    alignItems: 'center',
    borderRadius: 3,
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpButton: {
    borderWidth: 1,
    borderColor: '#000000',
    paddingVertical: 15,
    width: width * 0.85,
    alignItems: 'center',
    borderRadius: 3,
    marginBottom: 15,
  },
  signUpButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.85,
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#C4C4C4',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#C4C4C4',
    fontSize: 14,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C4C4C4',
    paddingVertical: 15,
    width: width * 0.85,
    borderRadius: 3,
    marginBottom: 15,
    justifyContent: 'center',
  },
  googleButtonText: {
    color: '#000000',
    fontSize: 16,
    marginLeft: 10,
  },
  appleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingVertical: 15,
    width: width * 0.85,
    borderRadius: 3,
    justifyContent: 'center',
    marginBottom: 15,
  },
  appleButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  skipButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000',
    paddingVertical: 18,
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#FFFFFF',
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;


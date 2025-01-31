import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity ,Image,Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; 
const { width, height } = Dimensions.get("window");
import { RFPercentage } from "react-native-responsive-fontsize";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assests/images/Splash.png')} 
        style={{marginBottom:80}} />

       <View style={styles.buttonContainer}>
        <TouchableOpacity  onPress={() => navigation.navigate('Login')} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity  onPress={() => navigation.navigate('Signup')} style={styles.signUpButton}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>

<View style={styles.dividerContainer}>
  <View style={styles.divider} />
  <Text style={styles.dividerText}>Or</Text>
  <View style={styles.divider} />
</View>
        <TouchableOpacity style={styles.googleButton}>
       
          <Image 
        source={require('../assests/images/Gmail.png')} 
        style={styles.icon}  />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
         </TouchableOpacity>

        <TouchableOpacity style={styles.appleButton}>
          <View style={styles.iconWithText}>
            <MaterialCommunityIcons name="apple" size={20} color="#FFFFFF" />
            <Text style={styles.appleButtonText}>Continue with Apple</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity   onPress={() => navigation.navigate('Home')} style={styles.skipButton}>
        <Text style={styles.skipButtonText}>SKIP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20
  },
  container: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 50,
  },
  loginButton: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    width: width * 0.9,  // Increased width
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
    width: width * 0.9,  // Increased width
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
    width: width * 0.9, 
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
    width: width * 0.9,  // Increased width
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
    width: width * 0.9,  // Increased width
    borderRadius: 3,
    justifyContent: 'center',
  },
  appleButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 10,
  },
  iconWithText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skipButton: {
    position: 'absolute',
    bottom: 0, 
    backgroundColor: "#000000",
    paddingVertical: 18, 
    width: '100%', 
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 0, 
    borderTopRightRadius: 0, 
    borderBottomLeftRadius: 0, 
    borderBottomRightRadius: 0, 
  },
  skipButtonText: {
    color: "#FFFFFF",
    fontSize: RFPercentage(2.5),
    fontWeight: "bold",
  },
  
  
});


export default WelcomeScreen;

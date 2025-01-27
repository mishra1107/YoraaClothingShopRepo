import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity ,Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; 

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assests/images/Splash.png')} // Update the path to your local image
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

        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.appleButton}>
          <View style={styles.iconWithText}>
            <MaterialCommunityIcons name="apple" size={20} color="#FFFFFF" />
            <Text style={styles.appleButtonText}>Continue with Apple</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.skipButton}>
        <Text style={styles.skipButtonText}>SKIP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  icon:{
    width:20,height:20
  },
  container: {
    // flex: 1,
    // backgroundColor: '#FFFFFF',
    // alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: 20,
    flex: 1,
    alignItems: 'center', 
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 90,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom:50,
  },
  loginButton: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    width: '80%',
    alignItems: 'center',
    borderRadius: 5,
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
    width: '80%',
    alignItems: 'center',
    borderRadius: 5,
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
    width: '80%',
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
    width: '80%',
    borderRadius: 5,
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
    width: '80%',
    borderRadius: 5,
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
  absolute: 'position',
 top:110,
    backgroundColor: '#000000',
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
 
});

export default WelcomeScreen;

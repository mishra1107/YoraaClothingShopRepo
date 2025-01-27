import React, {useState} from 'react';
import {Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Platform} from 'react-native';


export default function LoginScreen({navigation}) {
  const [rememberMe, setRememberMe] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Welcome')}
        style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>LogIn</Text>

      <TextInput
        style={styles.input}
        placeholder="Mobile No."
        keyboardType="phone-pad"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Enter your password"
          secureTextEntry={!passwordVisible} // Toggle visibility
          value={password}
          onChangeText={setPassword}
        />
         <TouchableOpacity onPress={togglePasswordVisibility} >
        <Icon 
          name={passwordVisible ? 'visibility' : 'visibility-off'} 
          size={20} 
          color="#aaa" 
        />
      </TouchableOpacity>
      </View>

      <View style={styles.row}>
      <View style={styles.rememberMeContainer}>
        <TouchableOpacity
          style={[styles.checkbox, isChecked && styles.checkedCheckbox]}
          onPress={() => setIsChecked(!isChecked)}
        >
          {isChecked && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>
        <Text style={styles.rememberMeText}>Remember me</Text>
      </View>
      <TouchableOpacity>
        <Text >Forgot password?</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.dividerContainer}>
  <View style={styles.divider} />
  <Text style={styles.dividerText}>Or</Text>
  <View style={styles.divider} />
</View>
     

      <TouchableOpacity style={styles.googleButton}>
       
        <Image 
                source={require('../assests/images/Gmail.png')} 
                style={{width:20,height:20}}  />
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.appleButton}>
        <FontAwesome name="apple" size={20} color="white" />
        <Text style={styles.appleButtonText}>Continue with Apple</Text>
      </TouchableOpacity>

      <View>
  {/* <Text style={styles.signupText}>
    Don't have an account?{' '}
    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
      <Text style={styles.signupLink}>Sign-up</Text>
    </TouchableOpacity>
  </Text> */}
   <TouchableOpacity style={styles.loginContainer} onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.loginText}>
           Don't have an account? <Text style={styles.loginLink}>Sign-up</Text>
          </Text>
        </TouchableOpacity>
</View>

      <TouchableOpacity
        onPress={() => navigation.navigate('LoginVerifyOtp')}
        style={styles.loginButton}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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

  divider1: {
  height:10,
    flex: 1,
    height: 1,
    backgroundColor: '#C4C4C4',
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
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkedCheckbox: {
    backgroundColor: '#000000',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  rememberMeText: {
    fontSize: 16,
    color: '#333',
  },
  forgotPassword: {
    fontSize: 16,
    color: 'black',
    textDecorationLine: 'underline',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    fontSize: 14,
    marginLeft: 8,
  },
  forgotPassword: {
    fontSize: 14,
    color: '#007BFF',
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
  signupText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 14,
    color: '#aaa',
  },
  signupLink: {
    top: 3,
   
  },
  loginButton: {
    position: 'absolute', // Position the button absolutely
    bottom: 0, // Stick to the bottom of the screen
    left: 0,
    right: 0,
    backgroundColor: 'black',
    padding: 16,
    borderRadius: 0, // Full-width button
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Ensure it spans the full width
    marginVertical: 20,
  },
  divider: {
    flex: 1, // Allow equal space for both lines
    height: 1,
    backgroundColor: '#C4C4C4',
  },
  dividerText: {
    marginHorizontal: 10, // Spacing between "Or" and the lines
    color: '#C4C4C4',
    fontSize: 14,
  },
  
});

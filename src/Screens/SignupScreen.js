
import React, {useState,useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,Image, KeyboardAvoidingView,ScrollView

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



  const scrollViewRef = useRef();

  const scrollToEnd = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 300);
  };

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
      const response = await fetch("http://18.144.80.232:8080/api/auth/signup", {
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
    // <View style={styles.container}>

    <KeyboardAvoidingView 
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
    style={styles.container}
    keyboardVerticalOffset={100} // Important for Android
  >
    <ScrollView 
      ref={scrollViewRef}
      contentContainerStyle={{ flexGrow: 1 }} 
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}  >


      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => navigation.goBack()}>
        <Image 
          source={require('../assests/images/BackArrow.png')}  // ✅ Use local asset
          style={styles.backIconImage}  // ✅ Apply styles for proper size
        />
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
            placeholder="★★★★★★★"
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
            placeholder="★★★★★★★"
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
      </ScrollView>
      </KeyboardAvoidingView>
    
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
    // fontWeight: 'bold',
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
    // fontWeight: 'bold',
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

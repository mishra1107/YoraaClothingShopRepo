
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  PermissionsAndroid,
  Platform,
  ScrollView,
  Modal,
  FlatList,
  ActivityIndicator

} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import auth from '@react-native-firebase/auth';
// import axios from 'axios';
import { useColorScheme } from 'react-native';
const EditProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [anniversaryDate, setAnniversaryDate] = useState(false);
  const { profile } = route.params || {};
  const [otpRequested, setOtpRequested] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [verificationId, setVerificationId] = useState(null);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState('');
  const colorScheme = useColorScheme();
  const placeholderTextColor = colorScheme === 'dark' ? '#BBBBBB' : '#888888';

  const [profileData, setProfileData] = useState({
    name: profile?.user?.name || '',
    phNo: profile?.user?.phNo || '',
    address: profile?.address || '',
    email: profile?.email || '',
    dob: profile?.dob || '',
    anniversary: profile?.anniversary || '',
    gender: profile?.gender || '',
    imageUrl: profile?.imageUrl || null
  });
  const [profileImage, setProfileImage] = useState(
    profileData.imageUrl ? { uri: profileData.imageUrl } : null
  );
  console.log("editProfileScreen", profileData);
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.warn('No token found in AsyncStorage.');
          return;
        }

        const apiUrl = 'http://192.168.1.13:8080/api/userProfile/getProfile';
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch user profile - Status: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (data && data.user) {
          setUserData(data.user);
          console.log("data.user", data.user)
        } else {
          console.warn('No user data found in response.');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error.message);
      }
    };

    fetchUserProfile();
  }, []);
  const [isGenderDropdownVisible, setGenderDropdownVisible] = useState(false);
  const genderOptions = ['Male', 'Female', 'Other'];
  const handleSendOtp = async () => {
    const phone = profileData.phNo.trim();

    if (!/^\d{10}$/.test(phone)) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number.');
      return;
    }

    setLoading(true);

    try {
      const confirmation = await auth().signInWithPhoneNumber(`+91${phone}`);
      setVerificationId(confirmation.verificationId);
      setOtpRequested(true);
      Alert.alert('OTP Sent', `OTP has been sent to +91${phone}`);
    } catch (error) {
      console.error('Error sending OTP:', error);
      Alert.alert('Error', 'Failed to send OTP. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    const phone = profileData.phNo.trim();

    if (!/^\d{10}$/.test(phone)) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number.');
      return;
    }

    setLoading(true);

    try {
      const confirmation = await auth().signInWithPhoneNumber(`+91${phone}`);
      setVerificationId(confirmation.verificationId);
      setOtpRequested(true);
      Alert.alert('OTP Resent', `A new OTP has been sent to +91${phone}`);
    } catch (error) {
      console.error('Error resending OTP:', error);
      Alert.alert('Error', 'Failed to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP.');
      return;
    }

    setLoading(true);

    try {
      if (!verificationId) {
        Alert.alert('Error', 'Verification ID is missing. Request OTP again.');
        return;
      }

      const credential = auth.PhoneAuthProvider.credential(verificationId, otp);
      await auth().signInWithCredential(credential);

      Alert.alert('Success', 'Phone number verified successfully!');
      setOtpVerified(true);
      userData.isPhoneVerified=true;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera access to take photos',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const convertToDateFormat = (timestamp) => {
    if (!timestamp || timestamp.trim() === '') {
      return "";
    }
    const date = new Date(timestamp);
    return date.toISOString().split('T')[0];
  };

  const handleImagePick = async () => {
    Alert.alert('Upload Image', 'Choose an option', [
      {
        text: 'Camera',
        onPress: async () => {
          const permission = await requestCameraPermission();
          if (!permission) {
            Alert.alert('Permission Denied', 'Camera permission is required');
            return;
          }
          launchCamera({ mediaType: 'photo', quality: 1 }, (response) => {
            if (response.didCancel) {
              console.log('User cancelled camera picker');
            } else if (response.errorCode) {
              console.log('Camera Error: ', response.errorMessage);
            } else if (response.assets) {
              const newImageUri = response.assets[0].uri;
              setProfileImage({ uri: newImageUri });
              setProfileData({ ...profileData, imageUrl: newImageUri });
            }
          });
        },
      },
      {
        text: 'Gallery',
        onPress: () =>
          launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
            if (response.didCancel) {
              console.log('User cancelled gallery picker');
            } else if (response.errorCode) {
              console.log('Gallery Error: ', response.errorMessage);
            } else if (response.assets) {
              const newImageUri = response.assets[0].uri;
              setProfileImage({ uri: newImageUri });
              setProfileData({ ...profileData, imageUrl: newImageUri });
            }
          }),
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleInputChange = (key, value) => {
    setProfileData({ ...profileData, [key]: value });
  };

  const handleSaveProfile = async () => {
    console.log("qqqqqqqqqqqqqqqqq")
    try {
      console.log("qqqqqqqqqqqqqqqqq1111111111")

      const formData = new FormData();
      Object.entries(profileData).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value);
        }
      });

      if (profileImage && profileImage.uri) {
        formData.append('image', {
          uri: profileImage.uri,
          type: 'image/jpeg',
          name: 'profile.jpg',
        });
      }
      console.log("qqqqqqqqqqqqqqqq22222222", formData)

      const token = await AsyncStorage.getItem('token');
      const response = await fetch('http://192.168.1.13:8080/api/userProfile/updateProfile', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to update profile');

      Alert.alert('Success', 'Profile updated successfully');
      navigation.navigate('Profile', { refresh: true });
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', error.message);
    }
  };
  const sendVerificationEmail = async () => {
    try {
      const response = await fetch('http://192.168.1.13:8080/api/auth/sendVerificationEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: profileData.email, phone: profileData.phNo }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        Alert.alert('Success', 'Verification email sent successfully.');
      } else {
        Alert.alert('Error', data.message || 'Failed to send verification email.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };
  const verifyEmail = async ( otp) => {
    try {
      const response = await fetch('http://192.168.1.13:8080/api/auth/verifyEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: profileData.email, phone: profileData.phNo,otp:otp }),


      });
  
      const data = await response.json();
  
      if (response.ok) {
        Alert.alert('Success', 'Email verified successfully.');
        userData.isEmailVerified=true;
      } else {
        Alert.alert('Error', data.message || 'Failed to verify email.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      {/* <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.header}>PROFILE</Text>
      </View> */}

<View style={styles.header}>
<TouchableOpacity
  style={styles.backIcon}
  onPress={() => navigation.goBack()}
  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // ✅ Expands touch area
>
  <Image 
    source={require('../assests/images/BackArrow.png')}
    style={styles.backIconImage}
  />
</TouchableOpacity>

  <Text style={styles.headerTitle}>PROFILE</Text>
</View>
      <View style={styles.avatarContainer}>
        <View style={styles.imageBorder}>
          <Image source={profileImage} style={styles.profileImage} />
          <TouchableOpacity style={styles.cameraIcon} onPress={handleImagePick}>
            <Icon name="camera" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <TextInput style={styles.input} placeholderTextColor={placeholderTextColor} placeholder="Name" value={profileData.name} onChangeText={(text) => handleInputChange('name', text)} />
      <TextInput style={styles.input} placeholderTextColor={placeholderTextColor}  placeholder="Address" value={profileData.address} onChangeText={(text) => handleInputChange('address', text)} />

      <View>
  {/* Phone Input */}
  <TextInput
    style={[styles.input, userData.isPhoneVerified && styles.disabledInput]}
    placeholderTextColor={placeholderTextColor}
    placeholder="Phone"
    keyboardType="phone-pad"
    value={profileData.phNo}
    onChangeText={(text) => handleInputChange('phNo', text)}
    editable={!userData.isPhoneVerified} // Disable input if phone is verified
  />

  {!userData.isPhoneVerified && (
    <>
      {/* Send OTP / Resend OTP Button */}
      <TouchableOpacity
        style={styles.otpButton}
        onPress={otpRequested ? handleResendOTP : handleSendOtp}
      >
        <Text style={styles.otpButtonText}>
          {otpRequested ? "Resend OTP" : "Send OTP"}
        </Text>
      </TouchableOpacity>

      {/* OTP Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        keyboardType="numeric"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
      />

      {/* Verify OTP Button */}
      <TouchableOpacity
        style={styles.otpButton}
        onPress={() => handleVerifyOtp(otp)}
        disabled={loading || otp.length !== 6}
      >
        {loading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.otpButtonText}>Verify OTP</Text>
        )}
      </TouchableOpacity>
    </>
  )}
</View>

<View>
  {/* Phone Input */}
  <TextInput
    style={[styles.input, userData.isEmailVerified && styles.disabledInput]}
    placeholderTextColor={placeholderTextColor}
    placeholder="Email"
    keyboardType="email-address"
    value={profileData.email}
    onChangeText={(text) => handleInputChange('email', text)}
    editable={!userData.isEmailVerified} // Disable input if phone is verified
  />

  {!userData.isEmailVerified && (
    <>
      {/* Send OTP / Resend OTP Button */}
      <TouchableOpacity
        style={styles.otpButton}
        onPress={otpRequested ? sendVerificationEmail : sendVerificationEmail}
      >
        <Text style={styles.otpButtonText}>
          {otpRequested ? "Resend OTP" : "Send OTP"}
        </Text>
      </TouchableOpacity>

      {/* OTP Input */}
      <TextInput
        style={styles.input}
        placeholderTextColor={placeholderTextColor}
        placeholder="Enter OTP"
        keyboardType="numeric"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
      />

      {/* Verify OTP Button */}
      <TouchableOpacity
        style={styles.otpButton}
        onPress={() => verifyEmail(otp)}
        disabled={loading || otp.length !== 6}
      >
        {loading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.otpButtonText}>Verify OTP</Text>
        )}
      </TouchableOpacity>
    </>
  )}
</View>
      <Text style={styles.subHeader}>OTHER DETAILS</Text>

      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <TextInput
        placeholderTextColor={placeholderTextColor}
          style={styles.input}
          placeholder="Date of Birth"
          value={profileData.dob ? convertToDateFormat(profileData.dob) : ""}
          editable={false}
        />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={profileData.dob ? new Date(profileData.dob) : new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              handleInputChange('dob', selectedDate.toISOString());
            }
          }}
        />
      )}

      <TouchableOpacity onPress={() => setAnniversaryDate(true)}>
        <TextInput
        placeholderTextColor={placeholderTextColor}
          style={styles.input}
          placeholder="Anniversary"
          value={profileData.anniversary ? convertToDateFormat(profileData.anniversary) : ""}
          editable={false}
        />
      </TouchableOpacity>
      {anniversaryDate && (
        <DateTimePicker
          value={profileData.anniversary ? new Date(profileData.anniversary) : new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setAnniversaryDate(false);
            if (selectedDate) {
              handleInputChange('anniversary', selectedDate.toISOString());
            }
          }}
        />
      )}

      <TouchableOpacity style={styles.inputWrapper} onPress={() => setGenderDropdownVisible(!isGenderDropdownVisible)}>
        <TextInput
        placeholderTextColor={placeholderTextColor}
          style={styles.input}
          placeholder="Gender"
          value={profileData.gender}
          editable={false}
        />
        <Icon name="caret-down" size={16} color="#888" style={styles.dropdownIcon} />
      </TouchableOpacity>

      {isGenderDropdownVisible && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={isGenderDropdownVisible}
          onRequestClose={() => setGenderDropdownVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <FlatList
                data={genderOptions}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.dropdownOption}
                    onPress={() => {
                      handleInputChange('gender', item);
                      setGenderDropdownVisible(false);
                    }}
                  >
                    <Text style={styles.dropdownText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>
      )}

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
        <Text style={styles.saveButtonText}>SAVE PROFILE</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center", // Ensures both back icon and title align properly
    justifyContent: "center", // Centers content in row
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingHorizontal: 10,
  },
  backIcon: {
    position: "absolute",
    left: 10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10, 
    width: 40,  
    height: 40, 
  },
  
  backIconImage: {
    width: 24,
    height: 24,
    tintColor: 'black',
  },
  headerTitle: {
   marginBottom:10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 50, // Ensures scrolling even with less content
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 10,
  },
  avatarContainer: {
    alignSelf: 'center',
    position: 'relative',
    marginBottom: 20,
  },
  imageBorder: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 50,
    padding: 3,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#000',
    width: 25,
    height: 25,
    borderRadius: 12.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 12,
    fontSize: 14,
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
    marginBottom: 10,
  },
  inputWrapper: {
    position: 'relative',
  },
  dropdownIcon: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -8 }],
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: 200,
  },
  dropdownOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  dropdownText: {
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: 'black',
    padding: 16,
    borderRadius: 0,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledInput: {
    backgroundColor: "#f0f0f0",
    color: "#888", // Light grey text
  } 
});

export default EditProfileScreen;

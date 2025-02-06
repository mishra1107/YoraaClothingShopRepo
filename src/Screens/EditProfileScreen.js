import React, { useState } from 'react';
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
  ScrollView
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [anniversaryDate, setAnniversaryDate] = useState(false);
  const { profile } = route.params || {};
  const [profileData, setProfileData] = useState({
    name: profile?.user?.name || '',
    phone: profile?.user?.phNo || '',
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
  // Request Camera Permission (For Android)
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
    return true; // iOS doesn't require explicit permission check
  };
  const convertToDateFormat = (timestamp) => {
    if (!timestamp || timestamp.trim() === '') {
      return "";
    }
    const date = new Date(timestamp);
    return date.toISOString().split('T')[0]; // Extracts YYYY-MM-DD
  };
  // Open Camera or Gallery
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
              setProfileImage({ uri: response.assets[0].uri });
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
              setProfileImage({ uri: response.assets[0].uri });
              setProfileData({ ...profileData, imageUrl: newImageUri });
            }
          }),
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };
  const handleInputChange = (key, value) => {
    if (key === "stylePreferences") {
      const arrayValue = value.split(',').map(item => item.trim()); // Convert string to array
      setProfileData({ ...profileData, [key]: arrayValue });
    } else {
      setProfileData({ ...profileData, [key]: value });
    }
  };
  
  const handleSaveProfile = async () => {
    console.log("qqqqqqqqqqqqqqqqqqqqqqq")
    try {
      const formData = new FormData();

      Object.entries(profileData).forEach(([key, value]) => {
        if (value) {

          if (key === "stylePreferences") {
            formData.append(key,JSON.stringify(value) ); // Convert array to JSON string
          } else {
            formData.append(key, value);
          }

        }
      });

      // Ensure the image is properly added
      if (profileImage && profileImage.uri) {
        console.log("profile image", profileImage)
        formData.append('image', {
          uri: profileImage.uri,
          type: 'image/jpeg',
          name: 'profile.jpg',
        });
      }
      console.log("formData", formData);

      const token = await AsyncStorage.getItem('token');
      const response = await fetch('http://10.0.2.2:8080/api/userProfile/updateProfile', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to update profile');

      Alert.alert('Success', 'Profile updated successfully');
      navigation.goBack();
    } catch (error) {
      console.error('❌ Error updating profile:', error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={20} color="#000" />
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.header}>PROFILE</Text>

      {/* Profile Image with Camera Icon Overlay */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: profileData?.imageUrl }} style={styles.profileImage} />
        <TouchableOpacity style={styles.cameraIcon} onPress={handleImagePick}>
          <Icon name="camera" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      <TextInput style={styles.input} placeholder="Name" value={profileData.name} onChangeText={(text) => handleInputChange('name', text)} />
      <TextInput style={styles.input} placeholder="Address" value={profileData.address} onChangeText={(text) => handleInputChange('address', text)} />
      <TextInput style={styles.input} placeholder="Phone" keyboardType="phone-pad" value={profileData.phone} onChangeText={(text) => handleInputChange('phone', text)} />
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={profileData.email} onChangeText={(text) => handleInputChange('email', text)} />

      {/* Other Details */}
      <Text style={styles.subHeader}>OTHER DETAILS</Text>
      {/* <TextInput style={styles.input} placeholder="Date of Birth" value={convertToDateFormat(profileData.dob)} onChangeText={(text) => handleInputChange('dob', text)} /> */}
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <TextInput
          style={styles.input}
          placeholder="Date of Birth"
          value={profileData.dob ? convertToDateFormat(profileData.dob) : ""}
          editable={false} // Prevent manual text input
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
        <TextInput style={styles.input} placeholder="Anniversary" value={profileData.anniversary ? convertToDateFormat(profileData.anniversary) : ""} editable={false} />

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

      <TextInput style={styles.input} placeholder="Gender" value={profileData.gender} onChangeText={(text) => handleInputChange('gender', text)} />



      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
        <Text style={styles.saveButtonText}>SAVE PROFILE</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  backButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#000',
    marginBottom: 20,
  },
  imageContainer: {
    alignSelf: 'center',
    position: 'relative',
    marginBottom: 20,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
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
  saveButton: {
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
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

});

export default EditProfileScreen;

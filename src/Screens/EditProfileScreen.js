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
  Platform
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(require('../assests/images/Profile.png'));

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
              setProfileImage({ uri: response.assets[0].uri });
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
              setProfileImage({ uri: response.assets[0].uri });
            }
          }),
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={20} color="#000" />
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.header}>PROFILE</Text>

      {/* Profile Image with Camera Icon Overlay */}
      <View style={styles.imageContainer}>
        <Image source={profileImage} style={styles.profileImage} />
        <TouchableOpacity style={styles.cameraIcon} onPress={handleImagePick}>
          <Icon name="camera" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      <TextInput style={styles.input} placeholder="Rithik" />
      <TextInput style={styles.input} placeholder="Address" />
      <TextInput style={styles.input} placeholder="+91 1234-253-311" keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="@gmail.com" keyboardType="email-address" />

      {/* Other Details Section */}
      <Text style={styles.subHeader}>OTHER DETAILS</Text>
      <TextInput style={styles.input} placeholder="Date of Birth" />
      <TextInput style={styles.input} placeholder="Anniversary" />
      <TextInput style={styles.input} placeholder="Gender" />
      <TextInput style={styles.input} placeholder="Style Preference" />

      {/* Save Profile Button */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>SAVE PROFILE</Text>
      </TouchableOpacity>
    </View>
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
    backgroundColor: '#000',
    padding: 14,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;

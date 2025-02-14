// import React, {useEffect, useState} from 'react';
// import {
//   Image,
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const UpdateProfileScreen = () => {
//   const navigation = useNavigation();

//   const [profile, setProfile] = useState({});
//   const convertToDateFormat = timestamp => {
//     if (!timestamp || timestamp.trim() === '') {
//       return '';
//     }
//     const date = new Date(timestamp);
//     return date.toISOString().split('T')[0]; // Extracts YYYY-MM-DD
//   };

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const token = await AsyncStorage.getItem('token');
//         if (!token) {
//           console.warn(' No token found in AsyncStorage.');
//           return;
//         }

//         const apiUrl = 'http://18.144.80.232:8080/api/userProfile/getProfile';
//         console.log(' Fetching user profile from:', apiUrl);

//         const response = await fetch(apiUrl, {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           throw new Error(
//             ` Failed to fetch user profile - Status: ${response.status} ${response.statusText}`,
//           );
//         }

//         const data = await response.json();

//         console.log(' Data received:', JSON.stringify(data, null, 2));

//         if (data && data.user) {
//           setProfile(data); // Store the entire profile data

//           // Extract name, email, and phone number
//           // Extract name, email, and phone number
//           const {name, phNo} = data.user;
//           const {email} = data;

//           // Save to AsyncStorage only if values are not null or undefined
//           if (name) {
//             await AsyncStorage.setItem('user_name', name);
//             console.log('Name saved:', name);
//           }
//           else
//           await AsyncStorage.setItem('user_name', "demo");


//           if (email) {
//             await AsyncStorage.setItem('user_email', email);
//             console.log('Email saved:', email);
//           }
//           else
//           await AsyncStorage.setItem('user_email', "demo@gmail.com");


//           if (phNo) {
//             await AsyncStorage.setItem('user_phNo', phNo);
//             console.log('Phone Number saved:', phNo);
//           }
//           else
//           await AsyncStorage.setItem('user_phNo', "11111111111");


//           // Optional: Log when no data is saved
//           if (!name && !email && !phNo) {
//             console.log(
//               'No user data was saved to AsyncStorage because all values were null or undefined.',
//             );
//           }
//         } else {
//           console.warn(' No user data found in response.');
//         }
//       } catch (error) {
//         console.error(' Error fetching user profile:', error.message);
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   useEffect(() => {
//     const logStoredData = async () => {
//       try {
//         const name = await AsyncStorage.getItem('user_name');
//         const email = await AsyncStorage.getItem('user_email');
//         const phNo = await AsyncStorage.getItem('user_phNo');

//         console.log('📦 Retrieved from AsyncStorage:');
//         console.log('Name:', name);
//         console.log('Email:', email);
//         console.log('Phone Number:', phNo);
//       } catch (error) {
//         console.error(
//           ' Error retrieving user data from AsyncStorage:',
//           error.message,
//         );
//       }
//     };

//     logStoredData();
//   }, []);

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {/* Header Section with Back Icon & Profile Title */}
//       <View style={styles.headerContainer}>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={styles.backButton}>
//           <Icon name="arrow-left" size={20} color="#000" />
//         </TouchableOpacity>
//         <Text style={styles.header}>PROFILE</Text>
//       </View>

//       {/* Input Fields */}
//       <TextInput
//         style={styles.input}
//         placeholder="Rithik"
//         value={profile?.user?.name || ''}
//         editable={false}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Address"
//         value={profile?.address}
//         editable={false}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Phone"
//         value={profile?.user?.phNo || ''}
//         keyboardType="phone-pad"
//         editable={false}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="@gmail.com"
//         keyboardType="email-address"
//         value={profile?.email}
//         editable={false}
//       />

//       {/* Other Details Section */}
//       <Text style={styles.subHeader}>OTHER DETAILS</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Date of Birth"
//         value={convertToDateFormat(profile?.dob)}
//         editable={false}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Anniversary"
//         value={convertToDateFormat(profile?.anniversary)}
//         editable={false}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Gender"
//         value={profile?.gender}
//         editable={false}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Style Preference"
//         value={profile?.stylePreferences || ''}
//         editable={false}
//       />

//       {/* Note Text */}
//       <Text style={styles.note}>
//         We need your details to unlock personalized gift cards and exclusive
//         offers tailored just for you
//       </Text>

//       {/* Edit Profile Button */}
//       <TouchableOpacity
//         onPress={() => navigation.navigate('EditProfile', {profile})}
//         style={styles.button}>
//         <Text style={styles.buttonText}>EDIT PROFILE</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 20,
//     paddingVertical: 30,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   backButton: {
//     padding: 10,
//   },
//   header: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#000',
//     marginLeft: 10,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 15,
//     fontSize: 14,
//   },
//   subHeader: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginVertical: 15,
//   },
//   note: {
//     fontSize: 12,
//     color: '#888',
//     textAlign: 'center',
//     marginVertical: 20,
//   },
//   button: {
//     backgroundColor: '#000',
//     paddingVertical: 15,
//     borderRadius: 3,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
// });
// export default UpdateProfileScreen;


import React, {useEffect, useState} from 'react'; 
import {
  Image,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  PermissionsAndroid,
  Platform
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { useColorScheme } from 'react-native';

const UpdateProfileScreen = () => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const colorScheme = useColorScheme();
const placeholderTextColor = colorScheme === 'dark' ? '#BBBBBB' : '#888888';

  const convertToDateFormat = timestamp => {
    if (!timestamp || timestamp.trim() === '') {
      return '';
    }
    const date = new Date(timestamp);
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.warn('No token found in AsyncStorage.');
          return;
        }

        const apiUrl = 'http://18.144.80.232:8080/api/userProfile/getProfile';
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
          setProfile(data);
          setProfileImage(data.imageUrl ? { uri: data.imageUrl } : null);

          const { name, phNo } = data.user;
          const { email } = data;

          await AsyncStorage.setItem('user_name', name || 'demo');
          await AsyncStorage.setItem('user_email', email || 'demo@gmail.com');
          await AsyncStorage.setItem('user_phNo', phNo || '1111111111');
        } else {
          console.warn('No user data found in response.');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error.message);
      }
    };

    fetchUserProfile();
  }, []);

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
            }
          }),
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
          <Image source={profileImage || require('../assests/images/Profile.png')} style={styles.profileImage} />
          {/* <TouchableOpacity style={styles.cameraIcon} onPress={handleImagePick}>
            <Icon name="camera" size={18} color="#fff" />
          </TouchableOpacity> */}
        </View>
      </View>

      <TextInput style={styles.input} placeholder="Rithik"  placeholderTextColor={placeholderTextColor}   value={profile?.user?.name || ''} editable={false} />
      <TextInput style={styles.input} placeholder="Address" placeholderTextColor={placeholderTextColor}  value={profile?.address} editable={false} />
      <TextInput style={styles.input} placeholder="Phone"  placeholderTextColor={placeholderTextColor}  value={profile?.user?.phNo || ''} keyboardType="phone-pad" editable={false} />
      <TextInput style={styles.input} placeholder="@gmail.com" placeholderTextColor={placeholderTextColor}  keyboardType="email-address" value={profile?.email} editable={false} />

      <Text style={styles.subHeader}>OTHER DETAILS</Text>
      <TextInput style={styles.input} placeholder="Date of Birth" placeholderTextColor={placeholderTextColor}  value={convertToDateFormat(profile?.dob)} editable={false} />
      <TextInput style={styles.input} placeholder="Anniversary" placeholderTextColor={placeholderTextColor}  value={convertToDateFormat(profile?.anniversary)} editable={false} />
      <TextInput style={styles.input} placeholder="Gender" placeholderTextColor={placeholderTextColor}  value={profile?.gender} editable={false} />
      <TextInput style={styles.input} placeholder="Style Preference" placeholderTextColor={placeholderTextColor}   value={profile?.stylePreferences || ''} editable={false} />

      <Text style={styles.note}>We need your details to unlock personalized gift cards and exclusive offers tailored just for you</Text>

      <TouchableOpacity onPress={() => navigation.navigate('EditProfile', { profile })} style={styles.button}>
        <Text style={styles.buttonText}>EDIT PROFILE</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({


  header: {
    flexDirection: "row",
    alignItems: "center", // Ensures both back icon and title align properly
    justifyContent: "center", // Centers content in row
   
    backgroundColor: "#fff",
   
    paddingHorizontal: 10,
  },
  backIcon: {
    position: "absolute",
    left: 10, // Moves icon to the left
    alignItems: "center", // Keeps it vertically centered
    justifyContent: "center",
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
    paddingVertical: 30,
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
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 14,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  note: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 3,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
export default UpdateProfileScreen;


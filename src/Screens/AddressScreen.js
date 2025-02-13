// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const AddressScreen = () => {
//   const navigation = useNavigation();
  
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [address, setAddress] = useState('');
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
//   const [pinCode, setPinCode] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [currentAddress, setCurrentAddress] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);


//   useEffect(() => {
//     fetchCurrentAddress();
//   }, []);

//   const fetchCurrentAddress = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       if (!token) throw new Error('No token found');

//       const response = await fetch('http://18.144.80.232:8080/api/address/user', {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//       });

//       const data = await response.json();

//       if (data && data.data && data.data.length > 0) {
//         setCurrentAddress(data.data[0]);
//       } else {
//         setCurrentAddress(null);
//       }
//     } catch (error) {
//       console.error("Fetch Address Error:", error);
//       Alert.alert("Error", "Failed to fetch address.");
//       setCurrentAddress(null);
//     }
//   };

//   const handleConfirmAddress = async () => {
//     if (!firstName || !lastName || !address || !city || !state || !pinCode || !phoneNumber) {
//       Alert.alert("Validation Error", "Please fill all fields.");
//       return;
//     }

//     const addressData = {
//       firstName,
//       lastName,
//       type: 'new',
//       address,
//       city,
//       state,
//       pinCode,
//       country: 'INDIA',
//       phoneNumber,
//     };

//     try {
//       const token = await AsyncStorage.getItem('token');
//       if (!token) throw new Error('No token found');

//       const response = await fetch('http://18.144.80.232:8080/api/address/createAddress', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(addressData)
//       });

//       const data = await response.json();

//       if (data.success) {
//         Alert.alert("Success", "Address added successfully!");
//         fetchCurrentAddress();
//       } else {
//         Alert.alert("Error", data.message || "Failed to add address.");
//       }
//     } catch (error) {
//       console.error("Create Address Error:", error);
//       Alert.alert("Error", "Something went wrong!");
//     }
//   };



//   const handleEditAddress = () => {
//     setIsEditing(true);
//     setFirstName(currentAddress.firstName);
//     setLastName(currentAddress.lastName);
//     setAddress(currentAddress.address);
//     setCity(currentAddress.city);
//     setState(currentAddress.state);
//     setPinCode(currentAddress.pinCode);
//     setPhoneNumber(currentAddress.phoneNumber);
//   };

//   const handleUpdateAddress = async () => {
//     if (!firstName || !lastName || !address || !city || !state || !pinCode || !phoneNumber) {
//       Alert.alert("Validation Error", "Please fill all fields.");
//       return;
//     }

//     const addressData = {
//       firstName,
//       lastName,
//       type: 'new',
//       address,  
//       city,
//       state,
//       pinCode,
//       country: 'INDIA',
//       phoneNumber,
//     };
//     try {
//       const token = await AsyncStorage.getItem('token');
//       if (!token) throw new Error('No token found');
    
//       const response = await fetch(`http://18.144.80.232:8080/api/address/updateById/${currentAddress._id}`, {
//         method: 'PATCH',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(addressData)
//       });
    
//       const data = await response.json();
//       console.log("Data:", data);
    
//       if (data.success) {
//         Alert.alert("Success", "Address updated successfully!");
//         setIsEditing(false);
//         fetchCurrentAddress();
//       } else {
//         Alert.alert("Error", data.message || "Failed to update address.");
//       }
//     } catch (error) {
//       console.error("Update Address Error:", error);
//       Alert.alert("Error", error.message || "Something went wrong!");
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={styles.container}
//     >
//       <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//             <Icon name="arrow-back" size={24} color="black" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>ADD ADDRESS</Text>
//         </View>

//         {currentAddress && !isEditing ? (
//           <View style={styles.section}>
//             <View style={styles.addressHeader}>
//               <Text style={styles.sectionTitle}>CURRENT ADDRESS</Text>
//               <TouchableOpacity onPress={handleEditAddress}>
//                 <Icon name="edit" size={20} color="black" />
//               </TouchableOpacity>
//             </View>
//             <Text style={styles.currentAddress}>
//               {currentAddress.address}, {'\n'}
//               {currentAddress.city}, {currentAddress.state} {currentAddress.pinCode} {'\n'}
//               {currentAddress.country} {'\n'}
//               {currentAddress.phoneNumber}
//             </Text>
//           </View>
//         ) : (
//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>{isEditing ? 'EDIT ADDRESS' : 'NEW ADDRESS'}</Text>
//             <View style={styles.row}>
//               <TextInput
//                 style={styles.inputHalf}
//                 placeholder="First name"
//                 value={firstName}
//                 onChangeText={setFirstName}
//               />
//               <TextInput
//                 style={styles.inputHalf}
//                 placeholder="Last name"
//                 value={lastName}
//                 onChangeText={setLastName}
//               />
//             </View>
//             <TextInput
//               style={styles.inputFull}
//               placeholder="Address"
//               value={address}
//               onChangeText={setAddress}
//             />
//             <TextInput
//               style={styles.inputFull}
//               placeholder="City"
//               value={city}
//               onChangeText={setCity}
//             />
//             <View style={styles.row}>
//               <TextInput
//                 style={styles.inputHalf}
//                 placeholder="State"
//                 value={state}
//                 onChangeText={setState}
//               />
//               <TextInput
//                 style={styles.inputHalf}
//                 placeholder="PIN CODE"
//                 value={pinCode}
//                 onChangeText={setPinCode}
//                 keyboardType="numeric"
//               />
//             </View>
//             <TextInput
//               style={styles.inputFull}
//               placeholder="Phone number"
//               value={phoneNumber}
//               onChangeText={setPhoneNumber}
//               keyboardType="phone-pad"
//             />
//           </View>
//         )}
//       </ScrollView>
//       <TouchableOpacity
//         style={styles.buttonBottom}
//         onPress={isEditing ? handleUpdateAddress : handleConfirmAddress}
//       >
//         <Text style={styles.buttonText}>{isEditing ? 'UPDATE ADDRESS' : 'CONFIRM ADDRESS'}</Text>
//       </TouchableOpacity>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },
//   backButton: {
//     marginRight: 10,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     flex: 1,
//     textAlign: 'center',
//   },
//   section: {
//     marginBottom: 20,
//     paddingHorizontal: 20,
//   },
//   addressHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   sectionTitle: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   currentAddress: {
//     fontSize: 12,
//     color: '#555',
//     lineHeight: 20,
//     marginTop: 10,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   inputHalf: {
//     flex: 0.48,
//     height: 40,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//     fontSize: 14,
//     color: '#000',
//     paddingHorizontal: 10,
//   },
//   inputFull: {
//     height: 40,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//     marginBottom: 10,
//     fontSize: 14,
//     color: '#000',
//     paddingHorizontal: 10,
//   },
//   buttonBottom: {
//     backgroundColor: '#000',
//     padding: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default AddressScreen;

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddressScreen = () => {
  const navigation = useNavigation();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [currentAddress, setCurrentAddress] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchCurrentAddress();
  }, []);

  const fetchCurrentAddress = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await fetch('http://18.144.80.232:8080/api/address/user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      const data = await response.json();

      if (data && data.data && data.data.length > 0) {
        setCurrentAddress(data.data[0]);
      } else {
        setCurrentAddress(null);
      }
    } catch (error) {
      console.error("Fetch Address Error:", error);
      Alert.alert("Error", "Failed to fetch address.");
      setCurrentAddress(null);
    }
  };

  const handleConfirmAddress = async () => {
    if (!firstName || !lastName || !address || !city || !state || !pinCode || !phoneNumber) {
      Alert.alert("Validation Error", "Please fill all fields.");
      return;
    }

    const addressData = {
      firstName,
      lastName,
      type: 'new',
      address,
      city,
      state,
      pinCode,
      country: 'INDIA',
      phoneNumber,
    };

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await fetch('http://18.144.80.232:8080/api/address/createAddress', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addressData)
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert("Success", "Address added successfully!", [
          { text: "OK", onPress: () => navigation.navigate('Cart') }
        ]);
        fetchCurrentAddress();
      } else {
        Alert.alert("Error", data.message || "Failed to add address.");
      }
    } catch (error) {
      console.error("Create Address Error:", error);
      Alert.alert("Error", "Something went wrong!");
    }
  };

  const handleEditAddress = () => {
    setIsEditing(true);
    setFirstName(currentAddress.firstName);
    setLastName(currentAddress.lastName);
    setAddress(currentAddress.address);
    setCity(currentAddress.city);
    setState(currentAddress.state);
    setPinCode(currentAddress.pinCode);
    setPhoneNumber(currentAddress.phoneNumber);
  };

  const handleUpdateAddress = async () => {
    if (!firstName || !lastName || !address || !city || !state || !pinCode || !phoneNumber) {
      Alert.alert("Validation Error", "Please fill all fields.");
      return;
    }

    const addressData = {
      firstName,
      lastName,
      type: 'new',
      address,  
      city,
      state,
      pinCode,
      country: 'INDIA',
      phoneNumber,
    };
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No token found');
    
      const response = await fetch(`http://18.144.80.232:8080/api/address/updateById/${currentAddress._id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addressData)
      });
    
      const data = await response.json();
      console.log("Data:", data);
    
      if (data.success) {
        Alert.alert("Success", "Address updated successfully!", [
          { text: "OK", onPress: () => navigation.navigate('Cart') }
        ]);
        setIsEditing(false);
        fetchCurrentAddress();
      } else {
        Alert.alert("Error", data.message || "Failed to update address.");
      }
    } catch (error) {
      console.error("Update Address Error:", error);
      Alert.alert("Error", error.message || "Something went wrong!");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>ADD ADDRESS</Text>
        </View>

        {currentAddress && !isEditing ? (
          <View style={styles.section}>
            <View style={styles.addressHeader}>
              <Text style={styles.sectionTitle}>CURRENT ADDRESS</Text>
              <TouchableOpacity onPress={handleEditAddress}>
                <Icon name="edit" size={20} color="black" />
              </TouchableOpacity>
            </View>
            <Text style={styles.currentAddress}>
              {currentAddress.address}, {'\n'}
              {currentAddress.city}, {currentAddress.state} {currentAddress.pinCode} {'\n'}
              {currentAddress.country} {'\n'}
              {currentAddress.phoneNumber}
            </Text>
          </View>
        ) : (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{isEditing ? 'EDIT ADDRESS' : 'NEW ADDRESS'}</Text>
            <View style={styles.row}>
              <TextInput
                style={styles.inputHalf}
                placeholder="First name"
                value={firstName}
                onChangeText={setFirstName}
              />
              <TextInput
                style={styles.inputHalf}
                placeholder="Last name"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
            <TextInput
              style={styles.inputFull}
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
            />
            <TextInput
              style={styles.inputFull}
              placeholder="City"
              value={city}
              onChangeText={setCity}
            />
            <View style={styles.row}>
              <TextInput
                style={styles.inputHalf}
                placeholder="State"
                value={state}
                onChangeText={setState}
              />
              <TextInput
                style={styles.inputHalf}
                placeholder="PIN CODE"
                value={pinCode}
                onChangeText={setPinCode}
                keyboardType="numeric"
              />
            </View>
            <TextInput
              style={styles.inputFull}
              placeholder="Phone number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>
        )}
      </ScrollView>
      <TouchableOpacity
        style={styles.buttonBottom}
        onPress={isEditing ? handleUpdateAddress : handleConfirmAddress}
      >
        <Text style={styles.buttonText}>{isEditing ? 'UPDATE ADDRESS' : 'CONFIRM ADDRESS'}</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  currentAddress: {
    fontSize: 12,
    color: '#555',
    lineHeight: 20,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  inputHalf: {
    flex: 0.48,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    fontSize: 14,
    color: '#000',
    paddingHorizontal: 10,
  },
  inputFull: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
    fontSize: 14,
    color: '#000',
    paddingHorizontal: 10,
  },
  buttonBottom: {
    backgroundColor: '#000',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddressScreen;
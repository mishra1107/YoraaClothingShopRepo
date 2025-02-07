import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ProfileScreen = () => {
  const navigation = useNavigation();


  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("hello");

        const token = await AsyncStorage.getItem("token"); // ✅ Ensure token is fetched
        if (!token) {
          console.error("No token found!");
          return;
        }

        const apiUrl = "http://10.0.2.2:8080/api/userProfile/getProfile";
        console.log("Fetching user profile from:", apiUrl);

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json(); //  Properly parse JSON
        console.log("Response Data:", responseData);
        setData(responseData); //  Store actual response data

      } catch (error) {
        console.error("Error fetching profile:", error);
        setData([]); //  Ensure UI doesn't break
      }
    };

    fetchProfile();
  }, []); // Empty dependency array means it runs once on mount

  const handleLogout = async () => {
    try {
      // Clear token and user data from AsyncStorage
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');

      console.log(" User logged out. Token removed.");

      // Show logout confirmation
      Alert.alert(" Logged Out", "You have been logged out successfully.", [
        { text: "OK", onPress: () => navigation.replace('Welcome') } // Navigate to Welcome screen
      ]);

    } catch (error) {
      console.error(" Error logging out:", error);
      Alert.alert(" Error", "Something went wrong while logging out.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>PROFILE</Text>
      </View>

      <View style={styles.profileContainer}>
        <Image
          source={require('../assests/images/BackgroundY.png')}
          style={styles.backgroundImage}
        />
        <View style={styles.profileContent}>
          <Image
            source={
              data?.imageUrl 
                ? { uri: data.imageUrl } 
                : require("../assests/images/ProfileImage.png") 
            }
            style={styles.profileImage}
          />
          <View style={styles.profileTextContainer}>
            <Text style={styles.profileName}>{data?.user?.name}</Text>
            
          </View>
          <View></View>
          <View></View>
          <View></View>
          <View></View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('UpdateProfile')}
        style={styles.updateProfileButton}>
        <Text style={styles.updateProfileButtonText}>UPDATE PROFILE</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>LOG OUT</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.optionsContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Track')}
          style={styles.option}>
          <View style={styles.optionContent}>
            <Image
              source={require('../assests/images/Shipping.png')}
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>TRACK ORDERS</Text>
          </View>
          <Text style={styles.optionArrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('')}
          style={styles.option}>
          <View style={styles.optionContent}>
            <Image
              source={require('../assests/images/exchangeOrder.png')}
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>RETURN/EXCHANGE ORDER</Text>
          </View>
          <Text style={styles.optionArrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Contact')}
          style={styles.option}>
          <View style={styles.optionContent}>
            <Image
              source={require('../assests/images/contactus.png')}
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>CONTACT US</Text>
          </View>
          <Text style={styles.optionArrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <View style={styles.optionContent}>
            <Image
              source={require('../assests/images/invitefriend.png')}
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>INVITE A FRIEND</Text>
          </View>
          <Text style={styles.optionArrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <View style={styles.optionContent}>
            <Image
              source={require('../assests/images/refund.png')}
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>REFUND</Text>
          </View>
          <Text style={styles.optionArrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Terms')}
          style={styles.option}>
          <View style={styles.optionContent}>
            <Image
              source={require('../assests/images/Termscondition.png')}
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>TERMS & CONDITIONS</Text>
          </View>
          <Text style={styles.optionArrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Privacy')}
          style={styles.option}>
          <View style={styles.optionContent}>
            <Image
              source={require('../assests/images/privacypolicy.png')}
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>PRIVACY POLICY</Text>
          </View>
          <Text style={styles.optionArrow}>›</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  profileContainer: {
    marginVertical: 20,
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: 139,
    position: 'absolute',
    resizeMode: 'cover',
  },
  profileContent: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
    marginRight: 16,
  },
  profileTextContainer: {
    flexDirection: 'column',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileSubtitle: {
    fontSize: 14,
    color: '#fff',
  },
  updateProfileButton: {
    backgroundColor: '#000',
    paddingVertical: 14,
    marginHorizontal: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 20,
  },
  updateProfileButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  logoutButton: {
    paddingVertical: 14,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  logoutButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  optionsContainer: {
    paddingHorizontal: 16,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
    resizeMode: 'contain',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  optionArrow: {
    fontSize: 20,
    color: '#000',
  },
});


export default ProfileScreen;

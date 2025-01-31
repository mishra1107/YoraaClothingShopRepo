import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/FontAwesome"; 

const UpdateProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section with Back Icon & Profile Title */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.header}>PROFILE</Text>
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

      {/* Note Text */}
      <Text style={styles.note}>
        We need your details to unlock personalized gift cards and exclusive
        offers tailored just for you
      </Text>

      {/* Edit Profile Button */}
      <TouchableOpacity onPress={()=>navigation.navigate('EditProfile')} style={styles.button}>
        <Text style={styles.buttonText}>EDIT PROFILE</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", 
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 14,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 15,
  },
  note: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 15,
    borderRadius: 3,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default UpdateProfileScreen;

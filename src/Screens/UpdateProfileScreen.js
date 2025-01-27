import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const UpdateProfileScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>PROFILE</Text>

      <TextInput style={styles.input} placeholder="Rithik" />
      <TextInput style={styles.input} placeholder="Address" />
      <TextInput style={styles.input} placeholder="+91 1234-253-311" />
      <TextInput style={styles.input} placeholder="@gmail.com" />

      <Text style={styles.subHeader}>OTHER DETAILS</Text>

      <TextInput style={styles.input} placeholder="Date of Birth" />
      <TextInput style={styles.input} placeholder="Anniversary" />
      <TextInput style={styles.input} placeholder="Gender" />
      <TextInput style={styles.input} placeholder="Style Preference" />

      <Text style={styles.note}>
        We need your details to unlock personalized gift cards and exclusive
        offers tailored just for you
      </Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>EDIT PROFILE</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
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
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default UpdateProfileScreen;

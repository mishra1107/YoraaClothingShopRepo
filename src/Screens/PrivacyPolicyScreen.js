import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet, Linking, Alert } from 'react-native';

export default function PrivacyPolicyScreen({ navigation }) {
  const handleOpenURL = async () => {
    const url = 'https://www.yoraa.co/';
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Error", "Unable to open the URL.");
    }
  };

  return (
    <TouchableOpacity onPress={handleOpenURL} style={styles.option}>
      <View style={styles.optionContent}>
        <Image
          source={require('../assests/images/Termscondition.png')}
          style={styles.optionIcon}
        />
        <Text style={styles.optionText}>TERMS & CONDITIONS</Text>
      </View>
      <Text style={styles.optionArrow}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
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
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  optionArrow: {
    fontSize: 24,
    color: '#ccc',
  },
});

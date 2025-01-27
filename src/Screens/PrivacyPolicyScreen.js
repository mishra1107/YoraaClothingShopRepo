import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();

  const policyItems = [
    'What does this Privacy Policy tell you?',
    'Who is responsible for your Personal Data?',
    'How do you get in touch with the [Grievance Officer] of Yora in India?',
    'What Personal Data does Yora collect and use (Categories of Personal Data)?',
    'What does Yora do with your Personal Data (Purposes and Processing)?',
    'What does Yora do when we transfer your Personal Data outside of India?',
    'How do we secure your Personal Data?',
    'What are your rights and how can you exercise them?',
    'Questions, Complaints, and Support – who and how you can get in touch with them?',
    'Updates and Notification of Updates',
    'Yora Data Recipients',
  ];

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>PRIVACY POLICY</Text>
      </View>

      {/* Policy Content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {policyItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.policyItem}>
            <Text style={styles.policyText}>
              {index + 1}. {item}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Divider */}
        <View style={styles.divider} />

        {/* Policy Details */}
        <Text style={styles.policyDetailTitle}>
          1. What does this Privacy Notice tell you?
        </Text>
        <Text style={styles.policyDetailText}>
          This Privacy Notice tells you how we collect and process the
          information from which you can be identified directly or indirectly
          and including any Personal Sensitive Data (“Personal Data”) while
          you browse www.Yoraa.com as well as when you interact with our
          different platforms, portals, and applications using your Personal
          Data, including the Yoraa app.
        </Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    elevation: 1,
  },
  backButton: {
    paddingRight: 12,
  },
  backButtonIcon: {
    fontSize: 24,
    color: '#000',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  policyItem: {
    marginVertical: 8,
  },
  policyText: {
    fontSize: 14,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 16,
  },
  policyDetailTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  policyDetailText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});

export default PrivacyPolicyScreen;

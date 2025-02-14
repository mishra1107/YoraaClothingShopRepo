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
    'How do you get in touch with the Grievance Officer of Yora in India?',
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>PRIVACY POLICY</Text>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {policyItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.policyItem}>
            <Text style={styles.policyText}>{index + 1}. {item}</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.divider} />

        <Text style={styles.policyDetailTitle}>1. What does this Privacy Policy tell you?</Text>
        <Text style={styles.policyDetailText}>
          This Privacy Notice tells you how we collect and process information from which you can be identified directly or indirectly, including any Personal Sensitive Data (“Personal Data”) while you browse www.Yoraa.co.in as well as when you interact with our different platforms, portals, and applications using your Personal Data, including the Yoraa app.
        </Text>

        <Text style={styles.policyDetailTitle}>2. Who is responsible for your Personal Data?</Text>
        <Text style={styles.policyDetailText}>
          Yora entity responsible for protecting your Personal Data and complying with applicable national legislation governing the use of your Personal Data is:
          Yora Apparels Private Limited | Registered Office: WeWork DLF Forum, Cybercity, Phase III, Gurugram, Haryana 122002.
        </Text>

        <Text style={styles.policyDetailTitle}>3. How do you get in touch with the Grievance Officer of Yora in India?</Text>
        <Text style={styles.policyDetailText}>
          Please email at: support@Yoraa.co.in
          
          Registered Office: WeWork DLF Forum, Cybercity, Phase III, Gurugram, Haryana 122002
          
          Grievance Officer: Rithik Mahajan
          Designation: Digital Brand Commerce Director
          Address: WeWork DLF Forum, Cybercity, Phase III, Gurugram, Haryana 122002
          Email: support@Yoraa.co.in
        </Text>

        <Text style={styles.policyDetailTitle}>4. What Personal Data does Yora collect and use?</Text>
        <Text style={styles.policyDetailText}>
          Yora collects various categories of Personal Data, including:
          - Identity Information: Name, Date of Birth, email, unique consumer ID, social media identifiers, passwords.
          - Contact Information: Phone number, shipping and billing address, email, Messenger ID, social media handle.
          - Location Information: Residential location, login location (IP), GPS data.
          - Size Information: Clothing sizes, body measurements.
          - Purchase Information: Payment details, shopping history, delivery details, and transaction history.
          - Behavioral and Profile Information: Shopping history, wishlist, browsing behavior, preferences, and social media interactions.
          - Community Information: Participation in Yora events, team memberships, feedback, and leaderboards.
          - Social Media Information: Public social media data, likes, reactions, and interactions with Yora.
          - Device Information: Browser data, device type, operating system, and security tracking.
          - Activity Information: Fitness and workout data, sensor information.
          - Correspondence: Customer service interactions, complaints, and feedback.
          - Preference Information: Language, preferred shipping address, product reviews.
          - Membership Information: Membership ID, engagement history, points, and rewards.
        </Text>

        <Text style={styles.policyDetailTitle}>5. How does Yora use your Personal Data?</Text>
        <Text style={styles.policyDetailText}>
          Yora uses your data for:
          - Site and app operation
          - Security and authentication
          - Order processing and payment verification
          - Fraud detection
          - Delivery tracking
          - Customer service
          - Marketing and personalized recommendations
          - Event participation
          - Product research and legal compliance
        </Text>

        <Text style={styles.policyDetailTitle}>6. How does Yora secure your data?</Text>
        <Text style={styles.policyDetailText}>
          Yora implements technical and organizational security measures to prevent unauthorized access, loss, or misuse of your data.
        </Text>

        <Text style={styles.policyDetailTitle}>7. What are your rights?</Text>
        <Text style={styles.policyDetailText}>
          You have the right to:
          - Access and correct your data.
          - Withdraw consent for data usage.
          - Raise grievances regarding data processing.
        </Text>

        <Text style={styles.policyDetailTitle}>8. How can you contact Yora for support?</Text>
        <Text style={styles.policyDetailText}>
          You can reach out to the Grievance Officer, Rithik Mahajan, at support@Yoraa.co.in.
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

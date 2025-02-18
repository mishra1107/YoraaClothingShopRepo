import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const PrivacyPolicyScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Privacy Policy</Text>
            
            <Text style={styles.subHeader}>Table of Contents</Text>
            <Text style={styles.paragraph}>1. What does this Privacy Policy tell you?</Text>
            <Text style={styles.paragraph}>2. Who is responsible for your Personal Data?</Text>
            <Text style={styles.paragraph}>3. How do you get in touch with the [Grievance Officer] of Yora in India?</Text>
            <Text style={styles.paragraph}>4. What Personal Data does Yora collect and use (Categories of Personal Data)?</Text>
            <Text style={styles.paragraph}>5. What does Yora do with your Personal Data (Purposes and Processing)?</Text>
            <Text style={styles.paragraph}>6. What does Yora do when we transfer your Personal Data outside of India?</Text>
            <Text style={styles.paragraph}>7. How do we secure your Personal Data?</Text>
            <Text style={styles.paragraph}>8. What are your rights and how can you exercise them?</Text>
            <Text style={styles.paragraph}>9. Questions, Complaints, and Support – who and how you can get in touch with them?</Text>
            <Text style={styles.paragraph}>10. Updates and Notification of Updates</Text>
            
            <Text style={styles.subHeader}>1. What does this Privacy Policy tell you?</Text>
            <Text style={styles.paragraph}>This Privacy Notice tells you how we collect and process the information from which you can be identified directly or indirectly, including any Personal Sensitive Data ("Personal Data") while you browse www.Yoraa.co.in, interact with our platforms, portals, and applications.</Text>
            
            <Text style={styles.subHeader}>2. Who is responsible for your Personal Data?</Text>
            <Text style={styles.paragraph}>Yora Apparels Private Limited, Registered Office: WeWork DLF Forum, Cybercity, Phase III, Gurugram, Haryana 122002.</Text>
            
            <Text style={styles.subHeader}>3. How do you get in touch with the Grievance Officer of Yora in India?</Text>
            <Text style={styles.paragraph}>Email: support@Yoraa.co.in</Text>
            <Text style={styles.paragraph}>Grievance Officer: Rithik Mahajan, Digital Brand Commerce Director</Text>
            <Text style={styles.paragraph}>Address: WeWork DLF Forum, Cybercity, Phase III, Gurugram, Haryana 122002</Text>
            
            <Text style={styles.subHeader}>4. What Personal Data does Yora collect and use?</Text>
            <Text style={styles.paragraph}>We collect various types of Personal Data:</Text>
            <Text style={styles.bullet}>• Identity information – name, DOB, email, social media identifiers, device fingerprint.</Text>
            <Text style={styles.bullet}>• Contact information – phone number, shipping and billing address, email.</Text>
            <Text style={styles.bullet}>• Location information – residential location, IP address, GPS location.</Text>
            <Text style={styles.bullet}>• Size information – clothes size, height, weight, body shape.</Text>
            <Text style={styles.bullet}>• Purchase information – payment details, purchase history, transaction ID.</Text>
            <Text style={styles.bullet}>• Behavioural and Profile information – shopping history, browsing preferences.</Text>
            <Text style={styles.bullet}>• Community information – event participation, feedback, interests.</Text>
            <Text style={styles.bullet}>• Social Media information – public posts, Likes, interactions.</Text>
            <Text style={styles.bullet}>• Device information – IP address, browser type, operating system.</Text>
            <Text style={styles.bullet}>• Activity information – fitness data, workout logs, step goals.</Text>
            <Text style={styles.bullet}>• Correspondence – customer service conversations, complaints.</Text>
            <Text style={styles.bullet}>• Preference information – language preference, Wishlist.</Text>
            
            <Text style={styles.subHeader}>5. What does Yora do with your Personal Data?</Text>
            <Text style={styles.paragraph}>Your Personal Data is used for the following:</Text>
            <Text style={styles.bullet}>1. Site and app operation</Text>
            <Text style={styles.bullet}>2. Security and authentication</Text>
            <Text style={styles.bullet}>3. Sales processing</Text>
            <Text style={styles.bullet}>4. Fraud detection</Text>
            <Text style={styles.bullet}>5. Delivery tracking</Text>
            <Text style={styles.bullet}>6. Customer service</Text>
            <Text style={styles.bullet}>7. Marketing and promotions</Text>
            <Text style={styles.bullet}>8. Legal compliance</Text>
            
            <Text style={styles.subHeader}>6. What does Yora do when we transfer your Personal Data outside of India?</Text>
            <Text style={styles.paragraph}>We ensure compliance with legal requirements for secure data transfers.</Text>
            
            <Text style={styles.subHeader}>7. How do we secure your Personal Data?</Text>
            <Text style={styles.paragraph}>We implement strong security measures to prevent unauthorized access.</Text>
            
            <Text style={styles.subHeader}>8. What are your rights and how can you exercise them?</Text>
            <Text style={styles.paragraph}>You have the right to review, correct, and withdraw consent for your data.</Text>
            
            <Text style={styles.subHeader}>9. Questions, Complaints, and Support</Text>
            <Text style={styles.paragraph}>For queries or complaints, contact the Grievance Officer at support@Yoraa.co.in.</Text>
            
            <Text style={styles.subHeader}>10. Updates and Notification of Updates</Text>
            <Text style={styles.paragraph}>We periodically review and update this policy, with notifications provided.</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    subHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
    },
    paragraph: {
        fontSize: 14,
        marginTop: 5,
        lineHeight: 20,
    },
    bullet: {
        fontSize: 14,
        marginLeft: 10,
        marginTop: 5,
        lineHeight: 20,
    }
});

export default PrivacyPolicyScreen;

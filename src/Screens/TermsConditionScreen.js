import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const TermsConditionScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>YORAA Terms & Conditions</Text>
            
            <Text style={styles.subHeader}>1. Introduction</Text>
            <Text style={styles.paragraph}>
                If you place an order through www.Yoraa.co.in, the Yoraa app (the “App”), or any other website or app in which we present these Terms and Conditions (together referred to as the “Platform”), upon confirmation that such order is accepted, a contract of sale will be executed between you and Yora India, having CIN NO: U47711HR2024PTC125950, with its registered office at Regd. Office: FORUM DLF CYBER CITY, PHASE 3, SECTOR 24, DLF QE, Gurgaon- 122002, Haryana.
            </Text>
            
            <Text style={styles.subHeader}>2. Purchase Terms</Text>
            <Text style={styles.paragraph}>
                Please read these Purchase Terms carefully before ordering Products online from the Platform. These Purchase Terms apply to all offers and contracts relating to the sale and delivery of Products by us.
            </Text>
            
            <Text style={styles.boldText}>2.1 When do these Purchase Terms apply?</Text>
            <Text style={styles.paragraph}>
                These Terms apply when you (i) order anything from the Platform, (ii) order anything at any web page directly connected to the Platform, or (iii) accept an offer from us.
            </Text>
            
            <Text style={styles.boldText}>2.2 Products</Text>
            <Text style={styles.paragraph}>
                We have different types of products including "Standard Products" (designed and created by us) and "Personalised Products" (customized by users). Limited edition products may have additional restrictions.
            </Text>
            
            <Text style={styles.boldText}>2.3 Requirements to conclude a contract with Yora</Text>
            <Text style={styles.paragraph}>
                - You must be 18 years of age or older.
                - You can only order as a consumer, not a reseller.
                - You guarantee that the information provided is accurate.
            </Text>
            
            <Text style={styles.boldText}>2.4 How is a contract concluded?</Text>
            <Text style={styles.paragraph}>
                A contract is only concluded when you receive confirmation of shipment, carrier confirmation, or store pickup confirmation.
            </Text>
            
            <Text style={styles.subHeader}>3. Use of the Platform</Text>
            <Text style={styles.paragraph}>
                These Terms govern your access and use of the Platform. If you do not agree, do not use the Platform. The Privacy Policy describes how we collect and use your information.
            </Text>
            
            <Text style={styles.boldText}>3.1 Copyright and Ownership</Text>
            <Text style={styles.paragraph}>
                All content on the Platform is protected by intellectual property laws and remains the property of Yoraa or its licensors. Unauthorized reproduction is prohibited.
            </Text>
            
            <Text style={styles.boldText}>3.2 Trademarks</Text>
            <Text style={styles.paragraph}>
                Yoraa trademarks cannot be used without prior written consent.
            </Text>
            
            <Text style={styles.boldText}>3.3 Software</Text>
            <Text style={styles.paragraph}>
                You may not copy, modify, distribute, or reverse-engineer any software provided as part of the Platform.
            </Text>
            
            <Text style={styles.boldText}>3.4 User-Provided Content</Text>
            <Text style={styles.paragraph}>
                Users are responsible for content they upload. Yoraa has the right to use, modify, or delete user content that violates these Terms.
            </Text>
            
            <Text style={styles.subHeader}>4. Miscellaneous</Text>
            <Text style={styles.boldText}>4.1 Contact Information</Text>
            <Text style={styles.paragraph}>
                Customer Service Yora India,
                Registered Office: FORUM DLF CYBER CITY, PHASE 3, SECTOR 24, Gurgaon- 122002, Haryana.
                Email: support@Yoraa.co.in
            </Text>
            
            <Text style={styles.boldText}>4.2 Governing Law</Text>
            <Text style={styles.paragraph}>
                These Terms shall be governed by the laws of India. Any disputes will be handled in the courts of Delhi, India.
            </Text>
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
    boldText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 10,
    }
});

export default TermsConditionScreen;

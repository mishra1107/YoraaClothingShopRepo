import React, { useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity ,StyleSheet} from 'react-native';

const PrivacyPolicyScreen = () => {
    const scrollViewRef = useRef(null);
    
    const scrollToSection = (ref) => {
        ref?.current?.measureLayout(
            scrollViewRef.current,
            (x, y) => {
                scrollViewRef.current.scrollTo({ y, animated: true });
            }
        );
    };

    const q1Ref = useRef(null);
    const q2Ref = useRef(null);
    const q3Ref = useRef(null);
    const q4Ref = useRef(null);
    const q5Ref = useRef(null);
    const q6Ref = useRef(null);
    const q7Ref = useRef(null);
    const q8Ref = useRef(null);
    const q9Ref = useRef(null);
    const q10Ref = useRef(null);
    const q11Ref = useRef(null);
    return (
        <ScrollView ref={scrollViewRef} style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Privacy Policy</Text>
            
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>What is the Privacy Policy?</Text>
            
            <TouchableOpacity onPress={() => scrollToSection(q1Ref)}>
                <Text style={{ color: 'blue', marginBottom: 5 }}>1. What does this Privacy Policy tell you?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => scrollToSection(q2Ref)}>
                <Text style={{ color: 'blue', marginBottom: 5 }}>2. Who is responsible for your Personal Data?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => scrollToSection(q3Ref)}>
                <Text style={{ color: 'blue', marginBottom: 5 }}>3. How do you get in touch with the Grievance Officer of Yora in India?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => scrollToSection(q4Ref)}>
                <Text style={{ color: 'blue', marginBottom: 5 }}> 4. What Personal Data does Yora collect and use (Categories of Personal Data)?   </Text>       
            </TouchableOpacity>

            <TouchableOpacity onPress={() => scrollToSection(q5Ref)}>
                <Text style={{ color: 'blue', marginBottom: 5 }}> 5. What Personal Data does Yora collect and use (Categories of Personal Data)?   </Text>       
            </TouchableOpacity>

            <TouchableOpacity onPress={() => scrollToSection(q6Ref)}>
                <Text style={{ color: 'blue', marginBottom: 5 }}>6. What does Yora do when we transfer your Personal Data outside of India?</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => scrollToSection(q7Ref)}>
                <Text style={{ color: 'blue', marginBottom: 5 }}>7. How do we secure your Personal Data?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => scrollToSection(q8Ref)}>
                <Text style={{ color: 'blue', marginBottom: 5 }}> 8. What are your rights and how can you exercise them?</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => scrollToSection(q9Ref)}>
                <Text style={{ color: 'blue', marginBottom: 5 }}> 9. Questions, Complaints, and Support – who and how you can get in touch with them?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => scrollToSection(q10Ref)}>
                <Text style={{ color: 'blue', marginBottom: 5 }}> 10. Updates and Notification of Updates</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => scrollToSection(q11Ref)}>
                <Text style={{ color: 'blue', marginBottom: 5 }}>11. Yora Data Recipients</Text>
            </TouchableOpacity>


            <View ref={q1Ref} style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>1. What does this Privacy Policy tell you?</Text>
                <Text>This Privacy Notice tells you how we collect and process the information from which you can be identified directly or indirectly...</Text>
            </View>

            <View ref={q2Ref} style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>2. Who is responsible for your Personal Data?</Text>
                <Text>Yora entity responsible for protecting your Personal Data and complying with applicable national legislation governing the use of your Personal Data...</Text>
            </View>

            <View ref={q3Ref} style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>3. How do you get in touch with the Grievance Officer of Yora in India?</Text>
                <Text>Please email at: <Text style={{ color: 'blue' }}>support@Yoraa.co.in</Text></Text>
                <Text>Registered Office: WeWork DLF Forum, Cybercity, Phase III, Gurugram, Haryana 122002 Grievance Officer:
Name: Rithik Mahajan
Designation: Digital Brand Commerce Director
Address: WeWork DLF Forum, Cybercity, Phase III, Gurugram, Haryana 122002
Email: support@Yoraa.co.in
</Text>

<Text style={styles.question}>4. What Personal Data does Yora collect and use (Categories of Personal Data)?</Text>
                <Text style={styles.answer}>• Identity information – includes: name, date of birth, email address, unique identifier, etc.</Text>
                <Text style={styles.answer}>• Contact information – includes: phone number, email, address, etc.</Text>
                <Text style={styles.answer}>• Location information – includes: GPS location, login location, etc.</Text>
                <Text style={styles.answer}>• Size information – includes: height, weight, clothing size, etc.</Text>
                <Text style={styles.answer}>• Purchase information - includes: your payment information (credit card number), Bank Account details, payment risk profile (provided to us by our payment risk solution), shopping cart (your ordered items), delivery details, shipping and billing address, customer order number, purchase history with Yora, transaction ID, and any other information related to your purchase. We use it to complete your order or return or refund on Yora sites and apps, in Yora stores, or other selling platforms.</Text>
                <Text style={styles.answer}> • Behavioural and Profile information- includes: your shopping history, Wishlist items, your browsing behaviour, your browsing preferences, your shopping preferences, in-store interactions, your workout history, product reviews, social media interactions with us, and any other intelligence we have about you to help us learn you as a consumer better, including “Community information”. We use it to know you better as a consumer, so we can send you marketing messages containing only products and services that we think you might be interested in. </Text>
                <Text style={styles.answer}> • Behavioural and Profile information- includes: your shopping history, Wishlist items, your browsing behaviour, your browsing preferences, your shopping preferences, in-store interactions, your workout history, product reviews, social media interactions with us, and any other intelligence we have about you to help us learn you as a consumer better, including “Community information”. We use it to know you better as a consumer, so we can send you marketing messages containing only products and services that we think you might be interested in. </Text>
                <Text style={styles.answer}> • Community information – includes: information provided by you when you participate various Yora events and communities either as a trainer, team member, a participant or as a promotor of our events, including for example: pictures, videos, your nickname, your team, your interests and preferences, your feedback, leader boards, event participation, joined groups, and registration details. We use this information to organise the events and communities, and to know more about you as a consumer.</Text>
 
                <Text style={styles.answer}> • Social Media information – includes: information obtained through your interaction with us on various social media channels such as Facebook, Instagram, Google, etc., including: any social media information that is publicly available such as your social media handles, social media interactions and public postings, your “Likes” and other reactions, your social media connections, your photos that are public, or those you send to us by mentioning us or following our social media posts by using “handles” or “hashtags”. We obtain this information from the social media network (e.g., Facebook, Snapchat, Instagram, etc.) directly or indirectly through third-party agencies we have agreements with.</Text>
  
                <Text style={styles.answer}>• Device information – includes: Information about your device or browser that give us an idea about your browsing behaviour or device usage. Your device information is collected by our app, and your browser information is collected by our cookies, tags, and pixels. This is often required for network security purposes. This includes, but not limited to: IP address, date and time of the visit, how long you remained on our website, the referral URL (if you came to our site via a different site or an advertisement), the pages visited on our site, your browser type, device type, versions, operating system.</Text>
  
                <Text style={styles.answer}>• Activity information - includes: fitness data (for example workout start and end times, activity type, sports category), sensor data (for example step goal, duration, pace, distance, calories, heartbeat, RunScore and speed), and other data related to your fitness app. We use it to help you improve your performance goals and improve your user experiences and identify what products might be best for you based on your exercise patterns.</Text>
  
                <Text style={styles.answer}>• Correspondence – includes: conversation we have when you contact customer service, the emails you write us about our products or services, the complaints you address to us via post, e-mail, fax, or call, notes we prepared on your feedback, call back from our Customer Service to you, and any other communication between you and Yora personnel. We record all Customer Service calls for quality assurance purposes.</Text>
  
                <Text style={styles.answer}>• Preference information - includes: preferred language, log-in location, Wishlist items, preferred shipping address, browsing preferences, our correspondence with you, your Yora product reviews. We use it to give you convenience when you visit and/or shop on our sites and apps.</Text>
  
                <Text style={styles.answer}>• information – includes: Unique Member Identifier (member ID), date you became a member, store ID (if you signed up in a retail store), source ID, country and brand of your original membership, membership points, engagement history, rewards history, membership vouchers associated to members. All the information the listed here will be kept for as long as you are a  member.</Text>
 
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}> 5. What does Yora do with your Personal Data (Purposes and Processing)?</Text>
           
                <Text style={styles.answer}> Your Personal Data is used for the following purposes:
1. Site (www.Yoraa.co.in) operation and app operation
2. Domain and network security and user authentication
3. Global credential to all Yora platforms – user experience
4. Sales of Yora products - online and off-line order
5. Payment fraud detection
6. Product delivery, return and refund.
7. Electronic delivery tracking
8. Business operational analytics
9. Customer service
10. Personalised marketing messages via email (newsletter sign-up) and SMS
11. Personalised marketing messages via email (via existing contract) and SMS
12. Targeted messages on 3rd-party advertising platforms
13. membership administration – where applicable
14. Private event registration
15. Open event registration
16. Product research and development
17. Legal obligation - cooperation with law enforcement and regulatory authorities (including courts)
18. Collecting your device information on our website using cookies, pixels, tags, and similar technologies (“Cookies Policy”)
19. User-generated content (UGC) acquisition from social media
20. Push notifications (in-app communication)
 
Your Personal Data will not be retained for a period longer than is required for the purposes for which the information is collected or used under law except for the data that is required to be kept longer for legal reasons specified by law, data associated with account which shall be retained up to four (4) years from your last interaction with us, unless, a longer or shorter retention period is required by law and is necessary in the course of legal proceedings or is otherwise needed for a particular purpose under applicable law. If you don't have an  account, but have purchased items online as a guest, we retain information related to your purchase for the same period of time as described for members.

</Text>

            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({

    question: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#222',
    },
    answer: {
        fontSize: 16,
        color: '#555',
    },
    });
export default PrivacyPolicyScreen;

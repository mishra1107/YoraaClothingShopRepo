import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const HeaderContent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>YORAA</Text>
      <Text style={styles.subtitle}>
        Making a luxurious lifestyle accessible for a generous group of women is our daily drive.
      </Text>

      <View style={styles.feature}>
        <Image
          source={require('../assests/images/virtualappoinment.png')}
          style={styles.icon}
        />
        <Text style={styles.title}>VIRTUAL APPOINTMENT</Text>
        <Text style={styles.description}>
          Book your personal styling session with our head stylist. Set up a
          one-on-one appointment for fashion advice.
        </Text>
      </View>

      <View style={styles.feature}>
        <Image
          source={require('../assests/images/globalshipping.png')}
          style={styles.icon}
        />
        <Text style={styles.title}>Global Shipping</Text>
        <Text style={styles.description}>
          We offer fast and reliable free shipping options both within India,
          ensuring your order reaches you in a timely manner.
        </Text>
      </View>

      <View style={styles.feature}>
        <Image
          source={require('../assests/images/riskfree.png')}
          style={styles.icon}
        />
        <Text style={styles.title}>RISK-FREE PURCHASE</Text>
        <Text style={styles.description}>
          We offer 4 days to exchange or return your product, ensuring a seamless shopping experience for our valued customers.
        </Text>
      </View>

      <View style={styles.feature}>
        <Image
          source={require('../assests/images/onlineassistence.png')}
          style={styles.icon}
        />
        <Text style={styles.title}>ONLINE ASSISTANCE</Text>
        <Text style={styles.description}>
          Our friendly and knowledgeable customer support team is available to assist you with any queries.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
    lineHeight: 20,
  },
  feature: {
    alignItems: "center",
    marginBottom: 40,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
    resizeMode: "contain",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    color: "#333",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    lineHeight: 20,
  },
});

export default HeaderContent;

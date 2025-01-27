import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const HeaderContent = () => {
  return (
    <View style={styles.container}>
    

    <View style={styles.feature}>
        <Image
          source={{
            uri: "https://example.com/virtual-appointment-icon.png", 
          }}
          style={styles.icon}
        />
        <Text style={styles.title}>YORAA</Text>
        <Text style={styles.description}>
          Book your personal styling session with our head stylist. Set up a
          one-on-one appointment for fashion advice.
        </Text>
      </View>

      <View style={styles.feature}>
        <Image
          source={{
            uri: "https://example.com/virtual-appointment-icon.png", 
          }}
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
          source={{
            uri: "https://example.com/global-shipping-icon.png",
          }}
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
          source={{
            uri: "https://example.com/global-shipping-icon.png",
          }}
          style={styles.icon}
        />
        <Text style={styles.title}>RISK-FREE-PURCHASE</Text>
        <Text style={styles.description}>
          We offer 4 days to exchange or return your product
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
    justifyContent: "center",
    alignItems: "center",
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

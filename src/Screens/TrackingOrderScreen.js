import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const TrackingOrderScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>TRACK ORDER</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Product Info */}
        <View style={styles.productCard}>
        <Image
  source={require('../assests/images/Shopping.png')} 
  style={styles.productImage}
/>

          <View style={styles.productDetails}>
            <Text style={styles.productName}>LAMEREI</Text>
            <Text style={styles.productDescription}>RECYCLE BOUCLE KNIT CARDIGAN PINK</Text>
            <Text style={styles.trackingId}>Tracking ID : <Text style={styles.boldText}>#AS123ZA</Text></Text>
            <Text style={styles.deliveryDate}>Delivery by 12/02/2024</Text>
          </View>
        </View>

        {/* Delivery Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DELIVER TO</Text>
          <Text style={styles.address}>606-3727 Ullamcorper. Street Roseville NH 11523</Text>
          <Text style={styles.phone}>(786) 713-8616</Text>
        </View>

        {/* Order Status */}
        <View style={styles.section}>
          {Array(4).fill(0).map((_, index) => (
            <View key={index} style={styles.statusRow}>
              <View style={styles.statusIconContainer}>
                <View style={styles.statusIcon} />
                {index < 3 && <View style={styles.dottedLine} />}
              </View>
              <View>
                <Text style={styles.statusText}>Order Placed</Text>
                <Text style={styles.statusDate}>on 12/02/2024</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Cancel Order Button */}
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>CANCEL ORDER</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Track Order Button */}
      <TouchableOpacity style={styles.trackOrderButton}>
        <Icon name="local-shipping" size={20} color="#fff" />
        <Text style={styles.trackOrderButtonText}>TRACK ORDER</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
  },
  content: {
    padding: 16,
  },
  productCard: {
    flexDirection: "row",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 16,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  productDetails: {
    marginLeft: 16,
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productDescription: {
    fontSize: 14,
    color: "#555",
    marginVertical: 4,
  },
  trackingId: {
    fontSize: 14,
    color: "#333",
  },
  boldText: {
    fontWeight: "bold",
  },
  deliveryDate: {
    fontSize: 14,
    color: "#888",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  address: {
    fontSize: 14,
    color: "#555",
  },
  phone: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  statusIconContainer: {
    alignItems: "center",
    marginRight: 16,
  },
  statusIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#000",
  },
  dottedLine: {
    width: 2,
    height: 40,
    backgroundColor: "#ccc",
    marginTop: 4,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  statusDate: {
    fontSize: 12,
    color: "#555",
  },
  cancelButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    padding: 16,
    alignItems: "center",
    marginVertical: 16,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  trackOrderButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    padding: 16,
  },
  trackOrderButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 8,
  },
});

export default TrackingOrderScreen;

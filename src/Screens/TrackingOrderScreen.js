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
            source={{ uri: "data:image/jpeg;base64,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" }}
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

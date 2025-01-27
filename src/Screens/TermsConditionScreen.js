import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TermsConditionScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>TERMS & CONDITIONS</Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>YORAA Terms & Conditions</Text>
        <Text style={styles.paragraph}>
          These Terms and Conditions consist of the following sections: 1.
          Introduction; 2. The Purchase Terms; 3. Use of the Platform and 4.
          Miscellaneous, as well as policies, set of terms or documents to
          which a link has been provided herein (collectively “Terms &
          Conditions”).
        </Text>

        <Text style={styles.sectionHeader}>1. INTRODUCTION</Text>
        <Text style={styles.paragraph}>
          If you place an order through www.Yoraa.co.in, the Yoraa app (the
          “App”) or any other website or app in which we present these Terms
          and Conditions (together referred to as the “Platform”), upon
          confirmation that such order is accepted a contract of sale will be
          executed between you and Yoraa India having CIN NO:
          U47711HR2024PTC125950, with its registered office at Regd. Office:
          FORUM DLF CYBER CITY, PHASE 3, SECTOR 24, DLF QE, Dlf Qe, Gurgaon-
          122002, Haryana Tel. (+91) 8717000084, Website: www.Yoraa.co.in,
          which will be governed by these Terms and Conditions and specifically
          by the Purchase Terms mentioned below. Yoraa is the parent company of
          the Yoraa group, which includes several affiliated companies; among
          them AIMPL (hereinafter referred to as "Yoraa/we/us").
        </Text>

        <Text style={styles.sectionHeader}>2. PURCHASE TERMS</Text>
        <Text style={styles.paragraph}>
          Please read these Purchase Terms carefully before ordering Products
          online from the Platform.
        </Text>
        <Text style={styles.paragraph}>
          2.1 When do these Purchase Terms apply? These Purchase Terms apply to
          all offers and contracts relating to the sale and delivery of
          Products by us. In other words, you agree to these Purchase Terms
          when you (i) order anything from the Platform, (ii) order anything at
          any web page directly connected to the Platform or (iii) when you
          accept an offer from the Platform. It is only possible to deviate
          from these Purchase Terms if agreed in writing by us.
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
});

export default TermsConditionScreen;

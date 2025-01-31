import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const orders = [
  {
    id: '1',
    image: require('../assests/images/Shopping.png'),
    title: 'LAMEREI',
    description: 'RECYCLE BOUCLE KNIT CARDIGAN PINK',
    trackingId: '#AS123ZA',
    deliveryDate: 'Delivery by 12/02/2024',
  },
  {
    id: '2',
    image: require('../assests/images/Shopping.png'),
    title: 'LAMEREI',
    description: 'RECYCLE BOUCLE KNIT CARDIGAN PINK',
    trackingId: '#AS123ZA',
    deliveryDate: 'Delivery by 12/02/2024',
  },
];

const TrackScreen = () => {
  const navigation = useNavigation();

  const renderOrder = ({ item }) => (
    <View style={styles.orderContainer}>
      <View style={styles.orderDetails}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.trackingId}>Tracking ID: <Text style={styles.trackingIdBold}>{item.trackingId}</Text></Text>
          <Text style={styles.deliveryDate}>{item.deliveryDate}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Tracking')} style={styles.trackButton}>
      <Image source={require('../assests/images/Shippingtrack.png')} style={styles.trackIcon} />

        <Text style={styles.trackButtonText}>TRACK ORDER</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>TRACK ORDER</Text>
      </View>
      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
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
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
  backButton: {
    marginRight: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginRight: 32,
  },
  list: {
    paddingVertical: 16,
  },
  orderContainer: {
    backgroundColor: '#fff',
    marginBottom: 12,
    paddingBottom: 10,
  },
  orderDetails: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
    paddingLeft: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  trackingId: {
    fontSize: 12,
    color: '#333',
  },
  trackingIdBold: {
    fontWeight: 'bold',
  },
  deliveryDate: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    height: 48,
    marginHorizontal: 16,
    marginTop: 6,
  },
  trackIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginRight: 8,
  },
  trackButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default TrackScreen;

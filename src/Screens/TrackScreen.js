import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const orders = [
  {
    id: '1',
    image: 'data:image/jpeg;base64,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',
    title: 'LAMEREI',
    description: 'RECYCLE BOUCLE KNIT CARDIGAN PINK',
    trackingId: '#AS123ZA',
    deliveryDate: 'Delivery by 12/02/2024',
  },
  {
    id: '2',
    image: 'data:image/jpeg;base64,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',
    title: 'LAMEREI',
    description: 'RECYCLE BOUCLE KNIT CARDIGAN PINK',
    trackingId: '#AS123ZA',
    deliveryDate: 'Delivery by 12/02/2024',
  },
];

const TrackScreen = () => {
  const navigation = useNavigation();

  const renderOrder = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.trackingId}>Tracking ID: {item.trackingId}</Text>
        <Text style={styles.deliveryDate}>{item.deliveryDate}</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Tracking')} style={styles.trackButton}>
          <Image
            source={require('../assests/images/Shippingtrack.png')} // Replace this path with your actual local image path
            style={styles.trackImage}
          />
          <Text style={styles.trackButtonText}>TRACK ORDER</Text>
        </TouchableOpacity>
      </View>
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
    trackImage: {
        width: 18,
        height: 18,
        resizeMode: 'contain',
        marginRight: 8, // Space between the image and text
      },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backButton: {
    marginRight: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginRight: 32, // Adjust for proper centering
  },
  list: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    padding: 8, // Added padding for consistency
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  details: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  trackingId: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  deliveryDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    height: 48, // Fixed height for consistency
    width: '100%', // Ensures full width
    borderRadius: 4,
    alignSelf: 'stretch', // Ensures it stretches within the parent container
  },
  trackIcon: {
    marginRight: 8,
  },
  trackButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default TrackScreen;

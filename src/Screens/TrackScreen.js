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
    <View style={styles.card}>
      <Image source={ item.image } style={styles.image} />
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
        marginRight: 8, 
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
    marginRight: 32, 
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
    padding: 8, 
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
    height: 48, 
    width: '100%', 
    borderRadius: 4,
    alignSelf: 'stretch', 
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

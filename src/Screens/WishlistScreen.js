import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const products = [
  { id: '1', image: require('../assests/images/Shopping.png'), name: '21WN REVERSIBLE ANGORA CARDIGAN', price: '₹120' },
  { id: '2', image: require('../assests/images/Shopping.png'), name: '21WN REVERSIBLE ANGORA CARDIGAN', price: '₹120' },
  { id: '3', image: require('../assests/images/Shopping.png'), name: '21WN REVERSIBLE ANGORA CARDIGAN', price: '₹120' },
  { id: '4', image: require('../assests/images/Shopping.png'), name: '21WN REVERSIBLE ANGORA CARDIGAN', price: '₹120' },
  { id: '5', image: require('../assests/images/Shopping.png'), name: '21WN REVERSIBLE ANGORA CARDIGAN', price: '₹120' },
  { id: '6', image: require('../assests/images/Shopping.png'), name: '21WN REVERSIBLE ANGORA CARDIGAN', price: '₹120' },
  { id: '7', image: require('../assests/images/Shopping.png'), name: '21WN REVERSIBLE ANGORA CARDIGAN', price: '₹120' },
  { id: '8', image: require('../assests/images/Shopping.png'), name: '21WN REVERSIBLE ANGORA CARDIGAN', price: '₹120' },
];

const WishlistScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={require('../assests/images/like.png')} style={styles.iconImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}  style={styles.iconButton}>
            <Image source={require('../assests/images/cart.png')} style={styles.iconImage} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.name} numberOfLines={2}>
        {item.name}
      </Text>
      <Text style={styles.price}>{item.price}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>WISH LIST</Text>
      </View>

      {/* Product List */}
      <FlatList
        key={'2-columns'}
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.scrollContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'right',
    marginRight: 10,
  },
  scrollContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  cardContainer: {
    alignItems: 'flex-start',
    margin: 10,
    flex: 1, 
    maxWidth: '45%', 
  },
  card: {
    width: '100%',
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  iconsContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  iconButton: {
    marginBottom: 10,
  },
  iconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  name: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
    lineHeight: 16,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF5722',
    marginTop: 4,
    textAlign: 'left',
  },
});

export default WishlistScreen;

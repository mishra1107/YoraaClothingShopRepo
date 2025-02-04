import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { getWishlist } from '../services/wishlistService'; // ✅ Import getWishlist function

const WishlistScreen = () => {
  const navigation = useNavigation();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    setLoading(true);
    const wishlistData = await getWishlist();
    setWishlistItems(wishlistData);
    setLoading(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Image source={{ uri: item.item.imageUrl }} style={styles.image} />
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="favorite" size={20} color="red" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.iconButton}>
            <Icon name="shopping-cart" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.name} numberOfLines={2}>{item.item.name}</Text>
      <Text style={styles.price}>₹{item.item.price}</Text>
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

      {/* Show Loader while fetching data */}
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#FF5722" />
        </View>
      ) : (
        <FlatList
          key={'2-columns'}
          data={wishlistItems}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          numColumns={2}
          contentContainerStyle={styles.scrollContainer}
        />
      )}
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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: 'white',
    padding: 6,
    borderRadius: 20,
    marginVertical: 5,
    elevation: 5,
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

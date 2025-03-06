import React, { useEffect, useState,useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { getWishlist, removeFromWishlist } from '../services/wishlistService';
import { WishlistContext } from '../services/context/WishlistContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { useCart } from '../services/cart/CartContext';

const WishlistScreen = () => {
  const navigation = useNavigation();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
    
   const { toggleCart, fetchCart } = useCart();
    useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    setLoading(true);
    const wishlistData = await getWishlist();
    setWishlistItems(wishlistData);
    setLoading(false);
  };

  const handleToggleWishlist = async (productId) => {
    try {
      toggleWishlist(productId)
      setWishlistItems(prevItems => prevItems.filter(item => item.item._id !== productId)); // Update UI
    } catch (error) {
      console.error(" Remove from Wishlist Error:", error);
    }
  };
  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Image source={{ uri: item.item.imageUrl }} style={styles.image} />
        <View style={styles.iconsContainer}>
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => handleToggleWishlist(item.item._id)}>
            <Icon1 name="favorite" size={20} color="red" />
          </TouchableOpacity>
        
          <TouchableOpacity 
    style={styles.iconButton} 
    onPress={async () => {
        await toggleCart(item.item._id); 
        await fetchCart();  
        navigation.navigate('Cart'); }}>
    <Icon name="cart-outline" size={18} color="black" />
</TouchableOpacity>
        </View>
      </View>
      <Text style={styles.name} numberOfLines={2}>{item.item.name}</Text>
      <Text style={styles.description}>{item.item.description}</Text>
      <Text style={styles.price}>₹{item.item.price}</Text>

    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
          <View style={styles.header}>
         <TouchableOpacity
                      style={styles.backIcon}
                      onPress={() => navigation.goBack()}>
                      <Image 
                        source={require('../assests/images/BackArrow.png')}  //  Use local asset
                        style={styles.backIconImage}  //  Apply styles for proper size
                      />
                    </TouchableOpacity>
         <Text style={styles.headerTitle}>WISHLIST</Text>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Ensures proper spacing
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingHorizontal: 10, // Ensures padding on both sides
  },
  backIcon: {
    width: 40, // Ensures it takes proper space
    alignItems: "flex-start", // Keeps it aligned left
  },
  backIconImage: {
    width: 24,
    height: 24,
    tintColor: 'black',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    flex: 1, // Ensures text remains centered
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
    overflow: 'hidden',
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
    color: '#333',
    textAlign: 'left',
    lineHeight: 16,
  },
  description: {
    marginTop: 1,
    fontSize: 12,
    color: 'gray',
    textAlign: 'left',
    lineHeight: 16,
  },
  price: {
    fontSize: 14,
    color: 'gray',
    marginTop: 6,
    textAlign: 'left',
  },
});

export default WishlistScreen;

import { useNavigation } from '@react-navigation/native'; 
import React, { useEffect, useState,useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCart } from '../services/cart/CartContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { WishlistContext } from '../services/context/WishlistContext';

const CardLayout = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toggleCart, fetchCart } = useCart();
  const { wishlist, toggleWishlist } = useContext(WishlistContext);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = await AsyncStorage.getItem('token'); 
        const response = await fetch('http://10.0.2.2:8080/api/items?page=1&limit=20', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Fetched Data:', data);

        const items = (data.items || []).map(item => ({
          id: item.id || item._id,
          name: item.name || 'Unnamed',
          price: item.price || '0',
          image: item.imageUrl || '',
        }));

        setProducts(items);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Image 
          source={item.image ? { uri: item.image } : require('../assests/images/Shopping.png')} 
          style={styles.image} 
        />
        <View style={styles.iconsContainer}>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Product', { id: item.id })} 
            style={styles.iconButton1}
          >
            <Icon  name="eye"  size={18} color="black"/>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.iconButton1} 
            onPress={async () => {
              console.log("Item ID being added to cart:", item.id);
              await toggleCart(item.id);
              navigation.navigate('Cart');
            }}
          >
            <Icon name="cart-outline" size={18} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => toggleWishlist(item.id)} style={styles.iconButton1}>
  <Icon name={wishlist[item.id] ? "heart" : "heart-outline"} size={18} color={wishlist[item.id] ? "red" : "black"} />
</TouchableOpacity>


        </View>
      </View>
      <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.price}>₹{item.price}</Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#FF5722" style={{ marginTop: 50 }} />;
  }

  return (
    <FlatList
      horizontal
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()} 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    />
  );
};

const styles = StyleSheet.create({
  iconButton1: {
    backgroundColor: "white",
    padding: 5, 
    borderRadius: 15,
    marginVertical: 5,
    elevation: 5, 
    alignItems: "center",
    justifyContent: "center"
  },
  scrollContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  cardContainer: {
    alignItems: 'flex-start',
    marginHorizontal: 10,
    width: 160,
  },
  card: {
    width: '100%',
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 1,
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
    bottom: 13,
    right: 7,
    flexDirection: 'column',
    alignItems: 'center',
  },
  iconButton: {
    marginBottom: 1,
  },
  iconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  name: {
    marginStart:10,
    marginTop: 5,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
    lineHeight: 16,
  },
  price: {
    marginStart:10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF5722',
    marginTop: 4,
    textAlign: 'left',
  },
});

export default CardLayout;




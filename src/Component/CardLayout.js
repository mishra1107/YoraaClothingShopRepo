import { useNavigation } from '@react-navigation/native'; 
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCart } from '../services/cart/CartContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { WishlistContext } from '../services/context/WishlistContext';
import { BASE_URL } from '../constants/config';
import SizeChartModal from './SizeChartModal'; // Import the modal

const CardLayout = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toggleCart, fetchCart } = useCart();
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const [modalVisible, setModalVisible] = useState(false); // Modal state
  const [selectedProduct, setSelectedProduct] = useState(null); // Selected product for modal

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = await AsyncStorage.getItem('token'); 
        const response = await fetch(`${BASE_URL}/items?page=1&limit=20`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched Data1111111111111111:', data);
        const items = (data.items || []).map(item => ({
          id: item.id || item._id,
          name: item.name || 'Unnamed',
          price: item.price || '0',
          image: item.imageUrl || '',
          sizes: item.sizes || [], // Add sizes if available from API
          sizeChartInch: item.sizeChartInch || '', // Add size chart fields
          sizeChartCm: item.sizeChartCm || '',
          sizeMeasurement: item.sizeMeasurement || '',
        }));
        console.log("items", items);
        setProducts(items);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  // Function to fetch product details based on item ID
  const fetchProductDetails = async (id) => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(`${BASE_URL}/itemDetails/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response) {
        throw new Error('Failed to fetch product details');
      }
      const data = await response.json();
      console.log('Product Details:1212121212121212121212', data);
      // Map the detailed data to the expected format
      return {
        id: data.items ,
        name: data.name || 'Unnamed',
        price: data.price || '0',
        image: data.imageUrl || '',
        sizes: data.sizes || [],
        sizeChartInch: data.sizeChartInch || '',
        sizeChartCm: data.sizeChartCm || '',
        sizeMeasurement: data.sizeMeasurement || '',
      };
    } catch (error) {
      console.error('Error fetching product details:', error);
      Alert.alert('Error', 'Failed to load product details');
      return null;
    }
  };

  // Handler for cart icon click to fetch details and open the modal
  const handleCartIconPress = async (item) => {
    const detailedProduct = await fetchProductDetails(item.id);
    if (detailedProduct) {
      setSelectedProduct(detailedProduct);
      setModalVisible(true); // Open the SizeChartModal with detailed data
    }
  };

  // Handler for long press to fetch details and open the modal
  const handleLongPress = async (item) => {
    const detailedProduct = await fetchProductDetails(item.id);
    if (detailedProduct) {
      setSelectedProduct(detailedProduct);
      setModalVisible(true); // Open modal with detailed data
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        {/* Make the image clickable */}
        <TouchableOpacity 
          onPress={() => navigation.navigate('Product', { id: item.id })}
          onLongPress={() => handleLongPress(item)} // Updated to fetch details
        >
          <Image 
            source={item.image ? { uri: item.image } : require('../assests/images/Shopping.png')} 
            style={styles.image} 
          />
        </TouchableOpacity>

        <View style={styles.iconsContainer}>
          {/* <TouchableOpacity 
            style={styles.iconButton1} 
            onPress={() => handleCartIconPress(item)} // Updated to fetch details
          >
            <Icon name="cart-outline" size={18} color="black" />
          </TouchableOpacity> */}

          {/* <TouchableOpacity 
            onPress={async () => {
              const token = await AsyncStorage.getItem('token');
              if (!token) {
                Alert.alert("You need to login/signin first");
                navigation.navigate('Welcome');
              } else {
                toggleWishlist(item.id);
              }
            }} 
            style={styles.iconButton1}
          >
            <Icon name={wishlist[item.id] ? "heart" : "heart-outline"} size={18} color={wishlist[item.id] ? "red" : "black"} />
          </TouchableOpacity> */}
        </View>
      </View>
      <Text style={styles.price}>Rs {item.price}</Text>
      <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.name}>{item.description}</Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#FF5722" style={{ marginTop: 50 }} />;
  }

  return (
    <>
      <FlatList
        horizontal
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()} 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      />
      {selectedProduct && (
        <SizeChartModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          sizeChartInch={selectedProduct.sizeChartInch}
          sizeChartCm={selectedProduct.sizeChartCm}
          sizeMeasurement={selectedProduct.sizeMeasurement}
          sizes={selectedProduct.sizes}
          itemId={selectedProduct.id}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  iconButton1: {
    backgroundColor: "white",
    padding: 5, 
    borderRadius: 15,
    marginVertical: 5,
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
    borderRadius: 1,
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
    marginStart: 10,
    marginTop: 5,
    fontSize: 12,
    fontWeight: 'bold',
    color: "#333",
    textAlign: 'left',
    lineHeight: 16,
  },
  price: {
    marginStart: 10,
    fontSize: 14,
    color: "#909090",
    marginTop: 4,
    textAlign: 'left',
  },
});

export default CardLayout;
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay';
import { useCart } from '../services/cart/CartContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = () => {
  const navigation = useNavigation();
  const { cart, fetchCart, removeFromCart, updateCartItem } = useCart();
  const [address, setAddress] = useState(null);

  useEffect(() => {
    fetchCart();
    fetchAddress();
    const unsubscribe = navigation.addListener('focus', fetchAddress);
    return unsubscribe;
  }, [navigation]);

  const fetchAddress = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await fetch('http://localhost:8080/api/address/user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      const data = await response.json();
      if (data && data.data && data.data.length > 0) {
        setAddress(data.data[0]);
      } else {
        setAddress(null);
      }
    } catch (error) {
      console.error('Fetch Address Error:', error);
      Alert.alert('Error', 'Failed to fetch address.');
    }
  };

  const handleCheckout = () => {
    navigation.navigate('Payment');
  };

  const handleAddress = () => {
    navigation.navigate('Address');
  };

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleRemoveItem = async (cartId) => {
    try {
      await removeFromCart(cartId);
      await fetchCart();
    } catch (error) {
      console.error('Error removing item:', error);
      Alert.alert('Error', 'Failed to remove item from cart');
    }
  };

  const handleUpdateQuantity = async (cartId, newQuantity) => {
    if (newQuantity <= 0) {
      await handleRemoveItem(cartId);
    } else {
      try {
        console.log(`Updating cart ID: ${cartId} to quantity: ${newQuantity}`);
        await updateCartItem(cartId, newQuantity);
        await fetchCart();
      } catch (error) {
        console.error('Error updating item quantity:', error);
        Alert.alert('Error', 'Failed to update item quantity');
      }
    }
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => handleUpdateQuantity(item.cartId, item.quantity - 1)}>
            <Icon name="remove" size={20} color="black" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => handleUpdateQuantity(item.cartId, item.quantity + 1)}>
            <Icon name="add" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>
      </View>
      <TouchableOpacity
        onPress={() => handleRemoveItem(item.cartId)}
        style={styles.removeButton}>
        <Text style={styles.removeButtonText}>Remove Item</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CART</Text>
      </View>

      <FlatList
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={item => item.cartId.toString()} 
      />

      <TouchableOpacity onPress={handleAddress}>
        <View style={styles.addressContainer}>
          {address ? (
            <View>
              <Text style={styles.addressText}>{address.address}</Text>
              <Text style={styles.addressText}>{address.city}, {address.state} {address.pinCode}</Text>
              <Text style={styles.addressText}>{address.country}</Text>
              <Text style={styles.addressText}>{address.phoneNumber}</Text>
            </View>
          ) : (
            <Text style={styles.addressText}>No address available. Click to add one.</Text>
          )}
          <TouchableOpacity style={styles.arrowIconContainer}>
            <Icon name="keyboard-arrow-right" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <View style={styles.deliveryContainer}>
        <Icon
          name="local-shipping"
          size={20}
          color="black"
          style={styles.deliveryIcon}
        />
        <Text style={styles.deliveryText}>DELIVERY</Text>
        <Text style={styles.deliveryFee}>Free</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.totalText}>TOTAL</Text>
        <Text style={styles.totalPrice}>₹{calculateTotal()}</Text>
      </View>
      <TouchableOpacity onPress={handleCheckout} style={styles.checkoutButton}>
        <Text style={styles.checkoutText}>CHECKOUT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: { marginRight: 15 },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'space-between',
  },
  itemImage: { width: 80, height: 80, borderRadius: 10 },
  itemDetails: { flex: 1, marginLeft: 10 },
  itemTitle: { fontSize: 14, fontWeight: 'bold' },
  itemDescription: { fontSize: 12, color: '#777' },
  itemPrice: { fontSize: 14, fontWeight: 'bold', marginTop: 5, color: '#E53935' },
  quantityContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  quantityText: { marginHorizontal: 10, fontSize: 16 },
  removeButton: {
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#f8f8f8',
  },
  removeButtonText: { color: '#555', fontSize: 14 },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  addressText: { fontSize: 14, color: '#555' },
  arrowIconContainer: { marginLeft: 10 },
  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  deliveryIcon: { marginRight: 10 },
  deliveryText: { fontSize: 14, color: '#555' },
  deliveryFee: { fontSize: 14, color: '#555' },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalText: { fontSize: 16, fontWeight: 'bold' },
  totalPrice: { fontSize: 16, fontWeight: 'bold', color: '#E53935' },
  checkoutButton: {
    backgroundColor: 'black',
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  checkoutText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default CartScreen;

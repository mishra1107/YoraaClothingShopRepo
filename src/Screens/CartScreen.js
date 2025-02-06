import React, { useEffect } from 'react'; 
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

const CartScreen = () => {
  const navigation = useNavigation();
  const { cart, fetchCart } = useCart();  // ✅ Use cart from context

  useEffect(() => {
    fetchCart(); // ✅ Fetch cart items when screen loads
  }, []);

  const handleCheckout = () => {
    const options = {
      description: 'Order Payment',
      image: 'https://your-logo-url.com/logo.png',
      currency: 'INR',
      key: 'rzp_test_tICgwjKnkQloxe',
      amount: calculateTotal() * 100, // Convert to paise
      name: 'Your Business Name',
      prefill: {
        email: 'user@example.com',
        contact: '9876543210',
        name: 'User Name',
      },
      theme: { color: '#F37254' },
    };

    RazorpayCheckout.open(options)
      .then((data) => {
        Alert.alert('Payment Success', `Payment ID: ${data.razorpay_payment_id}`);
      })
      .catch((error) => {
        Alert.alert('Payment Failure', error.description);
      });
  };

  // ✅ Calculate total from cart
  const calculateTotal = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // ✅ Render each cart item
  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CART</Text>
      </View>

      {/* Cart Items */}
      <FlatList 
        data={cart} 
        renderItem={renderCartItem} 
        keyExtractor={(item) => item.id.toString()} 
      />

      {/* Footer */}
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
  header: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  backButton: { marginRight: 15 },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  cartItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  itemImage: { width: 80, height: 80, borderRadius: 10 },
  itemDetails: { flex: 1, marginLeft: 10 },
  itemTitle: { fontSize: 14, fontWeight: 'bold' },
  itemDescription: { fontSize: 12, color: '#777' },
  itemPrice: { fontSize: 14, fontWeight: 'bold', marginTop: 5, color: '#E53935' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderTopWidth: 1, borderTopColor: '#ddd' },
  totalText: { fontSize: 16, fontWeight: 'bold' },
  totalPrice: { fontSize: 16, fontWeight: 'bold', color: '#E53935' },
  checkoutButton: { backgroundColor: 'black', padding: 15, alignItems: 'center', marginHorizontal: 15, marginBottom: 10, borderRadius: 5 },
  checkoutText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default CartScreen;

import React, { useState } from 'react';
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

const CartScreen = () => {
  const navigation = useNavigation();

  const handleCheckout = () => {
    const options = {
      description: 'Order Payment',
      image: 'https://your-logo-url.com/logo.png',
      currency: 'INR',
      key: 'rzp_test_tICgwjKnkQloxe',
      amount: '24000',
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

  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      image: require('../assests/images/Shopping.png'),
      title: 'LAMEREI',
      description: 'RECYCLE BOUCLE KNIT CARDIGAN PINK',
      price: 120,
      quantity: 1,
    },
    {
      id: '2',
      image: require('../assests/images/Shopping.png'),
      title: 'LAMEREI',
      description: 'RECYCLE BOUCLE KNIT CARDIGAN PINK',
      price: 120,
      quantity: 1,
    },
  ]);

  const incrementQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0) // Remove items with quantity 0
    );
  };
  
  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => decrementQuantity(item.id)}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => incrementQuantity(item.id)}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CART</Text>
      </View>

      {/* Cart Items */}
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        style={styles.cartList}
      />

      {/* Address Section */}
      <TouchableOpacity onPress={() => navigation.navigate('Address')}>
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>
            606-3727 ULLAMCORPER. STREET{'\n'}ROSEVILLE NH 11523{'\n'}(786)
            713-8616
          </Text>
          <Icon name="chevron-right" size={24} color="black" />
        </View>
      </TouchableOpacity>

      {/* Delivery Section */}
      <View style={styles.deliveryContainer}>
        <Text style={styles.deliveryLabel}>DELIVERY</Text>
        <Text style={styles.deliveryValue}>Free</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.totalText}>TOTAL</Text>
        <Text style={styles.totalPrice}>₹{calculateTotal()}</Text>
      </View>
      {/* <TouchableOpacity onPress={handleCheckout} style={styles.checkoutButton}>
        <Text style={styles.checkoutText}>CHECKOUT</Text>
      </TouchableOpacity> */}


      <TouchableOpacity
              onPress={handleCheckout}
              style={styles.verifyButton}
            >
              <Text style={styles.verifyButtonText}>CHECKOUT</Text>
            </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: '600', textAlign: 'center', flex: 1 },
  cartList: { flex: 1 },
  cartItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemImage: { width: 80, height: 80, borderRadius: 8 },
  itemDetails: { flex: 1, marginLeft: 10 },
  itemTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 4 },
  itemDescription: { fontSize: 12, color: '#999', marginBottom: 10 },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  quantityButton: {
    fontSize: 16,
    width: 28,
    textAlign: 'center',
    color: '#000',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  quantity: { fontSize: 14, marginHorizontal: 10 },
  itemPrice: { fontSize: 14, fontWeight: '600', color: '#E91E63' },
  addressContainer: {
    // backgroundColor:'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 45,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  addressText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
    flex: 1,
  },
  deliveryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  deliveryLabel: { fontSize: 14, color: '#999' },
  deliveryValue: { fontSize: 14, fontWeight: '600' },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalText: { fontSize: 16, fontWeight: '600' },
  totalPrice: { fontSize: 16, fontWeight: '600', color: '#E91E63' },
  checkoutButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    alignItems: 'center',
    margin: 20,
    borderRadius: 8,
  },
  checkoutText: { fontSize: 16, fontWeight: '600', color: '#fff' },
  //  verifyButton: {
  //   position: 'absolute', // Stick the button to the bottom
  //   bottom: 0, // Align at the bottom
  //   left: 0,
  //   right: 0,
  //   backgroundColor: '#000000',
  //   padding: 15,
  //   borderRadius: 0, // Full-width button
  //   alignItems: 'center',
  // },
  // verifyButtonText: {
  //   color: '#FFFFFF',
  //   fontSize: 16,
  //   fontWeight: 'bold',
  // },
}); 


export default CartScreen;

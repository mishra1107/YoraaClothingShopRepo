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

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

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
        .filter((item) => item.quantity > 0)
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
        <View style={styles.priceRemoveContainer}>
        <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.removeButton}>
          <Text style={styles.removeButtonText}>Remove Item</Text>
        </TouchableOpacity>
      </View>
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
            606-3727 ULLAMCORPER. STREET {'\n'}
ROSEVILLE NH 11523 {'\n'}
78 713-8616
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
      <TouchableOpacity onPress={handleCheckout} style={styles.checkoutButton}>
        <Text style={styles.checkoutText}>CHECKOUT</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartList: {
    paddingHorizontal: 15,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemImage: {
    width: 80, 
    height: 80,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 12,
    color: '#777',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityButton: {
    fontSize: 18,
    paddingHorizontal: 10,
  },
  quantity: {
    fontSize: 14,
    marginHorizontal: 5,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  removeButton: {
    backgroundColor: '#eee',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  removeButtonText: {
    fontSize: 12,
    color: '#333',
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  addressText: {
    fontSize: 14,
    color: '#333',
  },
  deliveryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  deliveryLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  deliveryValue: {
    fontSize: 14,
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E53935',
  },
  checkoutButton: {
    backgroundColor: 'black',
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  checkoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  priceRemoveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E53935',
  },
  removeButton: {
    backgroundColor: '#eee',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  removeButtonText: {
    fontSize: 12,
    color: '#333',
  },
});
export default CartScreen;

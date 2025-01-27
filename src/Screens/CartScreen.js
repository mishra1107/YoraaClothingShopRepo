import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay';

const CartScreen = () => {
    const navigation = useNavigation();
    const handleCheckout = () => {
      // Configure Razorpay options
      const options = {
        description: 'Order Payment',
        image: 'https://your-logo-url.com/logo.png', // Optional: Replace with your logo URL
        currency: 'INR', // Change if needed
        key: 'rzp_test_tICgwjKnkQloxe', // Replace with your Razorpay API key
        amount: '24000', // Amount in paise (e.g., 24000 = ₹240)
        name: 'Your Business Name',
        prefill: {
          email: 'user@example.com', // Replace with user's email
          contact: '9876543210', // Replace with user's phone number
          name: 'User Name', // Replace with user's name
        },
        theme: { color: '#F37254' }, // Customize Razorpay UI theme
      };

      RazorpayCheckout.open(options)
      .then((data) => {
        // Handle success
        Alert.alert('Payment Success', `Payment ID: ${data.razorpay_payment_id}`);
      })
      .catch((error) => {
        // Handle failure
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
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={ item.image } style={styles.itemImage} />
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
                onPress={() => navigation.navigate('Home')}
                style={styles.backButton}>
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

      {/* Address and Delivery */}

      <TouchableOpacity onPress={() => navigation.navigate('Address')}>
      <View style={styles.addressContainer}>
        <Text style={styles.address}>
          606-3727 ULLAMCORPER. STREET{'\n'}ROSEVILLE NH 11523{'\n'}(786)
          713-8616
        </Text>
        <Text style={styles.editIcon}>{'>'}</Text>
      </View>
    </TouchableOpacity>

      <View style={styles.deliveryContainer}>
        <Text style={styles.deliveryLabel}>DELIVERY</Text>
        <Text style={styles.deliveryValue}>Free</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.totalText}>TOTAL</Text>
        <Text style={styles.totalPrice}>₹{calculateTotal()}</Text>
      </View>
      <TouchableOpacity onPress={handleCheckout}   style={styles.checkoutButton}>
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
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backIcon: {
    fontSize: 16,
    color: '#000',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  cartList: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
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
    color: '#555',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  quantityButton: {
    fontSize: 18,
    width: 30,
    textAlign: 'center',
    color: '#000',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  quantity: {
    fontSize: 14,
    marginHorizontal: 10,
  },
  itemPrice: {
    fontSize: 14,
    color: '#ff0000',
    fontWeight: 'bold',
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  address: {
    fontSize: 12,
    color: '#555',
  },
  editIcon: {
    fontSize: 16,
    color: '#000',
  },
  deliveryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  deliveryLabel: {
    fontSize: 14,
    color: '#555',
  },
  deliveryValue: {
    fontSize: 14,
    color: '#000',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 16,
    color: '#ff0000',
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#000',
    padding: 15,
    alignItems: 'center',
    margin: 10,
    borderRadius: 4,
  },
  checkoutText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CartScreen;

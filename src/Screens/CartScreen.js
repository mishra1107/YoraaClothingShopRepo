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
      image: 'data:image/jpeg;base64,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',
      title: 'LAMEREI',
      description: 'RECYCLE BOUCLE KNIT CARDIGAN PINK',
      price: 120,
      quantity: 1,
    },
    {
      id: '2',
      image: 'data:image/jpeg;base64,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',
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
      <Image source={{ uri: item.image }} style={styles.itemImage} />
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

import React, {useEffect} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay';
import {useCart} from '../services/cart/CartContext';

const CartScreen = () => {
  const navigation = useNavigation();
  const {cart, fetchCart, removeFromCart, updateCartItem} = useCart();

  useEffect(() => {
    fetchCart();
  }, []);

  const handleCheckout = () => {
    navigation.navigate('Payment');
    // const options = {
    //   description: 'Order Payment',
    //   image: 'https://your-logo-url.com/logo.png',
    //   currency: 'INR',
    //   key: 'rzp_test_tICgwjKnkQloxe',
    //   amount: calculateTotal() * 100,
    //   name: 'Your Business Name',
    //   prefill: {
    //     email: 'user@example.com',
    //     contact: '9876543210',
    //     name: 'User Name',
    //   },
    //   theme: {color: '#F37254'},
    // };

    // RazorpayCheckout.open(options)
    //   .then(data => {
    //     Alert.alert(
    //       'Payment Success',
    //       `Payment ID: ${data.razorpay_payment_id}`,
    //     );
    //   })
    //   .catch(error => {
    //     Alert.alert('Payment Failure', error.description);
    //   });
  };

  const handleAddress = () => {
    navigation.navigate('Address');
  };

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleRemoveItem = async (cartId) => {
    try {
      await removeFromCart(cartId);  // Use cartId instead of itemId
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
        await updateCartItem(cartId, newQuantity);  // Use cartId here
        await fetchCart();  // Refresh the cart to reflect changes
      } catch (error) {
        console.error('Error updating item quantity:', error);
        Alert.alert('Error', 'Failed to update item quantity');
      }
    }
  };
  
  const renderCartItem = ({item}) => (
    <View style={styles.cartItem}>
      <Image source={{uri: item.imageUrl}} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => handleUpdateQuantity(item.cartId, item.quantity - 1)}>
          <Icon name="remove" size={20} color="black" />
        </TouchableOpacity>

        {/* Display Quantity */}
        <Text style={styles.quantityText}>{item.quantity}</Text>

        {/* Increase Quantity */}
        <TouchableOpacity onPress={() => handleUpdateQuantity(item.cartId, item.quantity + 1)}>
          <Icon name="add" size={20} color="black" />
        </TouchableOpacity>
        </View>
        <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>
      </View>
      <TouchableOpacity
        onPress={() => handleRemoveItem(item.id)}
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

      <View style={styles.addressContainer}>
        <TouchableOpacity onPress={handleCheckout}>
          <View>
            <Text style={styles.addressText}>606-3727 ULLAMCORPER. STREET</Text>
            <Text style={styles.addressText}>ROSEVILLE NH 11523</Text>
            <Text style={styles.addressText}>(786) 713-8616</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.arrowIconContainer}>
          <Icon name="keyboard-arrow-right" size={24} color="black" />
        </TouchableOpacity>
      </View>

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
  container: {flex: 1, backgroundColor: '#fff'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {marginRight: 15},
  headerTitle: {fontSize: 18, fontWeight: 'bold'},
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'space-between',
  },
  itemImage: {width: 80, height: 80, borderRadius: 10},
  itemDetails: {flex: 1, marginLeft: 10},
  itemTitle: {fontSize: 14, fontWeight: 'bold'},
  itemDescription: {fontSize: 12, color: '#777'},
  itemPrice: {fontSize: 14, fontWeight: 'bold', marginTop: 5, color: '#E53935'},
  quantityContainer: {flexDirection: 'row', alignItems: 'center', marginTop: 5},
  quantityText: {marginHorizontal: 10, fontSize: 16},
  removeButton: {
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#f8f8f8',
  },
  removeButtonText: {color: '#555', fontSize: 14},
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  addressText: {fontSize: 14, color: '#555'},
  arrowIconContainer: {marginLeft: 10},
  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  deliveryIcon: {marginRight: 10},
  deliveryText: {fontSize: 14, color: '#555'},
  deliveryFee: {fontSize: 14, color: '#555'},
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalText: {fontSize: 16, fontWeight: 'bold'},
  totalPrice: {fontSize: 16, fontWeight: 'bold', color: '#E53935'},
  checkoutButton: {
    backgroundColor: 'black',
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  checkoutText: {color: 'white', fontSize: 16, fontWeight: 'bold'},
});

export default CartScreen;

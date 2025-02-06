import React, { useContext, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Share from 'react-native-share';
import { useNavigation } from '@react-navigation/native';
import { WishlistContext } from '../services/context/WishlistContext';
import { CartContext } from '../services/cart/CartContext';
import { useCart } from '../services/cart/CartContext';

const FilterSection = () => {
  const navigation = useNavigation();
  const { wishlistCount } = useContext(WishlistContext);
  


  const { cartCount, fetchCart } = useCart(); // ✅ Get cart count from context

  useEffect(() => {
    fetchCart(); // ✅ Fetch cart count when component mounts
  }, []);

  const handleWishlistPress = () => {
    navigation.navigate('Wishlist');
  };

  const handleCartPress = () => {
    navigation.navigate('Cart');
  };

  const handleShare = async () => {
    const shareOptions = {
      title: 'Check out this product!',
      message: 'Hey, check out this amazing product on our store: https://mystore.com/product/12345',
      url: 'https://mystore.com/product/12345',
      social: Share.Social.WHATSAPP,
    };

    try {
      await Share.open(shareOptions);
    } catch (error) {
      console.log('Error ->', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} style={styles.searchIcon} />
        <TextInput style={styles.searchInput} placeholder="Search Items" placeholderTextColor="#999" />
      </View>

      <TouchableOpacity onPress={handleShare}>
        <Image source={require('../assests/images/share.png')} style={styles.icon1} />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleWishlistPress} style={styles.wishlistContainer}>
        <Icon name="heart-outline" size={24} style={styles.icon} />
        {wishlistCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{wishlistCount}</Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={handleCartPress} style={styles.cartContainer}>
        <Icon name="cart-outline" size={24} style={styles.icon} />
      
        {cartCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cartCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderColor: '#ddd' },
  searchContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ccc', borderRadius: 5, paddingHorizontal: 8, marginRight: 10 },
  searchIcon: { marginRight: 5, color: '#999' },
  searchInput: { flex: 1, height: 40, color: '#000' },
  icon1: { width: 25, height: 25 },
  cartContainer: { position: 'relative' },
  wishlistContainer: { position: 'relative' },
  badge: { position: 'absolute', top: -5, right: -10, backgroundColor: 'red', borderRadius: 10, width: 20, height: 20, justifyContent: 'center', alignItems: 'center' },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
});

export default FilterSection;

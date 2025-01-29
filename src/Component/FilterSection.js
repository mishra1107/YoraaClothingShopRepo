import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Share from 'react-native-share';
import { useNavigation } from '@react-navigation/native';

const FilterSection = () => {
  const navigation = useNavigation();
  const [cartCount, setCartCount] = useState(0); 
  const [isWishlistSelected, setIsWishlistSelected] = useState(false); 

  const handleCartPress = () => {
    setCartCount(cartCount + 1); 
    navigation.navigate('Cart');
  };

  const handleWishlistPress = () => {
    setIsWishlistSelected(!isWishlistSelected);
    navigation.navigate('Wishlist');
  };

  // Function to handle deep linking share
  const handleShare = async () => {
    const shareOptions = {
      title: 'Check out this product!',
      message: 'Hey, check out this amazing product on our store: https://mystore.com/product/12345', // Replace with your dynamic link
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
        <TextInput
          style={styles.searchInput}
          placeholder="Search Items"
          placeholderTextColor="#999"
        />
      </View>

      <TouchableOpacity onPress={handleShare}>
        <Image
         source={require('../assests/images/share.png')}
          style={styles.icon1}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleWishlistPress}>
        <Icon
          name={isWishlistSelected ? 'heart' : 'heart-outline'}
          size={24}
          style={[styles.icon, isWishlistSelected && styles.selectedIcon]}
        />
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
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 8,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 5,
    color: '#999',
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#000',
  },
  icon: {
    marginHorizontal: 5,
    color: '#000',
  },
  selectedIcon: {
    color: 'red',
  },
  icon1: {
    width: 25,
    height: 25,
  },
  cartContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    left: -10,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FilterSection;

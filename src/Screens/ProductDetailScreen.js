import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AccordionItem from '../Component/AccordianItem';
import { useNavigation, useRoute } from '@react-navigation/native';
import YouMayAlsoLike from '../Component/YouMayAlsoLike';
import CardLayout from '../Component/CardLayout';
import SizeChartModal from '../Component/SizeChartModal';
import ShoppingCarousel from '../Component/ShoppingCarosuel';
import { BASE_URL } from '../constants/config';
import Icon from 'react-native-vector-icons/Ionicons';

const ProductDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;
  const [sizeChartVisible, setSizeChartVisible] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [actionAfterSizeSelection, setActionAfterSizeSelection] = useState(null);

  // Animation setup
  const slideAnim = useRef(new Animated.Value(-300)).current; // Start off-screen to the left

  useEffect(() => {
    const fetchProductDetails = async () => {
      const token = await AsyncStorage.getItem('token');
      try {
        const response = await fetch(`${BASE_URL}/itemDetails/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setProductDetails(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    fetchProductDetails();
  }, [id]);

  useEffect(() => {
    // Animate when isDetailsOpen changes
    Animated.timing(slideAnim, {
      toValue: isDetailsOpen ? 0 : -300, // Slide in to 0, slide out to -300
      duration: 300, // Animation duration in milliseconds
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  }, [isDetailsOpen]);

  if (!productDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const renderManufacturerDetails = (details) => {
    return (
      <View>
        <Text style={styles.detailText}>Name: {details.name}</Text>
        <Text style={styles.detailText}>Address: {details.address}</Text>
        <Text style={styles.detailText}>Country of Origin: {details.countryOfOrigin}</Text>
        <Text style={styles.detailText}>Phone: {details.contactDetails.phone}</Text>
        <Text style={styles.detailText}>Email: {details.contactDetails.email}</Text>
      </View>
    );
  };

  const renderShippingAndReturns = (data) => {
    return (
      <View>
        <Text style={styles.subHeader}>Shipping Details:</Text>
        {data.shippingDetails.map((item, index) => (
          <Text key={index} style={styles.detailText}>- {item}</Text>
        ))}
        <Text style={styles.subHeader}>Return Policy:</Text>
        {data.returnPolicy.map((item, index) => (
          <Text key={index} style={styles.detailText}>- {item}</Text>
        ))}
      </View>
    );
  };

  const handleAddToCart = () => {
    setActionAfterSizeSelection('addToCart');
    setSizeChartVisible(true);
  };

  const handleBuyNow = () => {
    setActionAfterSizeSelection('buyNow');
    setSizeChartVisible(true);
  };

  const handleCartIconPress = () => {
    setActionAfterSizeSelection('addToCart');
    setSizeChartVisible(true);
  };

  const handleSizeChartClose = (selectedSize) => {
    setSizeChartVisible(false);
    if (actionAfterSizeSelection === 'addToCart') {
      console.log('Added to cart:', productDetails.items.name, 'Size:', selectedSize);
    } else if (actionAfterSizeSelection === 'buyNow') {
      console.log('Buy now:', productDetails.items.name, 'Size:', selectedSize);
    }
    setActionAfterSizeSelection(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../assests/images/BackArrow.png')} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>DETAILS</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ShoppingCarousel
          images={productDetails.images}
          itemId={id}
          onCartPress={handleCartIconPress}
        />

        <View style={styles.detailsContainer}>
          <Text style={styles.productTitle}>{productDetails.items.name}</Text>
          <Text style={styles.productDescription}>{productDetails.items.description}</Text>
          <Text style={styles.productPrice}>Rs {productDetails.items.price} (ALL TAXES INCLUDED)</Text>

          <View style={styles.priceContainer}>
            <TouchableOpacity onPress={() => setIsDetailsOpen(!isDetailsOpen)}>
              <Text style={styles.selectSize}>DETAILS</Text>
            </TouchableOpacity>
          </View>

          {isDetailsOpen && (
            <Animated.View style={[styles.accordionContent, { transform: [{ translateX: slideAnim }] }]}>
              <AccordionItem
                title="DESCRIPTION & RETURNS"
                content={
                  <View>
                    <Text>{productDetails.descriptionAndReturns}</Text>
                    {productDetails.fitDetails && <Text>{productDetails.fitDetails}</Text>}
                    {productDetails.careInstructions && <Text>{productDetails.careInstructions}</Text>}
                    {productDetails.size && <Text>{productDetails.size}</Text>}
                  </View>
                }
              />
              <AccordionItem
                title="MANUFACTURER DETAILS"
                content={renderManufacturerDetails(productDetails.manufacturerDetails)}
              />
              <AccordionItem
                title="SHIPPING, RETURNS AND EXCHANGES"
                content={renderShippingAndReturns(productDetails.shippingAndReturns)}
              />
            </Animated.View>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
              <Text style={styles.buyNowButtonText}>BUY IT NOW</Text>
            </TouchableOpacity>
          </View>
        </View>

        <YouMayAlsoLike />
        <CardLayout />
      </ScrollView>

      <SizeChartModal
        visible={sizeChartVisible}
        onClose={handleSizeChartClose}
        sizes={productDetails.sizes}
        sizeChartCm={productDetails.sizeChartCm}
        sizeChartInch={productDetails.sizeChartInch}
        sizeMeasurement={productDetails.sizeMeasurement}
        itemId={id}
      />
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsContainer: {
    padding: 15,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1.2,
  },
  productDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'light',
    color: '#909090',
    marginVertical: 5,
  },
  selectSize: {
    fontSize: 12,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#333',
    marginVertical: 2,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  accordionContent: {
    width: '100%',
  },
  buttonContainer: {
    marginTop: 15,
    marginBottom: 20,
  },
  addToCartButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cartButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    flex: 1,
  },
  heartIcon: {
    width: 20,
    height: 20,
    tintColor: '#000',
  },
  buyNowButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buyNowButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});
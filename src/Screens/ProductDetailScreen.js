
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AccordionItem from '../Component/AccordianItem'; 
import { useNavigation, useRoute } from '@react-navigation/native';
import YouMayAlsoLike from '../Component/YouMayAlsoLike';
import CardLayout from '../Component/CardLayout';
import SizeChartModal from '../Component/SizeChartModal';
import ShoppingCarousel from '../Component/ShoppingCarosuel';

const ProductDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;
  const [sizeChartVisible, setSizeChartVisible] = useState(false);
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const token = await AsyncStorage.getItem('token');
      try {
        const response = await fetch(`http://18.144.80.232:8080/api/itemDetails/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setProductDetails(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [id]);

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>DETAILS</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        
        <ShoppingCarousel images={productDetails.images} />

        <View style={styles.detailsContainer}>
          <Text style={styles.productTitle}>{productDetails.items.name}</Text>
          <Text style={styles.productDescription}>{productDetails.items.description}</Text>

          <View style={styles.priceContainer}>
            <Text style={styles.productPrice}>₹{productDetails.items.price}</Text>
            <TouchableOpacity onPress={() => setSizeChartVisible(true)}>
              <Text style={styles.selectSize}>SELECT SIZE</Text>
            </TouchableOpacity>
          </View>
        </View>

        <AccordionItem 
          title="DESCRIPTION & RETURNS" 
          content={productDetails.descriptionAndReturns} 
          fitDetails={productDetails.fitDetails} 
          careInstructions={productDetails.careInstructions} 
          sizeDetails={productDetails.size} 
        />
        <AccordionItem 
          title="MANUFACTURER DETAILS" 
          content={renderManufacturerDetails(productDetails.manufacturerDetails)} 
        />
        <AccordionItem 
          title="SHIPPING, RETURNS AND EXCHANGES" 
          content={renderShippingAndReturns(productDetails.shippingAndReturns)} 
        />
        <YouMayAlsoLike />
        <CardLayout />
      </ScrollView>
      <SizeChartModal visible={sizeChartVisible} onClose={() => setSizeChartVisible(false)} />
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
  cartIcon: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    elevation: 5, 
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
    fontWeight: 'bold',
    color: '#E91E63',
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
});

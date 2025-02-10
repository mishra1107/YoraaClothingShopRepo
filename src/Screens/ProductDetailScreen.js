// import React, { useState } from 'react';  
// import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';

// import AccordionItem from '../Component/AccordianItem'; 
// import { useNavigation } from '@react-navigation/native';
// import YouMayAlsoLike from '../Component/YouMayAlsoLike';
// import CardLayout from '../Component/CardLayout';
// import SizeChartModal from '../Component/SizeChartModal';  // Import the modal
// import ShoppingCarousel from '../Component/ShoppingCarosuel';

// const ProductDetailScreen = () => {
//   const navigation = useNavigation();
//   const [sizeChartVisible, setSizeChartVisible] = useState(false); // State for modal visibility

//   return (
//     <View style={styles.container}>
      
//       {/* Header Section */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <Icon name="arrow-left" size={24} color="black" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>DETAILS</Text>
//       </View>

//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* Product Image with Cart Icon */}
//         <View style={styles.imageContainer}>
//           <Image source={require('../assests/images/Shopping.png')} style={styles.productImage} />

//            {/* <ShoppingCarousel/> */}
//           {/* Cart Icon at Bottom Right */}
//           <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.cartIcon}>
//             <Icon name="shopping-cart" size={22} color="#000" />
//           </TouchableOpacity>
//         </View>

//         {/* Product Details */}
//         <View style={styles.detailsContainer}>
//           <Text style={styles.productTitle}>MOHAN</Text>
//           <Text style={styles.productDescription}>RECYCLE BOUCLE KNIT CARDIGAN PINK</Text>

//           {/* Price and Select Size in the same row */}
//           <View style={styles.priceContainer}>
//             <Text style={styles.productPrice}>₹120</Text>
//             <TouchableOpacity onPress={() => setSizeChartVisible(true)}> 
//               <Text style={styles.selectSize}>SELECT SIZE</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Accordion Sections */}
//         <AccordionItem title="DESCRIPTION & RETURNS" content="" />
// <AccordionItem title="MANUFACTURER DETAILS" content="Manufacturer details here..." />
// <AccordionItem title="SHIPPING, RETURNS AND EXCHANGES" content="Shipping details here..." />

//         {/* You May Also Like Section */}
//         <YouMayAlsoLike />

//         {/* Card Layout */}
//         <CardLayout />
//       </ScrollView>

//       {/* Size Chart Modal */}
//       <SizeChartModal visible={sizeChartVisible} onClose={() => setSizeChartVisible(false)} />
//     </View>
//   );
// };

// export default ProductDetailScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//     position: 'relative',
//   },
//   backButton: {
//     position: 'absolute',
//     left: 15,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   imageContainer: {
//     position: 'relative',
//   },
//   productImage: {
//     width: '100%',
//     height: 350, 
//     resizeMode: 'cover', 
//   },
//   cartIcon: {
//     position: 'absolute',
//     bottom: 15,
//     right: 15,
//     backgroundColor: '#fff',
//     borderRadius: 50,
//     padding: 10,
//     elevation: 5, 
//   },
//   detailsContainer: {
//     padding: 15,
//   },
//   productTitle: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     letterSpacing: 1.2,
//   },
//   productDescription: {
//     fontSize: 12,
//     color: '#666',
//     marginTop: 5,
//   },
//   priceContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between', 
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   productPrice: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#E91E63',
//   },
//   selectSize: {
//     fontSize: 12,
//     fontWeight: 'bold',
//     textDecorationLine: 'underline',
//     color: '#000',
//   },
// });

import React, { useState, useEffect } from 'react';  
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import AccordionItem from '../Component/AccordianItem'; 
import YouMayAlsoLike from '../Component/YouMayAlsoLike';
import SizeChartModal from '../Component/SizeChartModal';

const ProductDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;  // Get the ID from navigation params
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sizeChartVisible, setSizeChartVisible] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://10.0.2.2:8080/api/items/${id}`);
        const data = await response.json();
        setProduct(data);
        console.log(data.response)
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" color="#FF5722" style={{ marginTop: 50 }} />;
  }

  if (!product) {
    return <Text style={{ textAlign: 'center', marginTop: 50 }}>Product not found.</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>DETAILS</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image 
            source={product.imageUrl ? { uri: product.imageUrl } : require('../assests/images/Shopping.png')} 
            style={styles.productImage} 
          />
          <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.cartIcon}>
            <Icon name="shopping-cart" size={22} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.productTitle}>{product.name}</Text>
          <Text style={styles.productDescription}>{product.description || 'No description available'}</Text>

          <View style={styles.priceContainer}>
            <Text style={styles.productPrice}>₹{product.price}</Text>
            <TouchableOpacity onPress={() => setSizeChartVisible(true)}> 
              <Text style={styles.selectSize}>SELECT SIZE</Text>
            </TouchableOpacity>
          </View>
        </View>
        <AccordionItem title="DESCRIPTION & RETURNS" content={product.details || ''} />
        <AccordionItem title="MANUFACTURER DETAI4LS" content=   {product.details || ''}  />
        <AccordionItem title="SHIPPING, RETURNS AND EXCHANGES" content="Shipping details here..." />
        <YouMayAlsoLike />
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
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 350,
    resizeMode: 'cover',
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
});









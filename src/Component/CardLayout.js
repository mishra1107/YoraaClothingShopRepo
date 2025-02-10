// import { useNavigation } from '@react-navigation/native';
// import React from 'react';

// import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';

// const products = [
//   { id: '1', image: require('../assests/images/Shopping.png'), name: '21WN REVERSIBLE ANGORA CARDIGAN', price: '₹120' },
//   { id: '2', image: require('../assests/images/Shopping.png'), name: '21WN REVERSIBLE ANGORA CARDIGAN', price: '₹120' },
//   { id: '3', image: require('../assests/images/Shopping.png'), name: '21WN REVERSIBLE ANGORA CARDIGAN', price: '₹120' },
//   { id: '4', image: require('../assests/images/Shopping.png'), name: '21WN REVERSIBLE ANGORA CARDIGAN', price: '₹120' },
// ];

// const CardLayout = () => {
//   const navigation=useNavigation();
//   const renderItem = ({ item }) => (
//     <View style={styles.cardContainer}>
//       <View style={styles.card}>
//         <Image source={item.image} style={styles.image} />
//         <View style={styles.iconsContainer}>
//           {/* <TouchableOpacity style={styles.iconButton}>
//             <Image 
//               source={require('../assests/images/like.png')} 
//               style={styles.iconImage} 
//             />
//           </TouchableOpacity> */}
          
//           <TouchableOpacity onPress={() => navigation.navigate('Product')}  style={styles.iconButton}>
//             <Image
//               source={require('../assests/images/eye.png')} 
//               style={styles.iconImage}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity  onPress={() => navigation.navigate('Cart')} style={styles.iconButton}>
//             <Image
//               source={require('../assests/images/cart.png')} 
//               style={styles.iconImage}
//             />
//           </TouchableOpacity>
//         </View>
//       </View>
//       <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
//       <Text style={styles.price}>{item.price}</Text>
//     </View>
//   );

//   return (
//     <FlatList
//       horizontal
//       data={products}
//       renderItem={renderItem}
//       keyExtractor={(item) => item.id}
//       showsHorizontalScrollIndicator={false}
//       contentContainerStyle={styles.scrollContainer}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   scrollContainer: {
//     paddingVertical: 10,
//     paddingHorizontal: 5,
//   },
//   cardContainer: {
//     alignItems: 'flex-start',
//     marginHorizontal: 10,
//     width: 160, 
//   },
//   card: {
//     width: '100%',
//     height: 200,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     overflow: 'hidden',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 5,
//     position: 'relative',
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },
//   iconsContainer: {
//     position: 'absolute',
//     bottom: 10,
//     right: 10,
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   iconButton: {
//     marginBottom: 10,
//   },
//   iconImage: {
//     width: 24,
//     height: 24,
//     resizeMode: 'contain',
//   },
//   name: {
//     marginTop: 5,
//     fontSize: 12,
//     fontWeight: 'bold',
//     color: '#333',
//     textAlign: 'left',
//     lineHeight: 16,
//   },
//   price: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#FF5722',
//     marginTop: 4,
//     textAlign: 'left',
//   },
// });
// export default CardLayout;



// import { useNavigation } from '@react-navigation/native'; 
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const CardLayout = () => {
//   const navigation = useNavigation();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const token = await AsyncStorage.getItem('token'); 
//         const response = await fetch('http://10.0.2.2:8080/api/items?page=1&limit=20', {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const data = await response.json();
//         console.log('Fetched Data:', data);  // Log the entire API response

//         // Validate that items exist and have IDs
//         const itemsWithIds = (data.items || []).filter(item => item.id !== undefined);
//         setProducts(itemsWithIds);
//       } catch (error) {
//         console.error('Error fetching items:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchItems();
//   }, []);

//   const renderItem = ({ item }) => {
//     console.log('Rendering Item:', item);  // Log each item before rendering
//     return (
//       <View style={styles.cardContainer}>
//         <View style={styles.card}>
//           <Image 
//             source={{ uri: item.image }} 
//             style={styles.image} 
//           />
//           <View style={styles.iconsContainer}>
//             <TouchableOpacity onPress={() => navigation.navigate('Product')} style={styles.iconButton}>
//               <Image source={require('../assests/images/eye.png')} style={styles.iconImage} />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.iconButton}>
//               <Image source={require('../assests/images/cart.png')} style={styles.iconImage} />
//             </TouchableOpacity>
//           </View>
//         </View>
//         <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
//         <Text style={styles.price}>₹{item.price}</Text>
//       </View>
//     );
//   };

//   if (loading) {
//     return <ActivityIndicator size="large" color="#FF5722" style={{ marginTop: 50 }} />;
//   }

//   return (
//     <FlatList
//       horizontal
//       data={products}
//       renderItem={renderItem}
//       keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()} // Fallback if ID is missing
//       showsHorizontalScrollIndicator={false}
//       contentContainerStyle={styles.scrollContainer}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   scrollContainer: {
//     paddingVertical: 10,
//     paddingHorizontal: 5,
//   },
//   cardContainer: {
//     alignItems: 'flex-start',
//     marginHorizontal: 10,
//     width: 160,
//   },
//   card: {
//     width: '100%',
//     height: 200,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     overflow: 'hidden',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 5,
//     position: 'relative',
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },
//   iconsContainer: {
//     position: 'absolute',
//     bottom: 10,
//     right: 10,
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   iconButton: {
//     marginBottom: 10,
//   },
//   iconImage: {
//     width: 24,
//     height: 24,
//     resizeMode: 'contain',
//   },
//   name: {
//     marginTop: 5,
//     fontSize: 12,
//     fontWeight: 'bold',
//     color: '#333',
//     textAlign: 'left',
//     lineHeight: 16,
//   },
//   price: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#FF5722',
//     marginTop: 4,
//     textAlign: 'left',
//   },
// });

// export default CardLayout;


import { useNavigation } from '@react-navigation/native'; 
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCart } from '../services/cart/CartContext';
import Icon from 'react-native-vector-icons/Ionicons';

const CardLayout = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
   const { toggleCart, fetchCart } = useCart();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = await AsyncStorage.getItem('token'); 
        const response = await fetch('http://10.0.2.2:8080/api/items?page=1&limit=20', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Fetched Data:', data);  // Log the entire API response

        // Ensure that we get items and map them correctly
        const items = (data.items || []).map(item => ({
          id: item.id,                      // This might be undefined
    name: item.name || 'Unnamed',
    price: item.price || '0',
    image: item.imageUrl || '',       // Correcting this to match your API response
    _id: item._id          // Fallback if 'image' is missing
        }));

        setProducts(items);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Image 
            source={item.image ? { uri: item.image } : require('../assests/images/Shopping.png')} 
            style={styles.image} 
          />
          <View style={styles.iconsContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Product')} style={styles.iconButton}>
              <Image source={require('../assests/images/eye.png')} style={styles.iconImage} />
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.iconButton}>
              <Image source={require('../assests/images/cart.png')} style={styles.iconImage} />
            </TouchableOpacity> */}
<TouchableOpacity 
    style={styles.iconButton1} 
    onPress={async () => {
      console.log("Item ID being added to cart:", item._id); // Add this line
        await toggleCart(item._id);
        navigation.navigate('Cart');  // Directly navigate to the cart screen
    }}>
    <Icon name="cart-outline" size={18} color="black" />
</TouchableOpacity>


          </View>
        </View>
        <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.price}>₹{item.price}</Text>
      </View>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#FF5722" style={{ marginTop: 50 }} />;
  }

  return (
    <FlatList
      horizontal
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()} 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    />
  );
};

const styles = StyleSheet.create({

  iconButton1: {
    backgroundColor: "white",
    padding: 5, borderRadius: 15,
    marginVertical: 5,
   elevation: 5, 
      alignItems: "center",
       justifyContent: "center" },
  scrollContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  cardContainer: {
    alignItems: 'flex-start',
    marginHorizontal: 10,
    width: 160,
  },
  card: {
    width: '100%',
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  iconsContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  iconButton: {
    marginBottom: 10,
  },
  iconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  name: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
    lineHeight: 16,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF5722',
    marginTop: 4,
    textAlign: 'left',
  },
});

export default CardLayout;



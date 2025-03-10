// import React, { useState,useEffect } from 'react'; 
// import { View, Text,  StyleSheet,ScrollView, } from 'react-native';
// import Pagination from '../Component/Pagination';
// import JustForYou from '../Component/JustForYou';
// import CardLayout from '../Component/CardLayout';
// import IconSection from '../Component/IconSection';
// import SubCategoryList from '../Component/SubcategoryList';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import ArrivalCategoryList from '../Component/ArrivalCategoryList';
// import { BASE_URL } from '../constants/config';
// const NewScreen = ({navigation}) => {
//   const [selectedCategory, setSelectedCategory] = useState('MEN');
//   const [selectedPage, setSelectedPage] = useState(1);

//   // Content to be displayed based on selected category
 
//   const [subcategories, setSubcategories] = useState([]);

//   useEffect(() => { 
//     if (selectedCategory) {
//       fetchSubcategories(selectedCategory._id);
//     }
//   }, [selectedCategory]); 

//   const fetchSubcategories = async (categoryId) => {
//     try {
//       // const token = await AsyncStorage.getItem('token');
//       // if (!token) {
//       //   console.warn(" No token found in AsyncStorage.");
//       //   return;
//       // }
//       const apiUrl = `${BASE_URL}/subcategories/category/${categoryId}`;
//       const response = await fetch(apiUrl, {
//         method: "GET",
//         headers: {
//           // Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });
//       if (!response.ok) throw new Error(" Failed to fetch subcategories");
//       const data = await response.json();
//       setSubcategories(data?.data || []);
//     } catch (error) {
//       console.error(" Error fetching subcategories:", error.message);
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       {/* Header Section */}
//          <ScrollView>
//       <View style={styles.header}>
//         <Text style={styles.heading}>NEW ARRIVAL</Text>
//       </View>
//       <IconSection selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
//       <ArrivalCategoryList subcategories={subcategories} navigation={navigation} /> 
//       {/* <Pagination totalPages={5} onPageChange={setSelectedPage} /> */}
//       <JustForYou/>
//       <CardLayout/>
//       </ScrollView>
//     </View>
//   );
// };

// export default NewScreen;

// const styles = StyleSheet.create({
//   header: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//   },
//   heading: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   categoryContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//   },
//   categoryButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 15,
//     borderRadius: 5,
//   },
//   selectedCategory: {
//     backgroundColor: 'black',
//   },
//   categoryText: {
//     fontSize: 14,
//     color: '#000',
//   },
//   selectedText: {
//     color: '#fff',
//   },
// });
import { useNavigation } from '@react-navigation/native'; 
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCart } from '../services/cart/CartContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { WishlistContext } from '../services/context/WishlistContext';
import { BASE_URL } from '../constants/config';
import FilterSection from '../Component/FilterSection';

const NewScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toggleCart } = useCart();
  const { wishlist, toggleWishlist } = useContext(WishlistContext);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = await AsyncStorage.getItem('token'); 
        const response = await fetch(`${BASE_URL}/items?page=1&limit=20`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const items = (data.items || []).map(item => ({
          id: item.id || item._id,
          name: item.name || 'Unnamed',
          price: item.price || '0',
          image: item.imageUrl || '',
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

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <TouchableOpacity onPress={() => navigation.navigate('Product', { id: item.id })}>
          <Image 
            source={item.image ? { uri: item.image } : require('../assests/images/Shopping.png')} 
            style={styles.image} 
          />
        </TouchableOpacity>

        <View style={styles.iconsContainer}>
          {/* <TouchableOpacity 
            onPress={() => navigation.navigate('Product', { id: item.id })} 
            style={styles.iconButton1}>
            <Icon name="eye" size={18} color="black"/>
          </TouchableOpacity> */}

          {/* <TouchableOpacity 
            style={styles.iconButton1} 
            onPress={async () => {
              const token = await AsyncStorage.getItem('token');
              if (!token) {
                Alert.alert("You need to login/signin first");
                navigation.navigate('Welcome'); 
              } else {
                await toggleCart(item.id);
                navigation.navigate('Cart');
              }
            }}>
            <Icon name="cart-outline" size={18} color="black" />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={async() => {
              const token = await AsyncStorage.getItem('token');
              if (!token) {
                Alert.alert("You need to login/signin first");
                navigation.navigate('Welcome');
              } else {
                toggleWishlist(item.id);
              }
            }} 
            style={styles.iconButton1}>
            <Icon name={wishlist[item.id] ? "heart" : "heart-outline"} size={18} color={wishlist[item.id] ? "red" : "black"} />
          </TouchableOpacity> */}
        </View>
      </View>

      <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.price}>MRP : Rs {item.price}</Text>
      <Text style={styles.price}>(All Taxes Included)</Text>


    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#FF5722" style={{ marginTop: 50 }} />;
  }

  return (
    <View style={styles.container}>
      {/* "Just for You" Header */}
      {/* <Text style={styles.header}>Just for You</Text> */}
      <FilterSection/>


      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()} 
        numColumns={2} // Displays 2 cards per row
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 0,
    paddingTop: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  scrollContainer: {
    paddingBottom: 10,
  },
  cardContainer: {
    flex: 1,
    margin: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingBottom: 10,
  },
  card: {
    width: '100%',
    height: 250,
    borderRadius: 5,
    overflow: 'hidden',
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
  iconButton1: {
    backgroundColor: "white",
    padding: 5, 
    borderRadius: 15,
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  name: {
    marginHorizontal: 10,
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: "#333",
    textAlign: 'left',
  },
  price: {
    marginHorizontal: 10,
    fontSize: 14,
    color: "#909090",
    marginTop: 4,
    textAlign: 'left',
  },
});

export default NewScreen;



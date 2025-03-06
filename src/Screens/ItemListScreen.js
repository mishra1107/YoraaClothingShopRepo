import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { WishlistContext } from '../services/context/WishlistContext';
import { useCart } from '../services/cart/CartContext';
import { BASE_URL } from '../constants/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ItemListScreen = ({ route }) => {
    const navigation = useNavigation();
    const { wishlist, toggleWishlist } = useContext(WishlistContext);
    const { toggleCart, fetchCart } = useCart();
    const { subcategoryId } = route.params;
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await fetch(`${BASE_URL}/items/subcategory/${subcategoryId}?page=1&limit=15`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            if (response.ok) setItems(data?.data || []);
        } catch (error) {
            console.error("Fetch Items Error:", error);
        }
    };

    return (
        <View style={styles.container}>
            {/*  Header with Back Button & Centered Title */}
            <View style={styles.header}>
    <TouchableOpacity
                 style={styles.backIcon}
                 onPress={() => navigation.goBack()}>
                 <Image 
                   source={require('../assests/images/BackArrow.png')}  // Use local asset
                   style={styles.backIconImage}  //  Apply styles for proper size
                 />
               </TouchableOpacity>
    <Text style={styles.headerTitle}>ITEM LIST</Text>
</View>
           
            {/* <FlatList
                data={items}
                
                keyExtractor={(item) => item._id}
                numColumns={2}
                 ListEmptyComponent={() => (
                      <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No items found</Text>
                      </View>
                    )}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
                            <View style={styles.iconOverlay}>
                                 <TouchableOpacity 
                                            onPress={() => navigation.navigate('Product', { id: item._id })} 
                                            style={styles.iconButton} >
                                            <Icon  name="eye"  size={18} color="black"/>
                                          </TouchableOpacity>
                                <TouchableOpacity  onPress={ 
                                    async() =>
                                    {
                                        const token = await AsyncStorage.getItem('token')
                                     

                                        if (token == null) {
                                         
                                        Alert.alert("You need to login/signin first")
                                            
                                            navigation.navigate('Welcome'); // Navigate to signup if token is missing
                                        } else {
                                            toggleWishlist(item._id);
                                        }
                                    }
                                    
                                
                                }  style={styles.iconButton}>
                                    <Icon name={wishlist[item._id] ? "heart" : "heart-outline"} size={18} color={wishlist[item._id] ? "red" : "black"} />
                                </TouchableOpacity>  
                             <TouchableOpacity 
    style={styles.iconButton} 
    onPress={async () => {
        const token= await AsyncStorage.getItem('token')
    
        if (token==null) {
          
                          Alert.alert("You need to login/signin first")
          
          navigation.navigate('Welcome'); // Navigate to signup if token is missing
        } 
        else{
         
          await toggleCart(item._id);
          navigation.navigate('Cart');
        }
       
      }}>
    <Icon name="cart-outline" size={18} color="black" />
</TouchableOpacity>

                            </View>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemPrice}>₹ {item.price}</Text>
                        </View>
                    </View>
                )}
            /> */}

            <FlatList 
            data={items}
    keyExtractor={(item) => item._id}
    numColumns={2}
    ListEmptyComponent={() => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No items found</Text>
        </View>
    )}
    renderItem={({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.imageContainer}>
                {/* Make the image clickable */}
                <TouchableOpacity onPress={() => navigation.navigate('Product', { id: item._id })}>
                    <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
                </TouchableOpacity>
                
                <View style={styles.iconOverlay}>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Product', { id: item._id })} 
                        style={styles.iconButton}>
                        <Icon name="eye" size={18} color="black"/>
                    </TouchableOpacity>
                    
                    <TouchableOpacity  
                        onPress={async () => {
                            const token = await AsyncStorage.getItem('token');
                            if (!token) {
                                Alert.alert("You need to login/signin first");
                                navigation.navigate('Welcome'); // Navigate to signup if token is missing
                            } else {
                                toggleWishlist(item._id);
                            }
                        }}  
                        style={styles.iconButton}>
                        <Icon name={wishlist[item._id] ? "heart" : "heart-outline"} size={18} color={wishlist[item._id] ? "red" : "black"} />
                    </TouchableOpacity>  
                    
                    <TouchableOpacity 
                        style={styles.iconButton} 
                        onPress={async () => {
                            const token = await AsyncStorage.getItem('token');
                            if (!token) {
                                Alert.alert("You need to login/signin first");
                                navigation.navigate('Welcome'); // Navigate to signup if token is missing
                            } else {
                                await toggleCart(item._id);
                                navigation.navigate('Cart');
                            }
                        }}>
                        <Icon name="cart-outline" size={18} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>₹ {item.price}</Text>
            </View>
        </View>)}
/>

        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f9f9f9" },

    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
      },
      emptyText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'gray',
      },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 15,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        paddingHorizontal: 10, 
      },
      backIcon: {
        width: 40, 
        alignItems: "flex-start",
      },
      backIconImage: {
        width: 24,
        height: 24,
        tintColor: 'black',
      },
      headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        flex: 1, 
      },
    itemContainer: { 
        flex: 1,
         margin: 8 
        },
    imageContainer: { 
        position: "relative"
     },
    itemImage: {
         width: "100%", 
         height: 220, 
         resizeMode: "cover"
         },
    iconOverlay: { 
        position: "absolute", 
        bottom: 10, right: 10,
         flexDirection: "column", 
         alignItems: "center" },
    iconButton: {
         backgroundColor: "white",
         padding: 5, borderRadius: 15,
         marginVertical: 5,
        elevation: 5, 
           alignItems: "center",
            justifyContent: "center" },
    textContainer: { 
        paddingVertical: 5, 
        paddingHorizontal: 10 
    },
    itemName: { 
        fontSize: 14,
         fontWeight: "light", 
         color: "#333"
         },
    itemPrice: { 
         color: "#909090",
        fontSize: 16, 
        fontWeight: "light",
        marginTop: 2 },
});



export default ItemListScreen;

import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { WishlistContext } from '../services/context/WishlistContext';
import { BASE_URL } from '../constants/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ItemListScreen = ({ route }) => {
    const navigation = useNavigation();
    const { wishlist, toggleWishlist } = useContext(WishlistContext);
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
            else console.error(" Error fetching items:", data.message);
        } catch (error) {
            console.error(" Fetch Items Error:", error);
        }
    };

    return (
        <View style={styles.container}>
            {/* Back Button with Centered Title */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>ITEMS LISTING</Text>
            </View>

            <FlatList
                data={items}
                keyExtractor={(item) => item._id}
                numColumns={2}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />

                            {/* Icons Inside Image (Vertically Positioned Bottom-Right) */}
                            <View style={styles.iconOverlay}>
                                <TouchableOpacity onPress={() => toggleWishlist(item._id)} style={styles.iconButton}>
                                    <Icon
                                        name={wishlist[item._id] ? "heart" : "heart-outline"}
                                        size={18}
                                        color={wishlist[item._id] ? "red" : "black"}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.iconButton}>
                                    <Icon name="eye-outline" size={18} color="black" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.iconButton}>
                                    <Icon name="cart-outline" size={18} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Product Name & Price (Left-Aligned) */}
                        <View style={styles.textContainer}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemPrice}>₹{item.price}</Text>
                            <Text style={styles.itemDescription}>{item.description}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        backgroundColor: "#fff",
        elevation: 3,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    backButton: {
        position: "absolute",
        left: 15,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        color: "#333",
    },
    itemContainer: {
        flex: 1,
        margin: 8,
    },
    imageContainer: {
        position: "relative",
    },
    itemImage: {
        width: "100%",
        height: 220,
        resizeMode: "cover",
    },
    iconOverlay: {
        position: "absolute",
        bottom: 10, // Placed at the bottom-right inside the image
        right: 10,
        flexDirection: "column",
        alignItems: "center",
    },
    iconButton: {
        backgroundColor: "white",
        padding: 5,
        borderRadius: 15,
        marginVertical: 5,
        elevation: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    textContainer: {
        paddingVertical: 5,
        paddingHorizontal: 10, // Adjusted to align left
    },
    itemName: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
        textAlign: "left", // Left-aligned text
    },
    itemPrice: {
        color: "#ff5733",
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 2,
        textAlign: "left", // Left-aligned text
    },
});

export default ItemListScreen;

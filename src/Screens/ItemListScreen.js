import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Vector Icons

const BASE_URL = "http://10.0.2.2:8080/api";
const ItemListScreen = ({ route }) => {
    const { subcategoryId } = route.params;
    const [items, setItems] = useState([]);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [wishlistItems, setWishlistItems] = useState({}); // Track items in wishlist

    useEffect(() => {
        fetchItems();
        loadWishlist();
    }, []);

    const fetchItems = async () => {
        try {
            const token = await AsyncStorage.getItem('token'); 
            if (!token) {
                console.warn("⚠️ No token found. Please login again.");
                return;
            }

            const response = await fetch(`${BASE_URL}/items/subcategory/${subcategoryId}?page=1&limit=15`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            if (!response.ok) {
                console.error("Error fetching items:", data.message);
                return;
            }

            setItems(data?.data || []);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    const toggleWishlist = async (itemId) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.warn("⚠️ No token found. Please login again.");
                return;
            }

            const isWishlisted = wishlistItems[itemId];

            const url = isWishlisted 
                ? `${BASE_URL}/wishlist/remove`  // API to remove from wishlist
                : `${BASE_URL}/wishlist/add`;   // API to add to wishlist

            const requestBody = JSON.stringify({ itemId });

            console.log("🔹 Hitting Wishlist API:", url);
            console.log("📩 Request Body:", requestBody);

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: requestBody,
            });

            const data = await response.json();
            console.log("✅ Wishlist API Response:", data);

            if (response.ok) {
                setWishlistCount(prev => isWishlisted ? prev - 1 : prev + 1);

                setWishlistItems(prev => {
                    const updatedWishlist = { ...prev, [itemId]: !isWishlisted };
                    AsyncStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist)); // Save in AsyncStorage
                    return updatedWishlist;
                });
            } else {
                console.error("❌ Error updating wishlist:", data.message);
            }
        } catch (error) {
            console.error("⚠️ API Request Failed:", error);
        }
    };

    const loadWishlist = async () => {
        const storedWishlist = await AsyncStorage.getItem("wishlistItems");
        if (storedWishlist) {
            setWishlistItems(JSON.parse(storedWishlist));
        }
    };

    return (
        <FlatList
            data={items}
            keyExtractor={(item) => item._id}
            numColumns={2}
            renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemPrice}>₹{item.price}</Text>
                        <Text style={styles.itemDescription}>{item.description}</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={() => toggleWishlist(item._id)}>
                            <Icon
                                name={wishlistItems[item._id] ? "heart" : "heart-outline"} // Filled when added
                                size={30}
                                color={wishlistItems[item._id] ? "red" : "gray"} // Red when added, gray when removed
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    itemContainer: { flex: 1, margin: 10, alignItems: "flex-start" },
    imageContainer: { position: "relative" },
    itemImage: { width: 180, height: 240 },
    iconContainer: { flexDirection: "row", justifyContent: "center", marginTop: 10 },
    icon: { marginHorizontal: 5 },
    textContainer: { marginTop: 5, paddingHorizontal: 5, alignSelf: "flex-start" },
    itemName: { fontSize: 16, fontWeight: "bold", textAlign: "left" },
    itemPrice: { color: "#ff5733", fontSize: 16, fontWeight: "bold", textAlign: "left" },
    itemDescription: { fontSize: 14, color: "gray", textAlign: "left" },
});

export default ItemListScreen;

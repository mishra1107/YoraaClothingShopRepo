import React from 'react'; 
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = "http://10.0.2.2:8080/api";  
console.log(" BASE_URL:", BASE_URL);

const SubCategoryList = ({ subcategories }) => {
    console.log("🛠 Rendering SubcategoryList component...");
    console.log("📋 Received subcategories:", subcategories);
    const fetchItemsBySubcategory = async (subcategoryId) => {
        try {
            console.log("🔄 Fetching items for subcategory ID:", subcategoryId);
            
            const token = await AsyncStorage.getItem('token');
            console.log(" Retrieved token from AsyncStorage:", token ? "Token exists" : "No token found");
    
            if (!token) {
                console.warn(" No token found in AsyncStorage.");
                return;
            }
    
            const apiUrl = `${BASE_URL}/items/subcategory/${subcategoryId}?page=1&limit=10`;
            console.log(" Fetching Items from API:", apiUrl);
    
            const response = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
    
            console.log(" API Response Status:", response.status);
    
            if (!response.ok) {
                try {
                    const errorResponse = await response.json();
                    console.error(" API Error Response:", errorResponse);
                } catch (jsonError) {
                    console.error(" Error parsing API error response:", jsonError);
                }
                throw new Error(` API Error: ${response.statusText}`);
            }
    
            const data = await response.json();
            console.log(" API Response Data:", data);
    
            if (!data.success) {
                console.warn(" API did not return success:", data.message);
                return;
            }
    
            if (!data.data || data.data.length === 0) {
                console.warn(" No items found in this subcategory.");
                return;
            }
    
            console.log(" Items Data:", data.data);
        } catch (error) {
            console.error(" Error fetching items:", error.message);
        }
    };
    

    return (
        <View>
            {subcategories.length > 0 ? (
                subcategories.map((sub) => {
                    console.log("🔹 Rendering Subcategory:", sub.name, "ID:", sub._id);

                    return (
                        <View key={sub._id} style={styles.subcategoryCard}>
                            <Image source={{ uri: sub.imageUrl }} style={styles.subcategoryImage} />
                            <Text style={styles.subcategoryName}>{sub.name}</Text>

                            {/* Clickable Arrow Icon */}
                            <TouchableOpacity 
                                onPress={() => fetchItemsBySubcategory(sub._id)} 
                                style={styles.arrowIcon}
                            >
                                {/* <AntDesign name="right" size={20} color="black" /> */}
                            </TouchableOpacity>
                        </View>
                    );
                })
            ) : (
                <Text style={styles.noDataText}>No Subcategories Available</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    subcategoryCard: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderColor: "#ccc",
    },
    subcategoryImage: {
        width: 40,
        height: 40,
        marginRight: 15,
    },
    subcategoryName: {
        fontSize: 16,
        fontWeight: "bold",
        flex: 1,
    },
    arrowIcon: {
        padding: 10,
        alignSelf: "flex-end",
    },
    noDataText: {
        textAlign: "center",
        fontSize: 16,
        color: "gray",
        marginVertical: 10,
    },
});

export default SubCategoryList;

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Using Expo vector icons for the arrow
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = "http://10.0.2.2:8080/api";  

const SubcategoryList = ({ subcategories }) => {
  
  const fetchItemsBySubcategory = async (subcategoryId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.warn("⚠️ No token found in AsyncStorage.");
        return;
      }

      const apiUrl = `${BASE_URL}/items/subcategory/${subcategoryId}?page=1&limit=10`;
      console.log("🌍 Fetching Items from:", apiUrl);

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("❌ Failed to fetch items");

      const data = await response.json();
      console.log("✅ Items Data:", data);
      
      // You can now update the state with the fetched items
    } catch (error) {
      console.error("❌ Error fetching items:", error.message);
    }
  };  return (
    <View>
      {subcategories.length > 0 ? (
        subcategories.map((sub) => (
          <View key={sub._id} style={styles.subcategoryCard}>
            <Image source={{ uri: sub.imageUrl }} style={styles.subcategoryImage} />
            {/* <Text style={styles.subcategoryName}>{sub.name}</Text> */}
            
            {/* Clickable Arrow Icon */}
            <TouchableOpacity onPress={() => fetchItemsBySubcategory(sub._id)} style={styles.arrowIcon}>
              <AntDesign name="right" size={20} color="black" />
            </TouchableOpacity>
          </View>
        ))
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
    justifyContent: "space-between",
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
  },
  noDataText: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
    marginVertical: 10,
  },
});

export default SubcategoryList;

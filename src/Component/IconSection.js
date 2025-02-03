import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = "http://10.0.2.2:8080/api";  

const IconSection = ({ selectedCategory, setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.warn(" No token found in AsyncStorage.");
          return;
        }

        const apiUrl = `${BASE_URL}/categories/`;
        console.log("🌍 Fetching Categories from:", apiUrl);

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error(" Failed to fetch categories");

        const data = await response.json();
        console.log(" Categories Data:", data);

        if (data?.data?.length > 0) {
          setCategories(data.data);
          setSelectedCategory(data.data[0]); // ✅ Default: Select first category
        }
      } catch (error) {
        console.error("❌ Error fetching categories:", error.message);
      }
    };

    fetchCategories();
  }, []);

  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category._id}
          style={[
            styles.touchable,
            selectedCategory?._id === category._id && styles.selected, // ✅ Highlights selected category
          ]}
          onPress={() => setSelectedCategory(category)} // ✅ Updates category on click
        >
          <Text style={[styles.text, selectedCategory?._id === category._id && styles.selectedText]}>
            {category.name.toUpperCase()}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
    margin: 10,
  },
  touchable: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRightWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "white",
  },
  selected: {
    backgroundColor: "black",  // ✅ Highlight Active Category
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  selectedText: {
    color: "white",  // ✅ Highlight text of Active Category
  },
});

export default IconSection;

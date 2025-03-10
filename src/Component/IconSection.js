import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { BASE_URL } from '../constants/config';

const IconSection = ({ selectedCategory, setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const apiUrl = `${BASE_URL}/categories/`;
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        if (data?.data?.length > 0) {
          setCategories(data.data);
          setSelectedCategory(data.data[0]);  // Default to the first category
        }
      } catch (error) {
      }
    };

    fetchCategories();
  }, []);

  return (
    <View style={styles.wrapper}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category._id}
              style={[
                styles.touchable,
                selectedCategory?._id === category._id && styles.selected,
              ]}
              onPress={() => setSelectedCategory(category)}>
              <Text 
                style={[
                  styles.text, 
                  selectedCategory?._id === category._id && styles.selectedText
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {category.name.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginLeft: 10,
  },
  scrollContainer: {
    flexDirection: "row",
    flexGrow: 1,
  },
  container: {
    flexDirection: "row",
    marginHorizontal: 10, // Adds space on both sides
  },
  touchable: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  selected: {
    borderBottomWidth: 2, // Underline effect
    borderBottomColor: "black",
  },
  text: {
    fontSize: 16,
    fontWeight: "400", // Normal text weight
    color: "gray", // Lighter text color for unselected
    textAlign: "center",
  },
  selectedText: {
    fontWeight: "bold", // Bold for selected
    color: "black", // Black text for selected
  },
});


export default IconSection;

import React, { useState,useEffect } from 'react'; 
import { View, Text,  StyleSheet,ScrollView, } from 'react-native';

import Pagination from '../Component/Pagination';
import JustForYou from '../Component/JustForYou';
import CardLayout from '../Component/CardLayout';
import IconSection from '../Component/IconSection';
import SubCategoryList from '../Component/SubcategoryList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ArrivalCategoryList from '../Component/ArrivalCategoryList';

const AllCollection = ({navigation}) => {
  const [selectedCategory, setSelectedCategory] = useState('MEN');
  const [selectedPage, setSelectedPage] = useState(1);

  // Content to be displayed based on selected category
 
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => { 
    if (selectedCategory) {
      fetchSubcategories(selectedCategory._id);
    }
  }, [selectedCategory]); 

  const fetchSubcategories = async (categoryId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.warn(" No token found in AsyncStorage.");
        return;
      }
      const apiUrl = `http://18.144.80.232:8080/api/subcategories/category/${categoryId}`;
      console.log(" Fetching Subcategories from:", apiUrl);
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error(" Failed to fetch subcategories");
      const data = await response.json();
      setSubcategories(data?.data || []);
    } catch (error) {
      console.error(" Error fetching subcategories:", error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header Section */}
         <ScrollView>
      <View style={styles.header}>
        <Text style={styles.heading}>All Collection</Text>
      </View>

      <IconSection selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <ArrivalCategoryList subcategories={subcategories} navigation={navigation} /> 
      <Pagination totalPages={5} onPageChange={setSelectedPage} />
      <JustForYou/>
      <CardLayout/>
      </ScrollView>
    </View>
  );
};

export default AllCollection;

const styles = StyleSheet.create({
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  selectedCategory: {
    backgroundColor: 'black',
  },
  categoryText: {
    fontSize: 14,
    color: '#000',
  },
  selectedText: {
    color: '#fff',
  },
});

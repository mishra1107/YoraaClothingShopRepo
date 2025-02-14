import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text ,Image} from 'react-native';
import FilterSection from './../Component/FilterSection';
import IconSection from './../Component/IconSection';
import ImageSection from './../Component/ImageSection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardLayout from '../Component/CardLayout';
import ShoppingCarousel from '../Component/ShoppingCarosuel';
import HeaderContent from '../Component/HeaderContent';
import SeeAll from '../Component/SeeAll';
import SubCategoryList from '../Component/SubcategoryList';
import ItemCarousel from '../Component/ItemCarousel';

const HomeScreen = ({ navigation }) => {    
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    if (selectedCategory) {
      fetchSubcategories(selectedCategory._id);
    }
  }, [selectedCategory]); 

  const fetchSubcategories = async (categoryId) => {
    try {
      // const token = await AsyncStorage.getItem('token');
      // if (!token) {
      //   console.warn(" No token found in AsyncStorage.");
      //   return;
      // }
      const apiUrl = `http://18.144.80.232:8080/api/subcategories/category/${categoryId}`;
      console.log(" Fetching Subcategories from:", apiUrl);
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok){
        setSubcategories(data?.data || []);
        throw new Error(" Failed to fetch subcategories");
      } 
      const data = await response.json();
      setSubcategories(data?.data || []);
    } catch (error) {
      console.error(" Error fetching subcategories:", error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <FilterSection />
        {/* <ImageSection selectedCategory={selectedCategory} /> */}
        <IconSection selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <SubCategoryList subcategories={subcategories} navigation={navigation} /> 
        <View style={styles.row}>
          <Text style={styles.heading}>COLLECTIONS</Text>
          <SeeAll />
        </View>
        <CardLayout />
        <Text style={styles.heading1}>NEW ARRIVAL</Text>
        <View style={styles.row}>
       
          <ItemCarousel />
        </View>
        <HeaderContent />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  heading1: {
    fontSize: 20,
    fontWeight: 'bold',
    marginStart:20,
   
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
   
  },
});

export default HomeScreen;

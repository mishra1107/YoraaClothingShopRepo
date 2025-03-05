import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text ,Image} from 'react-native';
import FilterSection from './../Component/FilterSection';
import IconSection from './../Component/IconSection';
import CardLayout from '../Component/CardLayout';
import HeaderContent from '../Component/HeaderContent';
import SeeAll from '../Component/SeeAll';
import SubCategoryList from '../Component/SubcategoryList';
import ItemCarousel from '../Component/ItemCarousel';
import { BASE_URL } from '../constants/config';
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
      const apiUrl = `${BASE_URL}/subcategories/category/${categoryId}`;
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
        <View style={styles}>
          <ItemCarousel />
        </View>
        <HeaderContent />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  heading1: {
    fontSize: 30,
    fontWeight: "light",
    marginStart:15, 
    marginBottom:5
 
  },
  row: {
    flexDirection: 'col',
    marginStart:15,
    marginBottom:10

  },
  heading: {

    fontSize: 30,
    fontWeight: "light",
    marginTop:40,
    marginBottom:5
  },
});

export default HomeScreen;

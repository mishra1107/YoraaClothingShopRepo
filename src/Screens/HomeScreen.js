import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FilterSection from './../Component/FilterSection';
import IconSection from './../Component/IconSection';
import ImageSection from './../Component/ImageSection';
import CategoryList from './../Component/CategoryList';
import CardLayout from '../Component/CardLayout';
import ShoppingCarousel from '../Component/ShoppingCarosuel';
import HeaderContent from '../Component/HeaderContent';
import SeeAll from '../Component/SeeAll';
import WomenScreen from '../Screens/WomenScreen';
import KidScreen from '../Screens/KidScreen';
import AccessoriesScreen from '../Screens/AccessoriesScreen';

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('MEN');

  const renderCategoryContent = () => {
    switch (selectedCategory) {
      case 'WOMEN':
        return <WomenScreen />;
      case 'KIDS':
        return <KidScreen />;
      case 'ACCESSORIES':
        return <AccessoriesScreen />;
      default:
        return (
          <>
            <CategoryList />
            <View style={styles.row}>
              <Text style={styles.heading}>COLLECTIONS</Text>
              <SeeAll />
            </View>
            <CardLayout />
            <View style={styles.row}>
              <Text style={styles.heading}>NEW ARRIVALS</Text>
            </View>
            <ShoppingCarousel />
            <HeaderContent />
          </>
        );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <FilterSection />
        <ImageSection selectedCategory={selectedCategory} />
        <IconSection selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        {renderCategoryContent()}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
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





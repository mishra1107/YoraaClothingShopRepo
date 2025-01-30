import React, { useState } from 'react'; 
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ImageSection from './../Component/ImageSection';
import WomenScreen from '../Screens/WomenScreen';
import KidScreen from '../Screens/KidScreen';
import AccessoriesScreen from '../Screens/AccessoriesScreen';
import WishlistScreen from './WishlistScreen';
import ArrivalScreen from './ArrivalScreen';
import Pagination from '../Component/Pagination';
import JustForYou from '../Component/JustForYou';
import CardLayout from '../Component/CardLayout';

const NewScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('MEN');
  const [selectedPage, setSelectedPage] = useState(1);

  // Function to render the correct screen based on selected category
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
            <ArrivalScreen />
            <Pagination totalPages={5} onPageChange={setSelectedPage} />
            <JustForYou />
            <CardLayout />
          </>
        );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.heading}>NEW ARRIVAL</Text>
      </View>

      {/* Category Tabs */}
      <View style={styles.categoryContainer}>
        <TouchableOpacity 
          style={[styles.categoryButton, selectedCategory === 'MEN' && styles.selectedCategory]} 
          onPress={() => setSelectedCategory('MEN')}
        >
          <Text style={[styles.categoryText, selectedCategory === 'MEN' && styles.selectedText]}>MEN</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.categoryButton, selectedCategory === 'WOMEN' && styles.selectedCategory]} 
          onPress={() => setSelectedCategory('WOMEN')}
        >
          <Text style={[styles.categoryText, selectedCategory === 'WOMEN' && styles.selectedText]}>WOMEN</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.categoryButton, selectedCategory === 'KIDS' && styles.selectedCategory]} 
          onPress={() => setSelectedCategory('KIDS')}
        >
          <Text style={[styles.categoryText, selectedCategory === 'KIDS' && styles.selectedText]}>KIDS</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.categoryButton, selectedCategory === 'ACCESSORIES' && styles.selectedCategory]} 
          onPress={() => setSelectedCategory('ACCESSORIES')}
        >
          <Text style={[styles.categoryText, selectedCategory === 'ACCESSORIES' && styles.selectedText]}>ACCESSORIES</Text>
        </TouchableOpacity>
      </View>

      {/* Dynamic Content Based on Category */}
      <ScrollView>
        {renderCategoryContent()}
      </ScrollView>
    </View>
  );
};

export default NewScreen;

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

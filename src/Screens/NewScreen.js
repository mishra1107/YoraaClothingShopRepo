import React, { useState } from 'react'; 
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import WomenScreen from '../Screens/WomenScreen';
import KidScreen from '../Screens/KidScreen';
import AccessoriesScreen from '../Screens/AccessoriesScreen';
import ArrivalScreen from './ArrivalScreen';
import Pagination from '../Component/Pagination';
import JustForYou from '../Component/JustForYou';
import CardLayout from '../Component/CardLayout';

const NewScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('MEN');
  const [selectedPage, setSelectedPage] = useState(1);

  // Content to be displayed based on selected category
  const getCategoryContent = () => {
    switch (selectedCategory) {
      case 'WOMEN':
        return [{ key: 'WOMEN', component: <WomenScreen /> }];
      case 'KIDS':
        return [{ key: 'KIDS', component: <KidScreen /> }];
      case 'ACCESSORIES':
        return [{ key: 'ACCESSORIES', component: <AccessoriesScreen /> }];
      default:
        return [
          { key: 'ARRIVAL', component: <ArrivalScreen /> },
          { key: 'PAGINATION', component: <Pagination totalPages={5} onPageChange={setSelectedPage} /> },
          { key: 'JUST_FOR_YOU', component: <JustForYou /> },
          { key: 'CARD_LAYOUT', component: <CardLayout /> },
        ];
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
        {['MEN', 'WOMEN', 'KIDS', 'ACCESSORIES'].map(category => (
          <TouchableOpacity 
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category && styles.selectedText
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Dynamic Content rendered using FlatList */}
      <FlatList
        data={getCategoryContent()}
        renderItem={({ item }) => <View>{item.component}</View>}
        keyExtractor={item => item.key}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
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

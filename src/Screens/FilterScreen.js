import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Modal, Pressable, ScrollView, FlatList, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import IconSection from './../Component/IconSection';
import { BASE_URL } from '../constants/config';

// Demo filter data
const filterOptions = {
  Size: ['S', 'M', 'L', 'XL', 'XXL'],
  Price: [
    { label: 'Under 500', min: 0, max: 500 },
    { label: '500 - 1000', min: 500, max: 1000 },
    { label: '1000 - 2000', min: 1000, max: 2000 },
    { label: 'Over 2000', min: 2000, max: Infinity }
  ],
  Color: ['Black', 'White', 'Blue', 'Red', 'Green'],
  Brand: ['Yoraa'],
  Type: [] 
};

const FilterScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({ name: "Men" });
  const [selectedFilter, setSelectedFilter] = useState('Type');
  const [selectedFilters, setSelectedFilters] = useState({
    Type: [],
    Size: [],
    Price: null,
    Color: [],
    Brand: []
  });
  const [subcategories, setSubcategories] = useState([]);
  const [items, setItems] = useState([]);
  const windowWidth = Dimensions.get('window').width;
  const itemWidth = windowWidth / 2 - 20;
  const [loading, setLoading] = useState(false);

  const categories = ['Type', 'Size', 'Price', 'Color', 'Brand'];

  // Fetch subcategories for Type filter
  useEffect(() => {
    if (selectedFilter === 'Type' && selectedCategory?._id) {
      fetchSubcategories(selectedCategory._id);
    }
  }, [selectedFilter, selectedCategory]);

  const fetchSubcategories = async (categoryId) => {
    try {
      const response = await fetch(`${BASE_URL}/subcategories/category/${categoryId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data?.data) {
        setSubcategories(data.data);
        filterOptions.Type = data.data; // Update Type options
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      setSubcategories([]);
    }
  };

  const fetchItems = async () => {
    try {
      setLoading(true);
      const requestBody = {
        page: 1,
        limit: 10,
        filters: {}
      };

      // Add search text if present
      if (searchText.trim()) requestBody.searchText = searchText;

      // Add category filter
      if (selectedCategory?._id) requestBody.filters.categoryId = selectedCategory._id;

      // Add selected filters
      if (selectedFilters.Type.length > 0) {
        requestBody.filters.subCategoryId = selectedFilters.Type.map(item => item._id);
      }
      if (selectedFilters.Size.length > 0) {
        requestBody.filters.size = selectedFilters.Size;
      }
      if (selectedFilters.Price) {
        requestBody.filters.minPrice = selectedFilters.Price.min;
        requestBody.filters.maxPrice = selectedFilters.Price.max;
      }
      if (selectedFilters.Color.length > 0) {
        requestBody.filters.color = selectedFilters.Color;
      }
      if (selectedFilters.Brand.length > 0) {
        requestBody.filters.brand = selectedFilters.Brand;
      }

      const response = await fetch(`${BASE_URL}/items/filter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      setItems(data?.data || []);
    } catch (error) {
      console.error("Error fetching items:", error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchItems();
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchText, selectedFilters]);

  const toggleFilterSelection = (filterType, value) => {
    setSelectedFilters(prev => {
      if (filterType === 'Price') {
        return { ...prev, Price: prev.Price?.label === value.label ? null : value };
      }
      
      const currentSelections = prev[filterType];
      if (filterType === 'Type') {
        const exists = currentSelections.find(item => item._id === value._id);
        return {
          ...prev,
          Type: exists 
            ? currentSelections.filter(item => item._id !== value._id)
            : [...currentSelections, value]
        };
      }
      
      return {
        ...prev,
        [filterType]: currentSelections.includes(value)
          ? currentSelections.filter(item => item !== value)
          : [...currentSelections, value]
      };
    });
  };

  const renderFilterOptions = () => {
    const options = selectedFilter === 'Type' ? subcategories : filterOptions[selectedFilter];
    
    return options.map((option, index) => {
      const isSelected = selectedFilter === 'Price'
        ? selectedFilters.Price?.label === option.label
        : selectedFilter === 'Type'
        ? selectedFilters.Type.some(item => item._id === option._id)
        : selectedFilters[selectedFilter].includes(option);
        
      return (
        <TouchableOpacity
          key={index}
          style={styles.checkboxContainer}
          onPress={() => toggleFilterSelection(selectedFilter, selectedFilter === 'Type' ? option : option.label ? option : option)}
        >
          <Icon
            name={isSelected ? "checkbox" : "square-outline"}
            size={20}
            color="#000"
          />
          <Text style={styles.checkboxLabel}>
            {selectedFilter === 'Type' ? option.name : option.label || option}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.container}>
      {/* Search and Filter Header */}
      <View style={styles.headerContainer}>
        <View style={styles.searchContainer}>
          <Icon name="search-outline" size={20} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Items"
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Icon name="close-outline" size={20} style={styles.clearIcon} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={() => setFilterModalVisible(true)} style={styles.filterButton}>
          <Icon name="filter-outline" size={24} style={styles.filterIcon} />
        </TouchableOpacity>
      </View>

      {/* Items List */}
      <FlatList
        data={items}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListEmptyComponent={<Text style={styles.noItemsText}>No items found</Text>}
        renderItem={({ item }) => (
          <View style={[styles.itemCard, { width: itemWidth }]}>
            <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>Rs{item.price}</Text>
          </View>
        )}
      />

      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter</Text>
              <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                <Icon name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <IconSection selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

            <View style={styles.categoryContainer}>
              <View style={styles.sidebar}>
                <ScrollView>
                  {categories.map((category, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[styles.categoryButton, selectedFilter === category && styles.categoryButtonSelected]}
                      onPress={() => setSelectedFilter(category)}
                    >
                      <Text style={[styles.categoryText, selectedFilter === category && styles.categoryTextSelected]}>
                        {category}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <View style={styles.filterOptions}>
                <ScrollView>
                  <Text style={styles.categoryTitle}>Select {selectedFilter}</Text>
                  {renderFilterOptions()}
                </ScrollView>
              </View>
            </View>

            <Pressable
              style={styles.applyButton}
              onPress={() => {
                fetchItems();
                setFilterModalVisible(false);
              }}
            >
              <Text style={styles.applyButtonText}>Apply Filter</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  noItemsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noItemsText: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
  },
  container: { padding: 10, borderBottomWidth: 1, borderColor: '#ddd' },
  headerContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, marginBottom: 10 },
  searchContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ccc', borderRadius: 10, paddingHorizontal: 10, height: 40, backgroundColor: '#fff' },
  searchIcon: { color: '#999', marginRight: 8 },
  searchInput: { flex: 1, color: '#000', fontSize: 16 },
  clearIcon: { color: '#999', marginLeft: 8 },
  filterButton: { marginLeft: 10, padding: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 8 },
  filterIcon: { color: '#000' },
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 15, borderTopRightRadius: 15, padding: 16, height: '80%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  modalTitle: { fontSize: 18, fontWeight: 'bold' },
  categoryContainer: { flexDirection: 'row', flex: 1, marginTop: 10 },
  filterOptions: { flex: 1, paddingLeft: 15 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
  checkboxLabel: { fontSize: 14, marginLeft: 8, color: '#000' },
  applyButton: { backgroundColor: 'black', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  applyButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  categoryTitle: { fontSize: 16, fontWeight: 'bold', color: '#000', marginBottom: 10, },
  categoryText: { color: '#fff', fontSize: 14, textTransform: 'capitalize', },
  sidebar: {
    width: '40%', // Adjust width for better spacing
    backgroundColor: '#000',
    paddingVertical: 5, // Less padding to fit more categories
  },
  categoryButton: {
    paddingVertical: 12, // Reduce padding for compact view
    paddingLeft: 15,
    backgroundColor: '#000', // Default black background
    borderBottomWidth: 1, // Thin line between items
    borderBottomColor: '#222', // Dark grey divider
  },
  categoryButtonSelected: {
    backgroundColor: '#F5F5F5', // Light grey when selected
    borderLeftWidth: 4, // Highlight selected item
    borderLeftColor: '#000', // Black border for selection
  },
  categoryText: {
    color: '#fff', // White text for default
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  categoryTextSelected: {
    color: '#000', // Black text when selected
    fontWeight: 'bold',
  },
  itemCard: {
    backgroundColor: '#fff',
    borderRadius: 2,
    paddingBottom: 10, // Add padding to prevent cut-off
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden', // Prevents text from overflowing
  },
  itemImage: {
    width: '90%',
    height: 160, // Reduce height slightly to give space for text
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50, // Ensures space for text
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemPrice: {
    fontSize: 12,
    color: '#888',
    marginTop: 2, // Ensure it doesn't get cut off
  },
  row: {
    justifyContent: 'space-between',
  },
});

export default FilterScreen;






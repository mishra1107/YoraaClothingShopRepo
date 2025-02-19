import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Modal, Pressable, ScrollView,FlatList ,Image,Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import IconSection from './../Component/IconSection';
import { BASE_URL } from '../constants/config';

const FilterScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({ name: "Men" });
  const [selectedFilter, setSelectedFilter] = useState('Type'); // Default selected category
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({});
  const [subcategories, setSubcategories] = useState([]); // Stores fetched subcategories
  const [items, setItems] = useState([]); // Stores fetched items
  const windowWidth = Dimensions.get('window').width;
  const itemWidth = windowWidth / 2 - 20; // Adjust for spacing
  const [loading, setLoading] = useState(false); // Loader for API calls
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const categories = ['Type', 'Size', 'Price', 'Color', 'Brand'];

  // Fetch subcategories when 'Type' is selected
  useEffect(() => {
    if (selectedFilter === 'Type' && selectedCategory && selectedCategory._id) {
      fetchSubcategories(selectedCategory._id);
    } else {
      setSubcategories([]); // Clear subcategories when not needed
    }
  }, [selectedFilter, selectedCategory]);
  
  // Fetch subcategories from API
  const fetchSubcategories = async (categoryId) => {
    if (!categoryId) {
      console.error("Error: No categoryId provided for fetching subcategories");
      return;
    }
    try {
      const apiUrl = `${BASE_URL}/subcategories/category/${categoryId}`;
      // const apiUrl = `http://10.0.2.2:8080/api/subcategories/category/${categoryId}`;
      console.log("Fetching Subcategories from:", apiUrl);

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch subcategories: ${response.status}`);
      }

      const data = await response.json();
      console.log(" zaibaaaa Fetched Subcategories:", data);

      if (data?.data) {
        setSubcategories(data.data);
      } else {
        setSubcategories([]);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error.message);
      setSubcategories([]); // Prevent UI crashes
    }
  };
  const fetchItems = async (searchText = '') => {
    try {
        setLoading(true); // Show loader while fetching

        const apiUrl = `${BASE_URL}/items/filter`;
        // const apiUrl = `http://10.0.2.2:8080/api/items/filter`;
        const requestBody = {
            page: 1,
            limit: 10,
            filters: {},
        };

        // Only add searchText if it's provided (not empty)
        if (searchText.trim() !== '') {
            requestBody.searchText = searchText;
        }

        // Add categoryId if selected
        if (selectedCategory && selectedCategory._id) {
            requestBody.filters.categoryId = selectedCategory._id;
        }

        // Add subCategoryId if selected
        if (selectedSubcategory && selectedSubcategory._id) {
            requestBody.filters.subCategoryId = selectedSubcategory._id;
        }

        console.log("🛠️ Applying Filters:");
        console.log("Selected Category ID:", selectedCategory?._id || "None");
        console.log("Selected Subcategory ID:", selectedSubcategory?._id || "None");
        console.log("Search Text:", searchText || "None");
        console.log("Sending API Request to:", apiUrl);
        console.log("Request Body:", JSON.stringify(requestBody, null, 2));


        console.log("Sending API Request to:", apiUrl);
        console.log("Request Body:", requestBody);

        //  Use fetch with POST method
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        console.log("Fetched Data:", data);

        if (data?.data) {
            setItems(data.data);
        } else {
            setItems([]);
        }
    } catch (error) {
        console.error("Error fetching items:", error.message);
        setItems([]);
    } finally {
        setLoading(false); // Hide loader
    }
};

//  Fetch all items initially (no searchText)
useEffect(() => {
    fetchItems(); // Fetches all items
}, []);

//  Fetch filtered items when searchText changes (with debounce)
useEffect(() => {
    console.log("Current searchText:", searchText);

    const delayDebounce = setTimeout(() => {
        fetchItems(searchText); // Fetch filtered items
    }, 500); // Delay API call to avoid excessive requests

    return () => clearTimeout(delayDebounce);
}, [searchText]);

  const applyFilters = () => {
    console.log(" Selected Category ID:", selectedCategory?._id || "None");
    console.log(" Selected Subcategory ID:", selectedSubcategory?._id || "None");
    console.log(" Search Text:", searchText || "None");
    fetchItems(); // Fetch items with selected filters (category, subcategory)
};

// Toggle checkbox selection for subcategories
const toggleCheckbox = (subcategory) => {
    setSelectedCheckboxes((prevState) => ({
        ...prevState,
        [subcategory.name]: !prevState[subcategory.name], // Toggle selection
    }));

    // ✅ Set the selected subcategory when a user selects it
    if (selectedSubcategory?._id === subcategory._id) {
        setSelectedSubcategory(null); // Deselect if already selected
    } else {
        setSelectedSubcategory(subcategory); // Set new selection
    }
};

  return (
    <View style={styles.container}>
      {/* Search and Filter Button */}
      <View style={styles.headerContainer}>
        <View style={styles.searchContainer}>
          <Icon name="search-outline" size={20} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Items"
            placeholderTextColor="#999"
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


      <FlatList
        data={items}
        keyExtractor={(item) => item._id}
        numColumns={2} // 2-column layout
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
            <View style={[styles.itemCard, { width: itemWidth }]}>
            <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>Rs{item.price}</Text>
          </View>
        )}
      />


      {/* Filter Modal */}
      <Modal animationType="slide" transparent={true} visible={filterModalVisible} onRequestClose={() => setFilterModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter</Text>
              <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                <Icon name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Category Selection Icons */}
            <IconSection selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

            {/* Sidebar and Filters */}
            <View style={styles.categoryContainer}>
              {/* Sidebar */}
              <View style={styles.sidebar}>
                <ScrollView>
                  {categories.map((category, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[styles.categoryButton, selectedFilter === category && styles.categoryButtonSelected]}
                      onPress={() => setSelectedFilter(category)}>
                      <Text style={[styles.categoryText, selectedFilter === category && styles.categoryTextSelected]}>
                        {category}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

<View style={styles.filterOptions}>
  {selectedFilter === 'Type' ? (
    // <ScrollView>
    //   {subcategories.length > 0 ? (
    //     subcategories.map((subcategory, index) => (
    //       <TouchableOpacity key={index} style={styles.checkboxContainer} onPress={() => toggleCheckbox(subcategory.name)}>
    //         <Icon name={selectedCheckboxes[subcategory.name] ? "checkbox" : "square-outline"} size={20} color="#000" />
    //         <Text style={styles.checkboxLabel}>{subcategory.name}</Text>
    //       </TouchableOpacity>
    //     ))
    //   ) : (
    //     <Text style={styles.noDataText}>No subcategories found</Text>
    //   )}
    // </ScrollView>

    <ScrollView>
        {subcategories.length > 0 ? (
            subcategories.map((subcategory, index) => (
                <TouchableOpacity 
                    key={index} 
                    style={styles.checkboxContainer} 
                    onPress={() => toggleCheckbox(subcategory)}
                >
                    <Icon 
                        name={selectedCheckboxes[subcategory.name] ? "checkbox" : "square-outline"} 
                        size={20} 
                        color="#000" 
                    />
                    <Text style={styles.checkboxLabel}>{subcategory.name}</Text>
                </TouchableOpacity>
            ))
        ) : (
            <Text style={styles.noDataText}>No subcategories found</Text>
        )}
    </ScrollView>
  ) : (
    <ScrollView>
      {/* Display Category Titles */}
      {selectedFilter === 'Size' && <Text style={styles.categoryTitle}>Choose Size</Text>}
      {selectedFilter === 'Price' && <Text style={styles.categoryTitle}>Select Price Range</Text>}
      {selectedFilter === 'Color' && <Text style={styles.categoryTitle}>Select a Color</Text>}
      {selectedFilter === 'Brand' && <Text style={styles.categoryTitle}>Choose Brand</Text>}
     
      {/* Dummy Data for Display (Replace with API Data if Needed) */}
      {['Option 1', 'Option 2', 'Option 3'].map((label, index) => (
        <TouchableOpacity key={index} style={styles.checkboxContainer} onPress={() => toggleCheckbox(label)}>
          <Icon name={selectedCheckboxes[label] ? "checkbox" : "square-outline"} size={20} color="#000" />
          <Text style={styles.checkboxLabel}>{label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )}
</View>
            </View>
            {/* Apply Filter Button */}
            <Pressable 
    style={styles.applyButton} 
    onPress={() => {
        applyFilters(); // Apply filter logic
        setFilterModalVisible(false); // Close the filter modal
    }}>
    <Text style={styles.applyButtonText}>Apply Filter</Text>
</Pressable>

          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
  categoryTitle: { fontSize: 16, fontWeight: 'bold', color: '#000', marginBottom: 10,},
  categoryText: { color: '#fff',fontSize: 14, textTransform: 'capitalize',},
  sidebar: {  width: '40%', // Adjust width for better spacing
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






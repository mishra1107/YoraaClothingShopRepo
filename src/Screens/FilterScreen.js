import React, { useEffect, useState, useContext } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  Pressable, 
  ScrollView, 
  FlatList, 
  Image, 
  Dimensions, 
  Alert, 
  ActivityIndicator 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconSection from './../Component/IconSection';
import { BASE_URL } from '../constants/config';
import { useCart } from '../services/cart/CartContext';
import { WishlistContext } from '../services/context/WishlistContext';

const filterOptions = {
  Size: ['S', 'M', 'L', 'XL', 'XXL'],
  Color: ['Black', 'White', 'Blue', 'Red', 'Green'],
  Brand: ['Yoraa'],
  Type: [] 
};

// Define a mapping of color names to hex codes for the color boxes
const colorMap = {
  Black: '#000000',
  White: '#FFFFFF',
  Blue: '#0000FF',
  Red: '#FF0000',
  Green: '#008000'
};

const FilterScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({ name: "Men" });
  const [selectedFilters, setSelectedFilters] = useState({
    Type: [],
    Size: [],
    Color: [],
    Brand: []
  });
  const [products, setProducts] = useState([]);
  const { toggleCart, fetchCart } = useCart();
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  
  const [subcategories, setSubcategories] = useState([]);
  const [items, setItems] = useState([]);
  const windowWidth = Dimensions.get('window').width;
  const itemWidth = windowWidth / 2 - 20;
  const [loading, setLoading] = useState(false);

  const categories = ['Type', 'Size', 'Color', 'Brand'];

  useEffect(() => {
    if (selectedCategory?._id) {
      fetchSubcategories(selectedCategory._id);
    }
  }, [selectedCategory]);

  const fetchSubcategories = async (categoryId) => {
    try {
      const response = await fetch(`${BASE_URL}/subcategories/category/${categoryId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data?.data) {
        setSubcategories(data.data);
        filterOptions.Type = data.data;
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

      if (searchText.trim()) requestBody.searchText = searchText;
      if (selectedCategory?._id) requestBody.filters.categoryId = selectedCategory._id;
      if (selectedFilters.Type.length > 0) {
        requestBody.filters.subCategoryId = selectedFilters.Type.map(item => item._id);
      }
      if (selectedFilters.Size.length > 0) {
        requestBody.filters.size = selectedFilters.Size;
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

  const clearFilters = () => {
    setSelectedFilters({
      Type: [],
      Size: [],
      Color: [],
      Brand: [],
    });
    setSelectedCategory([]);
  };

  const renderFilterOptions = (filterType) => {
    const options = filterType === 'Type' ? subcategories : filterOptions[filterType];
    
    return (
      <View style={filterType === 'Size' ? styles.sizeOptionsRow : styles.subOptionsContainer}>
        {options.map((option, index) => {
          const isSelected = filterType === 'Type'
            ? selectedFilters.Type.some(item => item._id === option._id)
            : selectedFilters[filterType].includes(option);
            
          return (
            <TouchableOpacity
              key={index}
              style={filterType === 'Size' ? styles.sizeOption : styles.optionContainer}
              onPress={() => toggleFilterSelection(filterType, filterType === 'Type' ? option : option)}
            >
              <View style={styles.optionRow}>
                {filterType === 'Color' && (
                  <View
                    style={[
                      styles.colorBox,
                      { backgroundColor: colorMap[option] || '#000' } // Fallback to black if color not found
                    ]}
                  />
                )}
                <Text style={[styles.optionLabel, isSelected && styles.selectedOptionLabel]}>
                  {filterType === 'Type' ? option.name : option}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <TouchableOpacity onPress={() => navigation.navigate('Product', { id: item._id })}>
          <Image 
            source={item.imageUrl ? { uri: item.imageUrl } : require('../assests/images/Shopping.png')} 
            style={styles.image} 
          />
        </TouchableOpacity>

        <View style={styles.iconsContainer}>
          {/* <TouchableOpacity 
            style={styles.iconButton1} 
            onPress={async () => {
              const token = await AsyncStorage.getItem('token');
              if (!token) {
                Alert.alert("You need to login/signin first");
                navigation.navigate('Welcome'); 
              } else {
                await toggleCart(item._id);
                navigation.navigate('Cart');
              }
            }}>
            <Icon name="cart-outline" size={18} color="black" />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={async () => {
              const token = await AsyncStorage.getItem('token');
              if (!token) {
                Alert.alert("You need to login/signin first");
                navigation.navigate('Welcome');
              } else {
                toggleWishlist(item._id);
              }
            }} 
            style={styles.iconButton1}>
            <Icon name={wishlist[item._id] ? "heart" : "heart-outline"} size={18} color={wishlist[item._id] ? "red" : "black"} />
          </TouchableOpacity> */}
        </View>
      </View>
      {/* <Text style={styles.price}>Rs {item.price}</Text>

      <Text style={styles.name} numberOfLines={2}>{item.name}</Text> */}

       <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
            <Text style={styles.price}>MRP : Rs {item.price}</Text>
            <Text style={styles.price}>(All Taxes Included)</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.searchContainer}>
          <Icon name="search-outline" size={16} style={styles.searchIcon} />
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
          <Icon name="filter-outline" size={19} style={styles.filterIcon} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListEmptyComponent={<Text style={styles.noItemsText}>No items found</Text>}
        renderItem={renderItem}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity style={styles.clearFiltersButton} onPress={clearFilters}>
                <Text style={styles.clearFiltersText}>Clear All Filters</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                <Icon name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <IconSection selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

            <ScrollView style={styles.filterScroll}>
              {categories.map((category, index) => (
                <View key={index} style={styles.filterSection}>
                  <View style={styles.filterRow}>
                    <View style={styles.categoryColumn}>
                      <Text style={styles.categoryTitle}>{category}</Text>
                    </View>
                    <View style={styles.optionsColumn}>
                      {renderFilterOptions(category)}
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>

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
  noItemsText: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  container: { padding: 10 },
  headerContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, marginBottom: 10 },
  searchContainer: { flex: 1, flexDirection: 'row',borderRadius:10, alignItems: 'center', borderWidth: 1, borderColor: '#ccc', paddingHorizontal: 8, marginRight: 10 },
  searchIcon: { marginRight: 5, color: '#999' },
  searchInput: { flex: 1, height: 35, color: '#000' },
  clearIcon: { color: '#999', marginLeft: 8 },
  filterButton: { marginLeft: 10, padding: 7, borderWidth: 1, borderColor: '#ccc' },
  filterIcon: { color: '#000' },
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#fff', padding: 16, height: '80%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  clearFiltersButton: {},
  clearFiltersText: {
    fontSize: 16,
    color: 'gray',
    fontWeight: "light",

  },
  filterScroll: { flex: 1 },
  filterSection: { marginBottom: 20 },
  filterRow: { flexDirection: 'row',gap:70,marginTop:20 },
  categoryColumn: { width: '30%', paddingRight: 10 },
  optionsColumn: { width: '70%' },
  subOptionsContainer: {},
  sizeOptionsRow: { flexDirection: 'row', flexWrap: 'wrap' },
  sizeOption: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginRight: 15, 
    marginVertical: 5 
  },
  optionContainer: { marginVertical: 5 },
  optionRow: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  colorBox: {
    width: 14,
    height: 14,
    borderRadius: 2,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ccc', // Border for visibility (especially for white)
  },
  optionLabel: { 
    fontSize: 14, 
    color: 'gray'
  },
  selectedOptionLabel: {
    color: 'black',
    // fontWeight: 'bold'
  },
  applyButton: { backgroundColor: 'black', padding: 15, alignItems: 'center', marginTop: 20 },
  applyButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  categoryTitle: { fontSize: 16, color: '#000', marginBottom: 10, marginTop: 10 },
  cardContainer: {
    flex: 1,
    margin: 5,
    borderRadius: 5,
    paddingBottom: 10,
  },
  card: {
    width: '100%',
    height: 250,
    borderRadius: 5,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  iconsContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  iconButton1: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: 15,
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    marginHorizontal: 10,
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: "#333",
    textAlign: 'left',
  },
  price: {
    marginHorizontal: 10,
    fontSize: 14,
    color: "#909090",
    marginTop: 4,
    textAlign: 'left',
  },
  row: {
    justifyContent: 'space-between',
  },
});

export default FilterScreen;
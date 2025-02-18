// import React, { useContext, useEffect, useState } from 'react';
// import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import Share from 'react-native-share';
// import { useNavigation } from '@react-navigation/native';
// import { WishlistContext } from '../services/context/WishlistContext';
// import { useCart } from '../services/cart/CartContext';

// const FilterScreen = () => {
//   const navigation = useNavigation();
//   const { wishlistCount } = useContext(WishlistContext);
//   const { cartCount, fetchCart } = useCart();
//   const [searchText, setSearchText] = useState('');

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const handleWishlistPress = () => {
//     navigation.navigate('Wishlist');
//   };

//   const handleCartPress = () => {
//     navigation.navigate('Cart');
//   };

//   const handleSearchFocus = () => {
//     navigation.navigate('FilterScreen'); // Open FilterScreen when clicking on search bar
//   };

//   const handleClearSearch = () => {
//     setSearchText('');
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.searchContainer}>
//         <Icon name="search-outline" size={20} style={styles.searchIcon} />
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search Items"
//           placeholderTextColor="#999"
//           value={searchText}
//           onChangeText={setSearchText}
//           onFocus={handleSearchFocus}
//         />
//         {searchText.length > 0 && (
//           <TouchableOpacity onPress={handleClearSearch}>
//             <Icon name="close-outline" size={20} style={styles.clearIcon} />
//           </TouchableOpacity>
//         )}
//       </View>

//       <TouchableOpacity onPress={() => navigation.navigate('FilterScreen')} style={styles.filterButton}>
//         <Icon name="filter-outline" size={24} style={styles.filterIcon} />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//   },
//   searchContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     height: 40,
//     backgroundColor: '#fff',
//   },
//   searchIcon: {
//     color: '#999',
//     marginRight: 8,
//   },
//   searchInput: {
//     flex: 1,
//     color: '#000',
//     fontSize: 16,
//   },
//   clearIcon: {
//     color: '#999',
//     marginLeft: 8,
//   },
//   filterButton: {
//     marginLeft: 10,
//     padding: 8,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//   },
//   filterIcon: {
//     color: '#000',
//   },
// });

// export default FilterScreen;
import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Modal, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Share from 'react-native-share';
import { useNavigation } from '@react-navigation/native';
import { WishlistContext } from '../services/context/WishlistContext';
import { useCart } from '../services/cart/CartContext';
 // Import your existing component
import IconSection from './../Component/IconSection';

const FilterScreen = () => {
  const navigation = useNavigation();
  const { wishlistCount } = useContext(WishlistContext);
  const { cartCount, fetchCart } = useCart();
  const [searchText, setSearchText] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Men');

  useEffect(() => {
    fetchCart();
  }, []);

  const handleSearchFocus = () => {
    navigation.navigate('FilterScreen'); // Open FilterScreen when clicking on search bar
  };

  const handleClearSearch = () => {
    setSearchText('');
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Items"
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
          onFocus={handleSearchFocus}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={handleClearSearch}>
            <Icon name="close-outline" size={20} style={styles.clearIcon} />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Button */}
      <TouchableOpacity onPress={() => setFilterModalVisible(true)} style={styles.filterButton}>
        <Icon name="filter-outline" size={24} style={styles.filterIcon} />
      </TouchableOpacity>

      {/* Bottom Sheet Modal for Filter */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter</Text>
              <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                <Icon name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Icon Section (Men, Women, Kid) */}
            <IconSection selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

            {/* Apply Filter Button */}
            <Pressable style={styles.applyButton} onPress={() => setFilterModalVisible(false)}>
              <Text style={styles.applyButtonText}>Apply Filter</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: '#fff',
  },
  searchIcon: {
    color: '#999',
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#000',
    fontSize: 16,
  },
  clearIcon: {
    color: '#999',
    marginLeft: 8,
  },
  filterButton: {
    marginLeft: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  filterIcon: {
    color: '#000',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  applyButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  applyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FilterScreen;

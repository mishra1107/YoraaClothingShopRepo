import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../constants/config';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';

const SubCategoryScreen = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const navigation = useNavigation();
  const { categoryId } = route.params;

  const fetchSubcategories = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/subcategories/category/${categoryId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const jsonResponse = await response.json();

      if (jsonResponse.success) {
        const subcategoryData = jsonResponse.data.map(item => ({
          id: item._id,
          title: item.name,
          image: { uri: item.imageUrl },
        }));
        setSubcategories(subcategoryData);
      } else {
        console.error('Failed to fetch subcategories:', jsonResponse.message);
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubcategories();
  }, []);

  const handleSubCategoryPress = (subcategoryId) => {
    navigation.navigate('ItemList', { subcategoryId });
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>


  <View style={styles.header}>
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>SubCategory</Text>
</View>
      {subcategories.length > 0 ? (
        subcategories.map((sub) => (
          <TouchableOpacity key={sub.id} style={styles.subcategoryCard} onPress={() => handleSubCategoryPress(sub.id)}>
            <Image source={sub.image} style={styles.subcategoryImage} />
            <Text style={styles.subcategoryName}>{sub.title}</Text>
            <AntDesign name="arrowright" size={20} color="black" style={styles.arrowIcon} />
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noDataText}>No Subcategories Available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",  // Keep text vertically centered
    justifyContent: "center",
    paddingVertical: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
},
backButton: {
    position: "absolute",
    left: 15,
    marginTop: 4,  // Push the back icon slightly downward
},
headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
},
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  subcategoryCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  subcategoryImage: {
    width: 20,
    height: 20,
    marginRight: 15,
  },
  subcategoryName: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  arrowIcon: {
    padding: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
    marginVertical: 10,
  },
});

export default SubCategoryScreen;
